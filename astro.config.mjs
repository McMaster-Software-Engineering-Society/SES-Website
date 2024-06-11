import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://ses.eng.mcmaster.ca/",
  integrations: [tailwind(), mdx(), sitemap(), icon(), AstroPWA(
    {
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      injectRegister: 'auto',
      workbox: {
        navigateFallback: "/404",
      },
    }
  )],
});
