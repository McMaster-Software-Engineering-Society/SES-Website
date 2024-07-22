import { Card, CardBody } from "@nextui-org/react";

import type { ExperienceLink } from "types/experiences";

type ExperienceLinkCardProps = {
  link: ExperienceLink;
};

export default function ExperienceLinkCard({
  link,
}: Readonly<ExperienceLinkCardProps>) {
  // TODO: https://nextui.pro/components/application/cards
  return (
    <Card className="border-1.5 border-gray-700 p-1">
      <CardBody className="flex flex-row gap-x-4">
        <Card className="border-1 border-gray-800">
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
  );
}
