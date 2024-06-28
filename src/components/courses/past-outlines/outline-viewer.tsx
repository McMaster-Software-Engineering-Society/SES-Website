import type { Course } from "@utils/past-outlines";
import { useEffect, useState } from "react";
import CourseList from "./list/course-list";
import CourseSearchAndFilter from "./list/course-search-and-filter";
import CourseOutlinePreview from "./preview/course-outline-preview";

type PastOutlinesProps = {
  courses: Course[];
};

// TODO: On selecting a course from the list, have the list automatically scroll to make the selected course second from the top

const levelMap: { [key: string]: number } = {
  "level-2": 2,
  "level-3": 3,
  "level-4": 4,
};

export default function OutlineViewer({
  courses,
}: Readonly<PastOutlinesProps>) {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<string>("all");
  const [searchFilter, setSearchFilter] = useState<string>("");

  const [selectedCourse, setSelectedCourse] = useState<number>(0);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  // Update the filtered courses whenever the selected level, term, or search filter changes
  useEffect(() => {
    setFilteredCourses(
      courses.filter(
        (course) =>
          (selectedLevel === "all" ||
            course.level === levelMap[selectedLevel]) &&
          (selectedTerm === "all" ||
            course.term.split(" ")[0].toLowerCase() === selectedTerm) &&
          (searchFilter === "" ||
            course.courseCode
              .toLowerCase()
              .includes(searchFilter.toLowerCase())),
      ),
    );
  }, [selectedLevel, selectedTerm, searchFilter]);

  return (
    <div className="flex flex-row lg:justify-between w-full justify-center">
      <div id="past-course-outline-list" className="flex flex-col max-w-min">
        <CourseSearchAndFilter
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <CourseList
          courses={filteredCourses}
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
        />
      </div>
      <CourseOutlinePreview selectedCourse={selectedCourse} courses={courses} />
    </div>
  );
}
