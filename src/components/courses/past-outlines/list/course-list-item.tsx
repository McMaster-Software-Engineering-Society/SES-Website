import { Button } from "@nextui-org/react";
import { HiArrowRight } from "@react-icons/all-files/hi/HiArrowRight";
import { HiOutlineExternalLink } from "@react-icons/all-files/hi/HiOutlineExternalLink";
import clsx from "clsx";

type CourseListItemProps = {
  courseCode: string;
  term: string;
  handleClick: () => void;
  pdfPath: string;
  selected?: boolean;
  className?: string;
};

// TODO: Add link to Academic calendar?

export default function CourseListItem({
  courseCode: name,
  term,
  handleClick,
  pdfPath,
  selected = false,
  className,
}: Readonly<CourseListItemProps>) {
  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={clsx([
        "course-list-item group flex flex-row items-center justify-between cursor-pointer lg:hover:bg-slate-100 lgactive:bg-slate-200 transition",
        selected && "lg:bg-slate-100",
        "p-3",
        className,
      ])}>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <span className="font-bold">{name}</span>
        </div>
        <span className="text-sm text-slate-400">{term}</span>
      </div>
      <div className="hidden lg:block group-hover:translate-x-1 transition mr-2">
        <HiArrowRight />
      </div>
      <div className="block lg:hidden text-xl">
        <Button
          isIconOnly
          target="_blank"
          variant="flat"
          onClick={() => {
            window.open(pdfPath, "_blank");
          }}>
          <HiOutlineExternalLink />
        </Button>
      </div>
    </div>
  );
}
