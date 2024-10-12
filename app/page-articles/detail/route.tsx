import { json, useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { useLayoutEffect, useRef } from "react";

import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Article } from "utils/parseArticle";

import articleStylesHref from "./article.css?url";
import { prettifyDate } from "utils/date";
import { loadArticles } from "loaders/loadArticles";
import { getFormattedPageTitle } from "utils/getFormattedPageTitle";
import { useSticky } from "hooks/useSticky";
import { PageLayout } from "~/components/PageLayout";
import ArticleContent from "~/components/ArticleContent";

export const meta: MetaFunction = ({ data }) => {
  const { article } = data as { article: Article };

  const title = getFormattedPageTitle([article.frontmatter.title]);

  return [
    { title },
    {
      property: "og:title",
      content: title,
    },
    {
      name: "description",
      content: article.frontmatter.description,
    },
  ];
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: articleStylesHref },
];

export const handle = {
  breadcrumb: { route: "/", name: "홈" },
};

export const loader: LoaderFunction = async ({ params }) => {
  const articles = await loadArticles();

  return json({
    slug: params.slug,
    article: articles.find((a) => a.slug === params.slug),
  });
};

export default function ArticlePage() {
  const { article } = useLoaderData<{ slug: string; article: Article }>();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [isSticky, sentinelRef] = useSticky<HTMLDivElement>({
    rootMargin: "-12px",
  });

  useLayoutEffect(() => {
    scrollContainerRef.current?.scrollTo(0, 0);
  }, [article.slug]);

  if (article == null) {
    return "loading";
  }

  const { frontmatter, contentHtml } = article;

  return (
    <PageLayout ref={scrollContainerRef}>
      <PageLayout.Inner>
        <article id="article">
          <div className="sentinel" aria-hidden ref={sentinelRef} />
          <h1
            className={classNames("article-title", {
              "article-title-stuck": isSticky,
            })}
          >
            {frontmatter.title}
          </h1>
          <h2 className="article-subtitle">{frontmatter.description}</h2>
          <div className="article-subinfo">
            <time className="article-date">
              {prettifyDate(frontmatter.date)}
            </time>
            <div className="article-tags">
              {frontmatter.tags.map((tag) => `#${tag}`).join(", ")}
            </div>
          </div>

          <ArticleContent
            className="article-content"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>
      </PageLayout.Inner>
    </PageLayout>
  );
}
