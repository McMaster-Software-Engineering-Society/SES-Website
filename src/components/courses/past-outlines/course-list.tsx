import { Card, CardBody, Divider, ScrollShadow } from "@nextui-org/react";
import CourseListItem from "./course-list-item";
import type { Course } from "@utils/past-outlines";

type CourseListProps = {
  courses: Course[];
  selectedCourse: number;
  setSelectedCourse: (index: number) => void;
};

export default function CourseList({
  courses,
  selectedCourse,
  setSelectedCourse,
}: CourseListProps) {
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
                className="p-2"
              />
              {index !== courses.length - 1 && <Divider />}
            </div>
          ))}
        </ScrollShadow>
      </CardBody>
    </Card>
  );
}
