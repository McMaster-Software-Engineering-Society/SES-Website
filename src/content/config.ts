// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const eventCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    startDateTime: z.string().transform((str) => new Date(str)),
    endDateTime: z
      .string()
      .transform((str) => new Date(str))
      .optional(),
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

const hackathonCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string().optional(),
    location: z.string(),
    link: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const internshipListCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    link: z.string(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blogs: blogCollection,
  events: eventCollection,
  mcmasterHackathons: hackathonCollection,
  externalHackathons: hackathonCollection,
  internshipsLists: internshipListCollection,
};
