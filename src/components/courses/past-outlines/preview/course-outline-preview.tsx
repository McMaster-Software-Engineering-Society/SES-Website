import { Button } from "@nextui-org/react";
import type { Course } from "@utils/past-outlines";
import { HiOutlineExternalLink } from "@react-icons/all-files/hi/HiOutlineExternalLink";

type CourseOutlinePreviewProps = {
  selectedCourse: number;
  courses: Course[];
};

export default function CourseOutlinePreview({
  selectedCourse,
  courses,
}: CourseOutlinePreviewProps) {
  return (
    <div
      id="course-outline-preview"
      className="hidden flex-col ml-8 border-1 lg:flex w-full justify-center items-center text-center">
      {courses[selectedCourse].pngPaths.length === 0 && (
        <div>
          <h2 className="text-xl font-bold">Preview is unavailable</h2>
          <Button
            className="mt-2"
            variant="bordered"
            endContent={<HiOutlineExternalLink />}
            onClick={() => window.open(courses[selectedCourse].pdfPath)}>
            Open outline
          </Button>
        </div>
      )}
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
