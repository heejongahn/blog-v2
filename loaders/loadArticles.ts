import { readdir } from "fs/promises";
import { parseArticle } from "utils/parseArticle";
import { getArticleFilePath, getArticlesRootPath } from "utils/paths";

export async function loadArticles() {
  const articleNames = await readdir(getArticlesRootPath());

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

  return articles;
}
