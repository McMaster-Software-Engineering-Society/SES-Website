import { HiArrowRight } from "@react-icons/all-files/hi/HiArrowRight";
import clsx from "clsx";

type CourseListItemProps = {
  name: string;
  description: string;
  term: string;
  selected?: boolean;
  className?: string;
};

// TODO: Add tooltips to course description
// TODO: Rename from "name" to "courseCode"
// TODO: Rename from "description" to "courseName"
// TODO: Add link to Academic calendar?

export default function CourseListItem({
  name,
  description,
  term,
  selected = false,
  className,
}: Readonly<CourseListItemProps>) {
  return (
    <div
      className={clsx([
        "course-list-item group flex flex-row items-center justify-between cursor-pointer hover:bg-slate-100 active:bg-slate-200 transition",
        selected && "bg-slate-100",
        className,
      ])}>
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <span className="font-bold">{name}</span>
          <span className="text-slate-400 text-sm">{term}</span>
        </div>
        <span className="text-sm text-ellipsis text-nowrap truncate max-w-64">
          {description}
        </span>
      </div>
      <div className="group-hover:translate-x-1 transition mr-2">
        <HiArrowRight />
      </div>
    </div>
  );
}
