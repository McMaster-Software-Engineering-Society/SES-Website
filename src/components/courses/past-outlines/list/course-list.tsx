import { Card, CardBody, Divider, ScrollShadow } from "@nextui-org/react";
import type { Course } from "@utils/past-outlines";
import clsx from "clsx";
import CourseListItem from "./course-list-item";

type CourseListProps = {
  courses: Course[];
  selectedCourse: number;
  setSelectedCourse: (id: number) => void;
};

export default function CourseList({
  courses,
  selectedCourse,
  setSelectedCourse,
}: Readonly<CourseListProps>) {
  return (
    <Card className="mt-4 max-h-[63vh]">
      <CardBody>
        <ScrollShadow className="flex flex-col overflow-y-auto">
          {courses.length === 0 ? (
            <div className="flex flex-col">
              <span className="text-sm">
                Sorry, no past outlines were found.
              </span>
              <a
                className="text-sm italic underline text-blue-600"
                href="https://forms.gle/MLrNZnwsmeTEBbVcA"
                target="_blank">
                Consider sending us yours!
              </a>
            </div>
          ) : (
            courses.map((course, index) => (
              <div key={`${course.courseCode}-${index}`}>
                <CourseListItem
                  courseCode={course.courseCode}
                  term={course.term}
                  handleClick={() => {
                    setSelectedCourse(course.id);
                  }}
                  pdfPath={course.pdfPath}
                  selected={selectedCourse === course.id}
                  className={clsx([
                    courses.length === 1 && "rounded-md",
                    courses.length > 1 && index === 0 && "rounded-t-md",
                    courses.length > 1 &&
                      index === courses.length - 1 &&
                      "rounded-b-md",
                  ])}
                />
                {index !== courses.length - 1 && <Divider />}
              </div>
            ))
          )}
        </ScrollShadow>
      </CardBody>
    </Card>
  );
}
