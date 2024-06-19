import { Card, CardBody, Divider, ScrollShadow } from "@nextui-org/react";
import CourseListItem from "./course-list-item";
import type { Course } from "@utils/past-outlines";
import clsx from "clsx";

type CourseListProps = {
  courses: Course[];
  selectedCourse: number;
  setSelectedCourse: (index: number) => void;
};

export default function CourseList({
  courses,
  selectedCourse,
  setSelectedCourse,
}: Readonly<CourseListProps>) {
  return (
    <Card className="mt-4">
      <CardBody>
        <ScrollShadow className="flex flex-col overflow-y-scroll max-h-[65vh] no-scrollbar">
          {courses.map((course, index) => (
            <div key={`${course.courseCode}-${index}`}>
              <CourseListItem
                name={course.courseCode}
                term={course.term}
                handleClick={() => {
                  setSelectedCourse(index);
                }}
                selected={selectedCourse === index}
                className={clsx([
                  "py-2 px-3",
                  courses.length === 1 && "rounded-md",
                  courses.length > 1 && index === 0 && "rounded-t-md",
                  courses.length > 1 &&
                    index === courses.length - 1 &&
                    "rounded-b-md",
                ])}
              />
              {index !== courses.length - 1 && <Divider />}
            </div>
          ))}
        </ScrollShadow>
      </CardBody>
    </Card>
  );
}
