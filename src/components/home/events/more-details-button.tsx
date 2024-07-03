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
};

export default function MoreDetailsButton({
  event,
  size = "md",
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
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody className="text-slate-300">
                <h3>{event.title}</h3>
                <p>
                  {new Date(event.start).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <p>
                  {event.location}
                </p>
                <p>{event.details}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                {/* <AddToCalendarButton event={event} /> */}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
