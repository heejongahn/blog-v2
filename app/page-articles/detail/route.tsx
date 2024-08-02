import {
  json,
  useLoaderData,
  useMatches,
  useOutletContext,
} from "@remix-run/react";

import { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Article } from "utils/parseArticle";

import articleStylesHref from "./article.css?url";
import { prettifyDate } from "utils/date";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: articleStylesHref },
];

export const handle = {
  breadcrumb: { route: "/", name: "홈" },
};

export const loader: LoaderFunction = async ({ params, context }) => {
  console.log(context);
  return json({ slug: params.slug });
};

export default function ArticlePage() {
  const { slug } = useLoaderData<{ slug: string }>();
  const { articles } = useOutletContext<{ articles: Article[] }>();
  const article = articles.find((a) => a.slug === slug);

  const matches = useMatches();

  console.log({ matches });

  if (article == null) {
    return "loading";
  }

  const { frontmatter, contentHtml } = article;

  return (
    <article id="article">
      <h1 id="article-title">{frontmatter.title}</h1>
      <h2 id="article-subtitle">{frontmatter.description}</h2>
      <time>{prettifyDate(frontmatter.date)}</time>
      <div>{frontmatter.tags.join(", ")}</div>

      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
