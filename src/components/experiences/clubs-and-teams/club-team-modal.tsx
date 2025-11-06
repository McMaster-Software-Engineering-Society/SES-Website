import React from "react";
import { FaExpandAlt } from "@react-icons/all-files/fa/FaExpandAlt";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaXTwitter } from "@react-icons/all-files/fa6/FaXTwitter";
import { IoGlobeOutline } from "@react-icons/all-files/io5/IoGlobeOutline";
import { IoMailOutline } from "@react-icons/all-files/io5/IoMailOutline";
import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { FaFacebook } from "@react-icons/all-files/fa/FaFacebook";
import { FaYoutube } from "@react-icons/all-files/fa/FaYoutube";
import { FaTiktok } from "@react-icons/all-files/fa6/FaTiktok";
import { SiLinktree } from "@react-icons/all-files/si/SiLinktree";
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";

interface Props {
  name: string;
  image: {
    src: string;
    alt: string;
  };
  description: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    email?: string;
    facebook?: string;
    youtube?: string;
    tiktok?: string;
    linktree?: string;
    discord?: string;
  };
}

export default function ClubTeamModal({
  name,
  image,
  description,
  socials,
}: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderSocialIcons = () => (
    <div className="flex flex-row gap-x-2 flex-wrap">
      {socials?.instagram && (
        <a
          href={socials.instagram}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaInstagram />
          </div>
        </a>
      )}
      {socials?.twitter && (
        <a
          href={socials.twitter}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaXTwitter />
          </div>
        </a>
      )}
      {socials?.github && (
        <a
          href={socials.github}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaGithub />
          </div>
        </a>
      )}
      {socials?.linkedin && (
        <a
          href={socials.linkedin}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaLinkedinIn />
          </div>
        </a>
      )}
      {socials?.website && (
        <a
          href={socials.website}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <IoGlobeOutline />
          </div>
        </a>
      )}
      {socials?.email && (
        <a href={`mailto:${socials.email}`} className="rounded-full">
          <div className="text-slate-200 hover:text-primary text-lg">
            <IoMailOutline />
          </div>
        </a>
      )}
      {socials?.facebook && (
        <a
          href={socials.facebook}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaFacebook />
          </div>
        </a>
      )}
      {socials?.youtube && (
        <a
          href={socials.youtube}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaYoutube />
          </div>
        </a>
      )}
      {socials?.tiktok && (
        <a
          href={socials.tiktok}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaTiktok />
          </div>
        </a>
      )}
      {socials?.linktree && (
        <a
          href={socials.linktree}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <SiLinktree />
          </div>
        </a>
      )}
      {socials?.discord && (
        <a
          href={socials.discord}
          className="rounded-full"
          target="_blank"
          rel="noopener">
          <div className="text-slate-200 hover:text-primary text-lg">
            <FaDiscord />
          </div>
        </a>
      )}
    </div>
  );

  return (
    <>
      {/* Flat icon-only trigger with no outline/border */}
      <button
        type="button"
        onClick={onOpen}
        aria-label="Expand details"
        className="text-slate-200 hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 p-0 m-0 leading-none">
        <FaExpandAlt className="w-4 h-4" />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="2xl"
        scrollBehavior="inside"
        placement="center"
        backdrop="opaque"
        className="dark"
        classNames={{
          base: "max-h-[90vh]",
          wrapper: "items-center justify-center",
          backdrop: "bg-black/80",
        }}>
        <ModalContent className="bg-slate-950 text-white mx-4 my-4 max-w-full">
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-slate-950 text-white">
                <h2 className="text-2xl font-bold text-white">{name}</h2>
              </ModalHeader>
              <ModalBody className="pb-6 bg-slate-950">
                <div className="flex flex-col gap-6">
                  {/* Stack on mobile for more content width; row on sm+ */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="rounded-lg object-cover aspect-square flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                    />
                    <div className="flex flex-col gap-3 flex-1">
                      <h3 className="text-lg font-semibold text-white">
                        About
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-200">
                        {description}
                      </p>
                    </div>
                  </div>

                  {Object.values(socials || {}).some(Boolean) && (
                    <div className="flex flex-col gap-3">
                      <h3 className="text-lg font-semibold text-white">
                        Connect With Us
                      </h3>
                      {renderSocialIcons()}
                    </div>
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
