import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

type ParsedFrontMatter = {
  title: string | undefined;
  date: string | undefined;
};

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    const matterResult = matter(fileContents);
    const frontMatter = matterResult.data;
    const formattedFrontMatter = {
      title: frontMatter.title ?? "No title",
      date: frontMatter.date ?? "2000-01-01",
    };

    return {
      id,
      ...formattedFrontMatter,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) return 1;
    else if (a === b) return 0;
    else return -1;
  });
}

async function markdownToHtml(content: string) {
  return (await remark().use(html).process(content)).toString();
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  const matterResult = matter(fileContents);
  const frontMatter = matterResult.data as ParsedFrontMatter;
  const contentHtml = await markdownToHtml(matterResult.content);

  return {
    id,
    contentHtml,
    title: frontMatter.title ?? "No title",
    date: frontMatter.date ?? "2000-01-01",
  };
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
