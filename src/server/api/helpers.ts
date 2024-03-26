import { PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

type Context = {
    db: PrismaClient<{
        log: ("query" | "warn" | "error")[];
    }, never, DefaultArgs>;
    userId: string | null;
}

export const fetchPostWithParents = async (ctx: Context, postId: string, limit = 5) => {
    let currentPost = await ctx.db.post.findUnique({
        where: { id: postId },
    });

    if (!currentPost) {
        throw new TRPCError({ code: "NOT_FOUND" });
    }

    const postsChain = [];
    while (currentPost.parentId && postsChain.length < limit) {
        currentPost = await ctx.db.post.findUnique({
            where: { id: currentPost.parentId },
        });
        if (currentPost) {
            postsChain.push(currentPost);
        } else {
            break;
        }
    }
  
    return postsChain.reverse(); 
  }