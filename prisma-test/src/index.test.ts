import { createPost, getPosts } from ".";
import { PostFactory } from "./factory";
import { initialize } from "./__generated__/fabbrica";

const prisma = jestPrisma.client;
initialize({ prisma });

test("ポストを登録できること", async () => {
  await createPost(prisma);

  expect(await prisma.post.count()).toBe(1);
});

test("ポストの一覧を取得できること", async () => {
  await PostFactory.createList(3);

  const posts = await getPosts(prisma);

  expect(posts.length).toBe(3);
  expect(posts[0]).toMatchObject({
    title: "サンプル投稿",
    body: "サンプルです",
  });
});
