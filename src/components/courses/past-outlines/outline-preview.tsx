import {
  Button,
  Card,
  CardBody,
  Divider,
  ScrollShadow,
} from "@nextui-org/react";
import { useState } from "react";
import CourseListItem from "./course-list-item";
import LevelSelect from "./level-select";

type OutlinePreviewProps = {
  courses: {
    name: string;
    description: string;
    term: string;
  }[];
};

export default function OutlinePreview({
  courses,
}: Readonly<OutlinePreviewProps>) {
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [selectedTerm, setSelectedTerm] = useState<string>("any");

  return (
    <div className="flex flex-row">
      <div className="flex flex-col max-w-min">
        <div id="filters-and-search" className="flex flex-col gap-y-2">
          <div className="flex flex-row justify-between gap-x-2">
            <LevelSelect
              selected={selectedLevel}
              setSelected={setSelectedLevel}
              items={[
                { key: "all", label: "All" },
                { key: "level-2", label: "Level 2" },
                { key: "level-3", label: "Level 3" },
                { key: "level-4", label: "Level 4" },
              ]}
            />
            <Button isIconOnly className="w-full bg-[#F4F4F5]" />
          </div>
          <LevelSelect
            selected={selectedTerm}
            setSelected={setSelectedTerm}
            items={[
              { key: "All", label: "All" },
              { key: "fall", label: "Fall" },
              { key: "winter", label: "Winter" },
              { key: "spring", label: "Spring" },
              { key: "summer", label: "Summer" },
            ]}
          />
        </div>
        <Card className="mt-4">
          <CardBody>
            <ScrollShadow className="flex flex-col gap-y-3 overflow-y-scroll max-h-[65vh]">
              {courses.map((course, index) => (
                <>
                  <CourseListItem
                    name={course.name}
                    description={course.description}
                    term={course.term}
                  />
                  {index !== courses.length - 1 && <Divider />}
                </>
              ))}
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
