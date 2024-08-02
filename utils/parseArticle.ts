import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import fs from "fs/promises";
import { parseFrontmatter } from "./parseFrontmatter";

export interface Article {
  slug: string;
  contentHtml: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: string[];
  };
}

export async function parseArticle(
  articlePath: string
): Promise<Omit<Article, "slug">> {
  const fileContent = await fs.readFile(articlePath);

  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(parseFrontmatter)
    .use(remarkHtml)
    .process(fileContent);

  return {
    frontmatter: file.data.matter as Article["frontmatter"],
    contentHtml: file.value as string,
  };
}
