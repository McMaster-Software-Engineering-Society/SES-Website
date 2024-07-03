export type CalendarEvent = {
  title: string;
  start: string;
  end: string;
  details: string;
  location: string;
  googleMapsLink?: string;
  image?: {
    src: string;
    alt: string;
  };
  link?: string;
};
