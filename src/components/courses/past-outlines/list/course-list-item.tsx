import { HiArrowRight } from "@react-icons/all-files/hi/HiArrowRight";
import clsx from "clsx";

type CourseListItemProps = {
  name: string;
  term: string;
  handleClick: () => void;
  selected?: boolean;
  className?: string;
};

// TODO: Add tooltips to course description
// TODO: Rename from "name" to "courseCode"
// TODO: Rename from "description" to "courseName"
// TODO: Add link to Academic calendar?

export default function CourseListItem({
  name,
  term,
  handleClick,
  selected = false,
  className,
}: Readonly<CourseListItemProps>) {
  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      className={clsx([
        "course-list-item group flex flex-row items-center justify-between cursor-pointer hover:bg-slate-100 active:bg-slate-200 transition",
        selected && "bg-slate-100",
        "py-2 px-3",
        "rounded-b-md",
        className,
      ])}>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <span className="font-bold">{name}</span>
        </div>
        <span className="text-sm text-slate-400">{term}</span>
      </div>
      <div className="group-hover:translate-x-1 transition mr-2">
        <HiArrowRight />
      </div>
    </div>
  );
}
