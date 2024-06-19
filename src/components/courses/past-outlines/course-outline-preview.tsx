import type { Course } from "@utils/past-outlines";

type CourseOutlinePreviewProps = {
  selectedCourse: number;
  courses: Course[];
};

export default function CourseOutlinePreview({
  selectedCourse,
  courses,
}: CourseOutlinePreviewProps) {
  return (
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
  );
}
