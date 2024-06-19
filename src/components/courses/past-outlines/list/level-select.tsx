import { Tab, Tabs } from "@nextui-org/react";

type LevelSelectProps = {
  selected: string;
  setSelected: (level: string) => void;
  items: {
    key: string;
    label: string;
  }[];
  className?: string;
};

export default function LevelSelect({
  selected,
  setSelected,
  items,
  className,
}: Readonly<LevelSelectProps>) {
  return (
    <Tabs
      aria-label="Options"
      selectedKey={selected}
      onSelectionChange={setSelected}
      className={className}>
      {items.map((item) => (
        <Tab key={item.key} title={item.label} />
      ))}
    </Tabs>
  );
}
