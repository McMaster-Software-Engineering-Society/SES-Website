import { Card, CardBody, Divider, Link, ScrollShadow } from "@nextui-org/react";
import CourseListItem from "./course-list-item";
import type { Course } from "@utils/past-outlines";
import clsx from "clsx";

type CourseListProps = {
  courses: Course[];
  selectedCourse: number;
  setSelectedCourse: (index: number) => void;
};

// TODO: Add link to form to submit past outlines

export default function CourseList({
  courses,
  selectedCourse,
  setSelectedCourse,
}: Readonly<CourseListProps>) {
  return (
    <Card className="mt-4">
      <CardBody>
        <ScrollShadow className="flex flex-col overflow-y-scroll max-h-[65vh] no-scrollbar">
          {courses.length === 0 ? (
            <div>
              <span className="text-sm">
                Sorry, no past outlines were found.
              </span>
              <Link className="text-sm italic" href="#">
                Consider sending us yours!
              </Link>
            </div>
          ) : (
            courses.map((course, index) => (
              <div key={`${course.courseCode}-${index}`}>
                <CourseListItem
                  courseCode={course.courseCode}
                  term={course.term}
                  handleClick={() => {
                    setSelectedCourse(index);
                  }}
                  pdfPath={course.pdfPath}
                  selected={selectedCourse === index}
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
