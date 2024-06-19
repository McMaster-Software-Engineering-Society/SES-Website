import { Button, Input } from "@nextui-org/react";
import { HiOutlineFilter } from "@react-icons/all-files/hi/HiOutlineFilter";
import { HiSearch } from "@react-icons/all-files/hi/HiSearch";
import clsx from "clsx";
import { useEffect, useState } from "react";
import LevelSelect from "./level-select";

type CourseSearchAndFilterProps = {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  selectedTerm: string;
  setSelectedTerm: (term: string) => void;
  searchFilter: string;
  setSearchFilter: (searchFilter: string) => void;
};

export default function CourseSearchAndFilter({
  selectedLevel,
  setSelectedLevel,
  selectedTerm,
  setSelectedTerm,
  searchFilter,
  setSearchFilter,
}: Readonly<CourseSearchAndFilterProps>) {
  const [useSearch, setUseSearch] = useState<boolean>(false);

  const handleSearch = () => {
    setUseSearch(!useSearch);
  };

  useEffect(() => {
    if (useSearch) {
      setSelectedLevel("all");
      setSelectedTerm("all");
    } else {
      setSearchFilter("");
    }
  }, [useSearch]);

  return (
    <div id="filters-and-search" className="flex flex-col gap-y-2">
      <div className="flex flex-row justify-between gap-x-2">
        <div className="w-full">
          {!useSearch ? (
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
          ) : (
            <Input
              placeholder="Type to search..."
              className="w-full"
              autoFocus
              value={searchFilter}
              onValueChange={(value) => {
                setSearchFilter(value);
              }}
            />
          )}
        </div>
        <Button
          isIconOnly
          className={clsx([
            "bg-[#F4F4F5] text-xl",
            !useSearch ? "w-full" : "w-16",
          ])}
          onClick={handleSearch}>
          {useSearch ? <HiOutlineFilter /> : <HiSearch />}
        </Button>
      </div>
      <LevelSelect
        selected={selectedTerm}
        setSelected={setSelectedTerm}
        items={[
          { key: "all", label: "All" },
          { key: "fall", label: "Fall" },
          { key: "winter", label: "Winter" },
          { key: "spring", label: "Spring" },
          { key: "summer", label: "Summer" },
        ]}
      />
    </div>
  );
}
