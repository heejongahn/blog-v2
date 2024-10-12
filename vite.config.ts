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
          route("/about", "page-about/route.tsx", { index: true });
          route("/articles", "page-articles/index/route.tsx");
          route("/articles/:slug", "page-articles/detail/route.tsx");
        });
      },
    }),
    tsconfigPaths(),
  ],
});
