import { MetaFunction } from "@remix-run/node";

// FIXME
const HOST = `https://wondering-trout.netlify.app`;

type Callback = (...args: Parameters<MetaFunction>) => {
  title?: string;
  description?: string;
};

export const getFormattedPageTitle = (parts: string[]) => {
  return [...parts, "사색송어"].join(" ⇠ ");
};

export const generateMeta = (callback: Callback): MetaFunction => {
  const image = `${HOST}/images/logo/logo.png`;

  return (args) => {
    const { title: rawTitle, description = "안희종 개인 홈페이지" } =
      callback(args);

    const title = getFormattedPageTitle(rawTitle == null ? [] : [rawTitle]);

    const pageUrl = `${HOST}${args.location.pathname}`;

    return [
      /**
       * Web
       */
      { title },
      {
        name: "description",
        content: description,
      },
      /**
       * OpenGraph
       */
      { property: "og:locale", content: "ko_kR" },
      {
        property: "og:title",
        content: title,
      },
      { property: "og:site_property", content: "사색송어 Wondering Trout" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: image },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "256" },
      { property: "og:image:height", content: "264" },
      { property: "og:url", content: pageUrl },
      /**
       * Twitter
       */
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:creator",
        content: "ahn heejong",
      },
      {
        name: "twitter:site",
        content: "@heejongahn",
      },
      {
        name: "twitter:url",
        content: pageUrl,
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:image",
        content: image,
      },
    ];
  };
};
