import type { Course } from "@utils/past-outlines";
import { useState } from "react";
import CourseList from "./list/course-list";
import CourseSearchAndFilter from "./list/course-search-and-filter";
import CourseOutlinePreview from "./preview/course-outline-preview";

type PastOutlinesProps = {
  courses: Course[];
};

// TODO: On selecting a course from the list, have the list automatically scroll to make the selected course second from the top

export default function PastOutlines({ courses }: Readonly<PastOutlinesProps>) {
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
      <CourseOutlinePreview selectedCourse={selectedCourse} courses={courses} />
    </div>
  );
}
