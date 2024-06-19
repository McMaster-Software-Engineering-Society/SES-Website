import { Card, CardBody, Divider, ScrollShadow } from "@nextui-org/react";
import { useState } from "react";
import CourseListItem from "./course-list-item";
import CourseSearchAndFilter from "./course-search-and-filter";
import type { Course } from "@utils/past-outlines";
import CourseList from "./course-list";

type OutlinePreviewProps = {
  courses: Course[];
};

// TODO: On selecting a course from the list, have the list automatically scroll to make the selected course second from the top

export default function OutlinePreview({
  courses,
}: Readonly<OutlinePreviewProps>) {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<string>("any");
  const [selectedCourse, setSelectedCourse] = useState<number>(0);

  return (
    <div className="flex flex-row justify-between w-full">
      <div id="past-course-outline-list" className="flex flex-col max-w-min">
        <CourseSearchAndFilter
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
        <CourseList
          courses={courses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      </div>
      <div id="course-outline-preview" className="flex flex-col ml-8 border-1">
        <div className="overflow-y-scroll max-h-[78vh] ">
          {courses[selectedCourse].pngPaths.map((pngPath, index) => (
            <img
              key={`${pngPath}-${index}`}
              alt={`${courses[selectedCourse].courseCode} ${courses[selectedCourse].term} outline page #${index + 1}`}
              src={pngPath}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
