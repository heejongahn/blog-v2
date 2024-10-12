import { LoaderFunction, LinksFunction, MetaFunction } from "@remix-run/node";
import { NavLink, json, useLoaderData } from "@remix-run/react";
import { loadArticles } from "loaders/loadArticles";
import { parseDate, prettifyDate } from "utils/date";
import { Article } from "utils/parseArticle";

import articlesStylesHref from "./articles.css?url";
import { HTMLAttributes } from "react";
import { getFormattedPageTitle } from "utils/getFormattedPageTitle";
import { PageLayout } from "~/components/PageLayout";

export const handle = {
  breadcrumb: { route: "/", name: "홈" },
};

export const meta: MetaFunction = () => {
  const title = getFormattedPageTitle(["전체 글"]);

  return [
    { title },
    {
      property: "og:title",
      content: title,
    },
    {
      name: "description",
      content: "안희종 개인 홈페이지",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: articlesStylesHref },
];

export const loader: LoaderFunction = async () => {
  const articles = await loadArticles();
  return json({ articles });
};

function groupArticlesByYear(articles: Article[]) {
  const byYear: { [key in string]: Article[] } = {};

  for (const article of articles) {
    const year = parseDate(article.frontmatter.date).getFullYear();

    byYear[year] = (byYear[year] ?? []).concat(article);
  }

  return byYear;
}

export default function ArticlesIndexPage() {
  const { articles } = useLoaderData<{
    articles: Article[];
    page: number;
  }>();

  const byYearEntries = Object.entries(groupArticlesByYear(articles)).sort(
    (a, b) => (a[0] > b[0] ? -1 : 1)
  );

  return (
    <PageLayout>
      <PageLayout.Inner>
        <ul className="articles">
          {byYearEntries.map(([year, articles]) => {
            return (
              <li key={year} className="articles-group">
                <h2 className="articles-group-header">{year}</h2>
                <ul className="articles-group-list">
                  {articles.map((article) => {
                    const { frontmatter, slug } = article;
                    return (
                      <li key={slug} className="articles-group-list-item">
                        <ItemDate>
                          {prettifyDate(frontmatter.date, "MM. dd")}
                        </ItemDate>
                        <NavLink
                          to={`/articles/${slug}`}
                          className="articles-group-list-item"
                        >
                          <ItemTextWrapper>
                            <ItemTitle>{frontmatter.title}</ItemTitle>
                            <ItemDescription>
                              {frontmatter.description}
                            </ItemDescription>
                          </ItemTextWrapper>
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </PageLayout.Inner>
    </PageLayout>
  );
}

function ItemDate(props: HTMLAttributes<HTMLTimeElement>) {
  return <time className="articles-group-list-item-date" {...props} />;
}

function ItemTextWrapper(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="articles-group-list-item-text" {...props} />;
}

function ItemTitle(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="articles-group-list-item-title" {...props} />;
}

function ItemDescription(props: HTMLAttributes<HTMLDivElement>) {
  return <div className="articles-group-list-item-description" {...props} />;
}
