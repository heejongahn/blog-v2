import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
      routes: (defineRoutes) => {
        return defineRoutes((route) => {
          route("/", "page-home/route.tsx", { index: true });
          // route("", "about/route.tsx");
          route("articles", "page-articles/index/route.tsx");
          route("articles/:slug", "page-articles/detail/route.tsx");
          // , () => {
          //   route("", "concerts/home.tsx", { index: true });
          //   route("trending", "concerts/trending.tsx");
          //   route(":city", "concerts/city.tsx");
          // });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
