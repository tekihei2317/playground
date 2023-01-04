import { definePostFactory } from "./__generated__/fabbrica";

export const PostFactory = definePostFactory({
  defaultData() {
    return {
      title: "サンプル投稿",
      body: "サンプルです",
    };
  },
});
