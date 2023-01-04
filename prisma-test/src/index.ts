import { PrismaClient } from "@prisma/client";

export async function createPost(prisma: PrismaClient) {
  return await prisma.post.create({
    data: {
      title: "テスト",
      body: "テストです",
    },
  });
}

export async function getPosts(prisma: PrismaClient) {
  return await prisma.post.findMany();
}
