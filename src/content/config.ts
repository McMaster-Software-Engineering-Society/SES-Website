// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)
const eventCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    dateTime: z.string().transform((str) => new Date(str)),
    location: z.string(),
    googleMapsLink: z.string().optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    link: z.string().optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  events: eventCollection,
};
