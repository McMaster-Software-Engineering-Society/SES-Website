import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { FaPlus } from "@react-icons/all-files/fa/FaPlus";
import { SiGooglecalendar } from "@react-icons/all-files/si/SiGooglecalendar";
import { SiMicrosoftoutlook } from "@react-icons/all-files/si/SiMicrosoftoutlook";

const getGoogleAddEventUrl = (event) => {
  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title,
  )}&dates=${event.start.replace(/-|:|\.\d\d\d/g, "")}/${event.end.replace(
    /-|:|\.\d\d\d/g,
    "",
  )}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(
    event.location,
  )}&sf=true&output=xml`;

  return googleCalendarUrl;
};

const getOutlookAddEventUrl = (event) => {
  const outlookCalendarUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(
    event.title,
  )}&body=${encodeURIComponent(event.details)}&location=${encodeURIComponent(
    event.location,
  )}&startdt=${event.start}&enddt=${event.end}&path=/calendar/view/Month`;

  return outlookCalendarUrl;
};

type AddToCalendarButtonProps = {
  event: {
    title: string;
    start: string;
    end: string;
    details: string;
    location: string;
  };
};

export default function AddToCalendarButton({
  event,
}: Readonly<AddToCalendarButtonProps>) {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered" startContent={<FaPlus />}>
          Add to Calendar
        </Button>
      </DropdownTrigger>
      <DropdownMenu className="text-white">
        <DropdownItem
          startContent={<SiGooglecalendar />}
          href={getGoogleAddEventUrl(event)}
          target="_blank">
          Google Calendar
        </DropdownItem>
        <DropdownItem
          startContent={<SiMicrosoftoutlook />}
          href={getOutlookAddEventUrl(event)}
          target="_blank">
          Outlook Calendar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
