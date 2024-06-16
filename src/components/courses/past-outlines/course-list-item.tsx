import { Button } from "@nextui-org/react";
import { HiArrowRight } from "@react-icons/all-files/hi/HiArrowRight";

type CourseListItemProps = {
  name: string;
  description: string;
  term: string;
};

export default function CourseListItem({
  name,
  description,
  term,
}: Readonly<CourseListItemProps>) {
  return (
    <div className="course-list-item flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <span className="font-bold">{name}</span>
          <span className="text-slate-400 text-sm">{term}</span>
        </div>
        <span className="text-sm text-ellipsis text-nowrap truncate max-w-64">
          {description}
        </span>
      </div>
      <Button isIconOnly color="primary" variant="flat" className="text-2xl">
        <HiArrowRight />
      </Button>
    </div>
  );
}
