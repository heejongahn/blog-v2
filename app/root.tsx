import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  Outlet,
  json,
  useLoaderData,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";
import sidebarStylesHref from "./sidebar/style.css?url";
import { LinksFunction } from "@remix-run/node";
import { Article } from "utils/parseArticle";
import Sidebar from "./sidebar";
import { loadArticles } from "loaders/loadArticles";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
  { rel: "stylesheet", href: sidebarStylesHref },
];

export async function loader() {
  const articles = await loadArticles();

  return json({ articles });
}

export default function App() {
  const { articles } = useLoaderData<{ articles: Article[] }>();

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Sidebar articles={articles} />
        <main id="page-content">
          <Outlet context={{ articles }} />
        </main>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
