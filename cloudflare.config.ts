import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "days-since-last-framework",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-10",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      DATABASE_URL: bindings.secret(),
    },
  }),
});
