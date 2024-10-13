import path from "path";
import process from "process";
import { matter } from "vfile-matter";

import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import fs from "fs/promises";

const ARTICLE_ROOT_PATH = `app/data/articles`;

const parseFrontmatter = () => {
  return function (tree, file) {
    matter(file);
  };
};

export async function parseArticle(articlePath) {
  const fileContent = await fs.readFile(articlePath);

  const file = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    .use(remarkFrontmatter)
    .use(parseFrontmatter)
    .use(remarkHtml)
    .process(fileContent);

  return {
    frontmatter: file.data.matter,
    contentHtml: file.value,
  };
}

function getRootPath() {
  return process.cwd();
}

function getArticlesRootPath() {
  return path.join(getRootPath(), ARTICLE_ROOT_PATH);
}

export function getArticleFilePath(slug) {
  const articlePath = `${ARTICLE_ROOT_PATH}/${slug}`;
  return articlePath;
}

function getArticlesIndexFilePath() {
  return path.join(getRootPath(), "articles-index.json");
}

async function main() {
  const articleNames = await fs.readdir(getArticlesRootPath());

  const articles = await Promise.all(
    articleNames.map(async (articleName) => {
      const articlePath = getArticleFilePath(articleName);
      return {
        ...(await parseArticle(`${articlePath}/index.md`)),
        slug: articleName,
      };
    })
  );

  articles.sort((a, b) => {
    return a.frontmatter.date > b.frontmatter.date ? -1 : 1;
  });

  await fs.writeFile(getArticlesIndexFilePath(), JSON.stringify(articles));
}

main();
