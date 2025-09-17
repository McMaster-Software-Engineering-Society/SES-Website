// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
    publishDate: z.string().transform((str) => new Date(str)),
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
    // Optional gallery of images for the event detail page
    gallery: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
        }),
      )
      .optional(),
    link: z.string().optional(),
  }),
});

const hackathonConferenceCollection = defineCollection({
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

const clubTeamCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    socials: z
      .object({
        website: z.string().optional(),
        instagram: z.string().optional(),
        email: z.string().optional(),
        linkedin: z.string().optional(),
        github: z.string().optional(),
        tiktok: z.string().optional(),
        twitter: z.string().optional(),
        facebook: z.string().optional(),
        youtube: z.string().optional(),
        linktree: z.string().optional(),
        discord: z.string().optional(),
      })
      .optional(),
  }),
});

const jobListCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    link: z.string(),
  }),
});

const sponsorCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    logo: z.object({
      src: z.string(),
      alt: z.string(),
      backgroundColour: z.string().optional(),
    }),
    link: z.string(),
  }),
});

const profileCardCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    title: z.string(),
    level: z
      .string()
      .transform((str) => Number(str))
      .optional(),
    description: z.string().optional(),
    program: z.string().optional(),
    image: z.string().optional(),
    socials: z
      .object({
        instagram: z.string().optional(),
        twitter: z.string().optional(),
        github: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
        email: z.string().optional(),
      })
      .optional(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
//    This key should match your collection directory name in "src/content"
export const collections = {
  blogPosts: blogCollection,
  events: eventCollection,
  mcmasterHackathons: hackathonConferenceCollection,
  externalHackathons: hackathonConferenceCollection,
  conferences: hackathonConferenceCollection,
  internshipsLists: jobListCollection,
  newGradLists: jobListCollection,
  pastSponsors: sponsorCollection,
  technicalTeams: clubTeamCollection,
  technicalClubs: clubTeamCollection,
  otherClubs: clubTeamCollection,
  profileCards: profileCardCollection,
};
