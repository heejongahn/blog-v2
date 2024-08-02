import { json } from "@remix-run/react";

import { LoaderFunction } from "@remix-run/node";

export const handle = {
  breadcrumb: { route: "/", name: "홈" },
};

export const loader: LoaderFunction = async ({ params, context }) => {
  console.log(context);
  return json({ slug: params.slug });
};

export default function ArticlePage() {
  return (
    <article id="article">
      <h1>HOME</h1>
    </article>
  );
}
