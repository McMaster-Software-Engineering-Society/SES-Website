import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://ses.eng.mcmaster.ca/",
  integrations: [
    tailwind(),
    mdx(),
    sitemap(),
    icon(),
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      injectRegister: "auto",
      workbox: {
        navigateFallback: "/404",
      },
    }),
  ],
});
