import { Button } from "@nextui-org/react";
import LevelSelect from "./level-select";

type CourseSearchAndFilterProps = {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedTerm: string;
  setSelectedTerm: (term: string) => void;
};

export default function CourseSearchAndFilter({
  selectedLevel,
  setSelectedLevel,
  selectedTerm,
  setSelectedTerm,
}: Readonly<CourseSearchAndFilterProps>) {
  return (
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
  );
}
