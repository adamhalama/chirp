import { clerkClient } from "@clerk/nextjs";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters
import { filterUserForClient } from "~/server/helpers/filterUserForClient";
import type { Post } from "@prisma/client";


const addUserDataToPosts = async (posts: Post[]) => {
  const users = (
    await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100
    })
  ).map(filterUserForClient)

  return posts.map((post) => {
    const author = users.find(user => user.id === post.authorId)

    if (!author?.username) throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Author for post not found"
    })

    return {
      post,
      author: {
        ...author,
        username: author.username
      }
    }
  });
}

// Create a new ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

export const postsRouter = createTRPCRouter({
  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: [
        { createdAt: "desc" }
      ]
    })

    return addUserDataToPosts(posts);
  }),

  getPostsByUserId: publicProcedure.input(z.object({
    userId: z.string(),
  })).query(({ ctx, input }) =>
    ctx.db.post.findMany({
      where: {
        authorId: input.userId
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }]
    }).then(addUserDataToPosts)
  ),

  create: privateProcedure.input(
    z.object({
      content: z.string().min(1).max(255, "Post must contain max 255 character")
    })
  ).mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId

    const { success } = await ratelimit.limit(authorId)
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" })

    const post = await ctx.db.post.create({
      data: {
        authorId,
        content: input.content
      }
    })

    return post;
  }),

});
