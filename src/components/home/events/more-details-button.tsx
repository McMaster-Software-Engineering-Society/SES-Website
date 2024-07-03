import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import type { CalendarEvent } from "types/event";
import AddToCalendarButton from "./add-to-calendar-button";

type MoreDetailsButtonProps = {
  event: CalendarEvent;
  size?: "sm" | "md";
  isEventPast?: boolean;
};

export default function MoreDetailsButton({
  event,
  size = "md",
  isEventPast = false,
}: Readonly<MoreDetailsButtonProps>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} size={size}>
        Details
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={size === "sm"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-slate-300 mt-4">
                <h3 className="text-2xl">{event.title}</h3>
                <p className="font-normal text-sm">
                  {new Date(event.start).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <p className="font-normal text-sm italic">
                  {event.location}{" "}
                  {event.googleMapsLink && (
                    <a
                      href={event.googleMapsLink}
                      target="_blank"
                      className="not-italic text-blue-500">
                      (<span className="underline">Google Maps</span>)
                    </a>
                  )}
                </p>
              </ModalHeader>
              <ModalBody className="text-slate-300">
                <p>{event.details}</p>
              </ModalBody>
              <ModalFooter>
                {!isEventPast && <AddToCalendarButton event={event} />}
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
