import { FaGraduationCap } from "@react-icons/all-files/fa/FaGraduationCap";
import { FaQuestion } from "@react-icons/all-files/fa6/FaQuestion";
import type { ReactNode } from "react";

export const faqCategoryIcons: {
  category: string;
  icon: ReactNode;
}[] = [
  {
    category: "Academic",
    icon: FaGraduationCap,
  },
  {
    category: "General",
    icon: FaQuestion,
  },
];
