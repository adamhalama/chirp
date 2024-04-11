import { PrismaClient } from '@prisma/client';
import { postsData } from './seed-data/posts';

const prisma = new PrismaClient();

async function main() {
    const posts = postsData;

    await prisma.post.createMany({
        data: posts,
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
