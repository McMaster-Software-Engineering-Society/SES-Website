import { IconType } from "@react-icons/all-files/lib/index.mjs";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";

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
];
