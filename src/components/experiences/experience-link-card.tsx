import { Card, CardBody } from "@nextui-org/react";

import type { ExperienceLink } from "types/experiences";

type ExperienceLinkCardProps = {
  link: ExperienceLink;
};

export default function ExperienceLinkCard({
  link,
}: Readonly<ExperienceLinkCardProps>) {
  return (
    <a href={link.href}>
      <Card className="w-full border-1.5 border-gray-700 hover:border-purple-600 p-1 hover:-translate-y-[2px] active:translate-y-0  hover:bg-zinc-800 group">
        <CardBody className="flex flex-row gap-x-4 items-start">
          <Card className="border-1 border-gray-800 group-hover:border-purple-800 group-hover:bg-zinc-800 min-w-min max-h-min">
            <CardBody>
              <link.icon size={20} className="text-slate-400" />
            </CardBody>
          </Card>
          <div className="flex flex-col">
            <span className="font-medium">{link.title}</span>
            <span className="text-slate-500">{link.description}</span>
          </div>
        </CardBody>
      </Card>
    </a>
  );
}
