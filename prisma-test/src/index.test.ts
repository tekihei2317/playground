import { createPost, getPosts } from ".";

const prisma = jestPrisma.client;

test("1 + 1が2になること", () => {
  expect(1 + 1).toBe(2);
});

test("ポストを登録できること", async () => {
  await createPost(prisma);

  expect(await prisma.post.count()).toBe(1);
});

test("ポストの一覧を取得できること", async () => {
  await createPost(prisma);

  const posts = await getPosts(prisma);

  expect(posts[0]).toMatchObject({
    title: "テスト",
    body: "テストです",
  });
});
