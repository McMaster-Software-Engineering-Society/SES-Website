import { IconType } from "@react-icons/all-files/lib/index.mjs";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaXTwitter } from "@react-icons/all-files/fa6/FaXTwitter";
import { IoMailOutline } from "@react-icons/all-files/io5/IoMailOutline";
import { SiLinktree } from "@react-icons/all-files/si/SiLinktree";

export const socialMedia: {
  platform: string;
  icon: IconType;
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
    url: "mailto:macsoftwareengsociety@gmail.com",
  },
];
