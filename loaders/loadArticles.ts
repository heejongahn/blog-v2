import { readFile } from "fs/promises";
import { Article } from "utils/parseArticle";
import path from "path";

export async function loadArticles() {
  const articles = JSON.parse(
    (await readFile(path.join(process.cwd(), "articles-index.json"))).toString()
  ) as Article[];

  return articles;
}
