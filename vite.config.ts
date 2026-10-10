import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";

export default defineConfig({
  resolve: {
    alias: [
      // Prisma's export map prefers its Node build; the Workers runtime needs the WASM engine build.
      { find: /^@prisma\/client$/, replacement: "@prisma/client/wasm" },
    ],
  },
  plugins: [
    vinext({
      images: { optimizer: imagesOptimizer() },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
