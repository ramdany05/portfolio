import { GlobeIcon, PhoneIcon } from "lucide-react";
import { RetroGrid } from "@/components/ui/retro-grid";
import { TextScramble } from "@/components/ui/text-scramble";
import {
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/icons";
import { XIcon } from "@/components/icons/x-icon";
import { RESUME_DATA } from "@/data/resume-data";
import type { IconType } from "@/lib/types";

const ICON_MAP: Record<
  IconType,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  globe: null as unknown as React.ComponentType<React.SVGProps<SVGSVGElement>>,
  mail: PhoneIcon,
  phone: PhoneIcon,
  instagram: InstagramIcon,
  email: EmailIcon,
};

function MobileSocialLinks() {
  const { contact, personalWebsiteUrl } = RESUME_DATA;

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-2 print:hidden xl:hidden">
      {contact.social.map((social) => {
        const IconComponent = ICON_MAP[social.icon];
        if (!IconComponent) return null;
        return (
          <a
            key={social.name}
            href={social.url}
            aria-label={social.name}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-10 items-center justify-center rounded-sm border-2 border-foreground bg-card shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
          >
            <IconComponent className="size-4 text-foreground" />
          </a>
        );
      })}
    </div>
  );
}

interface LocationLinkProps {
  location: typeof RESUME_DATA.location;
  locationLink: typeof RESUME_DATA.locationLink;
}

function LocationLink({ location, locationLink }: LocationLinkProps) {
  return (
    <p className="items-center text-pretty font-mono text-sm text-foreground/70">
      <a
        className="inline-flex gap-x-2 align-baseline leading-none hover:underline"
        href={locationLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Location: ${location}`}
      >
        <GlobeIcon className="size-4" aria-hidden="true" />
        {location}
      </a>
    </p>
  );
}

interface PrintContactProps {
  contact: typeof RESUME_DATA.contact;
  personalWebsiteUrl?: string;
}

function PrintContact({ contact, personalWebsiteUrl }: PrintContactProps) {
  return (
    <div className="hidden gap-x-2 font-mono text-sm text-foreground/80 print:flex print:text-[12px]">
      {personalWebsiteUrl && (
        <>
          <a
            className="underline hover:text-foreground/70"
            href={personalWebsiteUrl}
          >
            {new URL(personalWebsiteUrl).hostname}
          </a>
          <span aria-hidden="true">/</span>
        </>
      )}
      {contact.email && (
        <>
          <a
            className="underline hover:text-foreground/70"
            href={`mailto:${contact.email}`}
          >
            {contact.email}
          </a>
          <span aria-hidden="true">/</span>
        </>
      )}
      {contact.tel && (
        <a
          className="underline hover:text-foreground/70"
          href={`tel:${contact.tel}`}
        >
          {contact.tel}
        </a>
      )}
    </div>
  );
}

/**
 * Scroll-down indicator arrow
 */
function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 print:hidden">
      <a
        href="#about"
        className="flex flex-col items-center gap-2 text-foreground/40 transition-colors hover:text-foreground/70"
        aria-label="Scroll to content"
      >
        <span className="font-mono text-xs tracking-widest uppercase">
          Scroll
        </span>
        <svg
          className="size-5 animate-bounce"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>
    </div>
  );
}

/**
 * Hero section — full viewport intro
 */
export function Header() {
  return (
    <header className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center print:min-h-0 print:flex-row print:items-center print:text-left print:gap-4">
      <RetroGrid />

      <div className="z-10 space-y-4 print:space-y-1">
        <h1
          className="text-5xl font-bold tracking-tight md:text-7xl"
          id="resume-name"
        >
          {RESUME_DATA.name}
        </h1>

        <div className="inline-block border-2 border-foreground bg-card px-5 py-2.5 shadow-brutal-sm">
          <TextScramble
            duration={1.2}
            speed={0.02}
            as="p"
            className="font-mono text-sm font-semibold tracking-wide md:text-lg"
          >
            Turning ideas into products
          </TextScramble>
        </div>

        <p className="mx-auto max-w-xl text-pretty font-mono text-base text-foreground/70 md:text-lg print:mx-0 print:text-[12px]">
          {RESUME_DATA.about}
        </p>

        <LocationLink
          location={RESUME_DATA.location}
          locationLink={RESUME_DATA.locationLink}
        />

        <MobileSocialLinks />

        <PrintContact
          contact={RESUME_DATA.contact}
          personalWebsiteUrl={RESUME_DATA.personalWebsiteUrl}
        />
      </div>

      <ScrollIndicator />
    </header>
  );
}
