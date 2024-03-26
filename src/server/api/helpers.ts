import { clerkClient } from "@clerk/nextjs";
import { Post, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import { PostWithChildren } from "~/shared/types";
import { filterUserForClient } from "../helpers/filterUserForClient";
import { includeChildren } from "./routers/posts";

type Context = {
    db: PrismaClient<{
        log: ("query" | "warn" | "error")[];
    }, never, DefaultArgs>;
    userId: string | null;
}

export const addUserDataToPostsWithChildren = async (posts: PostWithChildren[]) => {
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

export const addUserDataToPosts = async (posts: Post[]) => {
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

export const fetchPostWithParents = async (ctx: Context, postId: string, limit = 5) => {
    let currentPost = await ctx.db.post.findUnique({
        where: { id: postId },
        include: includeChildren
    });
    console.log('🚀 ~ fetchPostWithParents ~ currentPost:', currentPost)

    if (!currentPost) {
        throw new TRPCError({ code: "NOT_FOUND" });
    }

    const postsChain = [currentPost];
    console.log('🚀 ~ fetchPostWithParents ~ postsChain:', postsChain)
    while (currentPost.parentId && postsChain.length < limit) {
        currentPost = await ctx.db.post.findUnique({
            where: { id: currentPost.parentId },
            include: includeChildren,
        });
        if (currentPost) {
            postsChain.push(currentPost);
        } else {
            break;
        }
    }

    return postsChain.reverse();
}