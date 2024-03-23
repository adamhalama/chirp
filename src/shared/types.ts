import { Post } from '@prisma/client';

export type PostWithChildren = Post & { children: Post[] };