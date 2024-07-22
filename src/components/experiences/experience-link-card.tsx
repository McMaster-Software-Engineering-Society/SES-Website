import { Card, CardBody } from "@nextui-org/react";

import type { ExperienceLink } from "types/experiences";

type ExperienceLinkCardProps = {
  link: ExperienceLink;
};

export default function ExperienceLinkCard({ link }: ExperienceLinkCardProps) {
  // TODO: https://nextui.pro/components/application/cards
  return (
    <Card>
      <CardBody>{link.title}</CardBody>
    </Card>
  );
}
