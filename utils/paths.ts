import path from "path";

const ARTICLE_ROOT_PATH = `app/data/articles`;

export function getArticlesRootPath() {
  return path.join(process.cwd(), ARTICLE_ROOT_PATH);
}

export function getArticleFilePath(slug: string) {
  const articlePath = `${ARTICLE_ROOT_PATH}/${slug}`;
  return articlePath;
}
