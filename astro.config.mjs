import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import rehypeExternalLinks from "rehype-external-links";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://ses.eng.mcmaster.ca/",
  integrations: [tailwind(), mdx(), sitemap(), icon(), react()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow", "noopener", "noreferrer"],
        },
      ],
    ],
  },
});
