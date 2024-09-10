import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaXTwitter } from "@react-icons/all-files/fa6/FaXTwitter";
import { IoMailOutline } from "@react-icons/all-files/io5/IoMailOutline";
import { SiLinktree } from "@react-icons/all-files/si/SiLinktree";
import type { ReactNode } from "react";

export const website = "https://ses.eng.mcmaster.ca/";
export const shortWebsite = "ses.eng.mcmaster.ca";
export const email = "macsoftwareengsociety@gmail.com";
export const mcmasterGoogleMaps = "https://maps.app.goo.gl/eeXMBnELVbtoj94M9";

export const socialMedia: {
  platform: string;
  icon: ReactNode;
  url: string;
}[] = [
  {
    platform: "Instagram",
    icon: FaInstagram,
    url: "https://www.instagram.com/mcmaster_ses/",
  },
  {
    platform: "Facebook",
    icon: FaFacebook,
    url: "https://www.facebook.com/McMasterSEC/",
  },
  {
    platform: "X",
    icon: FaXTwitter,
    url: "https://x.com/SES_McMaster",
  },
  {
    platform: "Linktree",
    icon: SiLinktree,
    url: "https://linktr.ee/mcmaster_ses",
  },
  {
    platform: "Email",
    icon: IoMailOutline,
    url: `mailto:${email}`,
  },
];
