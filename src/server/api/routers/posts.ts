import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";

import type { Prisma } from "@prisma/client";
import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis"; // see below for cloudflare and fastly adapters
import { addUserDataToPosts, fetchPostWithParents } from "../helpers";

export const includeChildren = {
  children: true,
}

// Ratelimiter, that allows 3 requests per 1 minute
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 m"),
  analytics: true,
});

export const postsRouter = createTRPCRouter({
  // READ
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: {
          id: input.id
        },
        include: includeChildren,
      })
      if (!post) throw new TRPCError({ code: "NOT_FOUND" })

      return (await addUserDataToPosts([post]))[0];
    }
    ),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 100,
      orderBy: [
        { createdAt: "desc" }
      ],
      include: includeChildren,
    })

    return addUserDataToPosts(posts);
  }),

  infinitePosts: publicProcedure.input(z.object({
    parentId: z.string().optional(),
    limit: z.number().int().min(1).max(100).default(10),
    cursor: z.object({
      id: z.string().optional(),
      createdAt: z.date().optional(),
    }).nullish(),
    direction: z.enum(["forward", "backward"]).default("backward"),
  }))
    .query(async ({ ctx, input }) => {
      const { limit, cursor, direction } = input;

      const posts = await ctx.db.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor?.id, createdAt: cursor?.createdAt } : undefined,
        where: {
          parentId: input.parentId ? { equals: input.parentId } : { equals: null }
        },
        orderBy: [
          { createdAt: direction === 'backward' ? 'desc' : 'asc' },
          { id: 'desc' }
        ],
        include: includeChildren
      });

      let nextCursor: typeof cursor | undefined = undefined;

      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = { id: nextItem!.id, createdAt: nextItem!.createdAt };
      }

      return {
        items: await addUserDataToPosts(posts),
        nextCursor,
      };
    }),

  getPostsByUserId: publicProcedure.input(z.object({
    userId: z.string(),
  })).query(({ ctx, input }) =>
    ctx.db.post.findMany({
      where: {
        authorId: input.userId
      },
      take: 100,
      orderBy: [{ createdAt: "desc" }],
      include: includeChildren,
    })
      .then(addUserDataToPosts)
  ),

  getByIdWithParents: publicProcedure
    .input(z.object({ id: z.string(), limit: z.number().optional() }))
    .query(async ({ ctx, input }) => {
      const { id, limit = 5 } = input;
      const postsChain = await fetchPostWithParents(ctx, id, limit);
      console.log('🚀 ~ .query ~ postsChain:', postsChain)

      return await addUserDataToPosts(postsChain);
    }),

  // CREATE
  create: privateProcedure.input(
    z.object({
      content: z.string().min(1).max(255, "Post must contain max 255 character"),
      parentId: z.string().optional(),
    })
  ).mutation(async ({ ctx, input }) => {
    const authorId = ctx.userId
    const { parentId, content } = input

    const { success } = await ratelimit.limit(authorId)
    if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" })

    const data: Prisma.PostCreateInput = {
      authorId,
      content,
    };

    if (parentId) {
      data.parent = { connect: { id: parentId } };
    }

    const post = await ctx.db.post.create({
      data,
    });

    return post;
  }),
});
