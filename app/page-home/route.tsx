import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { NavLink, json, useLoaderData } from "@remix-run/react";
import { loadArticles } from "loaders/loadArticles";
import { prettifyDate } from "utils/date";
import { Article } from "utils/parseArticle";
import classNames from "classnames";
import homeStylesHref from "./home.css?url";
import { PageLayout } from "~/components/PageLayout";
import { useLayoutEffect, useRef } from "react";
import ArticleContent from "~/components/ArticleContent";

export const meta: MetaFunction = () => {
  return [
    { title: "사색송어" },
    {
      property: "og:title",
      content: "사색송어",
    },
    {
      name: "description",
      content: "안희종 개인 홈페이지",
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: homeStylesHref },
];

export const handle = {
  breadcrumb: { route: "/", name: "홈" },
};

const PAGE_SIZE = 5;

export const loader: LoaderFunction = async function loader({ request }) {
  const url = new URL(request.url);
  const pageParam = url.searchParams.get("page");

  const articles = await loadArticles();
  const page = parseInt(pageParam ?? "0");

  const totalPages = Math.ceil(articles.length / PAGE_SIZE);
  const articlesForPage = articles.splice(page * PAGE_SIZE, PAGE_SIZE);

  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;

  console.log({ page, articlesForPage });

  return json({ articles: articlesForPage, page, hasPrev, hasNext });
};

export default function Index() {
  const { articles, page, hasPrev, hasNext } = useLoaderData<{
    articles: Article[];
    page: number;
    hasPrev: boolean;
    hasNext: boolean;
  }>();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    scrollContainerRef.current?.scrollTo(0, 0);
  }, [page]);

  return (
    <PageLayout id="home" ref={scrollContainerRef}>
      <PageLayout.Inner>
        <ul className="home-inner">
          {articles.map((article) => (
            <ArticleItem key={article.slug} article={article} />
          ))}
        </ul>
        {hasNext || hasPrev ? (
          <div className="page-navigation">
            {hasPrev ? (
              <NavLink to={`/?page=${page - 1}`}>이전 페이지</NavLink>
            ) : null}
            {hasNext ? (
              <NavLink to={`/?page=${page + 1}`}>다음 페이지</NavLink>
            ) : null}
          </div>
        ) : null}
      </PageLayout.Inner>
    </PageLayout>
  );
}

function ArticleItem({ article }: { article: Article }) {
  const { slug, frontmatter, contentHtml } = article;
  return (
    <li className="article">
      <NavLink to={`/articles/${slug}`}>
        <h1 className={classNames("article-title")}>{frontmatter.title}</h1>
      </NavLink>
      <h2 className="article-subtitle">{frontmatter.description}</h2>
      <div className="article-subinfo">
        <time className="article-date">{prettifyDate(frontmatter.date)}</time>
        <div className="article-tags">
          {frontmatter.tags.map((tag) => `#${tag}`).join(", ")}
        </div>
      </div>

      <ArticleContent
        className="article-content"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </li>
  );
}
