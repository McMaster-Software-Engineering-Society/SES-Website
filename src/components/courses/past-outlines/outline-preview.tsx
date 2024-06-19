import { Card, CardBody, Divider, ScrollShadow } from "@nextui-org/react";
import { useState } from "react";
import CourseListItem from "./course-list-item";
import CourseSearchAndFilter from "./course-search-and-filter";

export type Course = {
  courseCode: string;
  name: string;
  term: string;
  level: number;
  selected?: boolean;
};

type OutlinePreviewProps = {
  courses: Course[];
};

export default function OutlinePreview({
  courses,
}: Readonly<OutlinePreviewProps>) {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<string>("any");

  return (
    <div className="flex flex-row justify-between w-full">
      <div id="past-course-outline-list" className="flex flex-col max-w-min">
        <CourseSearchAndFilter
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
        <Card className="mt-4">
          <CardBody>
            <ScrollShadow className="flex flex-col overflow-y-scroll max-h-[65vh] no-scrollbar">
              {courses.map((course, index) => (
                <div key={`${course.courseCode}-${index}`}>
                  <CourseListItem
                    name={course.courseCode}
                    description={course.name}
                    term={course.term}
                    selected={course.selected}
                    className="p-2"
                  />
                  {index !== courses.length - 1 && <Divider />}
                </div>
              ))}
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
      <div id="course-outline-preview" className="flex flex-col ml-8 border-1">
        <div className="overflow-y-scroll max-h-[78vh] ">
          <img
            alt={"Course outline page #1"}
            src="/past-outlines/SFWRENG_3XB3-Fall-2022-1.png"
          />
          <img
            alt={"Course outline page #1"}
            src="/past-outlines/SFWRENG_3XB3-Fall-2022-2.png"
          />
          <img
            alt={"Course outline page #1"}
            src="/past-outlines/SFWRENG_3XB3-Fall-2022-3.png"
          />
        </div>
      </div>
    </div>
  );
}
