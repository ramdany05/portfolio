"use client";

import { PhoneIcon } from "lucide-react";
import type React from "react";
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

interface SocialLinkProps {
  href: string;
  iconType: IconType;
  label: string;
}

function SocialLink({ href, iconType, label }: SocialLinkProps) {
  const IconComponent = ICON_MAP[iconType];
  if (!IconComponent) return null;

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex size-10 items-center justify-center rounded-sm border-2 border-foreground bg-card shadow-brutal-sm transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
    >
      <IconComponent
        className="size-4 text-foreground transition-colors group-hover:text-foreground/70"
        aria-hidden="true"
      />
    </a>
  );
}

/**
 * Sticky vertical contact sidebar on the left side of the screen.
 * Visible ONLY on xl+ screens (desktop) to prevent blocking content on mobile/tablet.
 * On mobile/tablet, social icons are rendered inline inside the Hero and Footer.
 */
export function ContactSidebar() {
  const { contact, personalWebsiteUrl } = RESUME_DATA;

  return (
    <nav
      className="fixed left-6 top-1/2 z-50 -translate-y-1/2 print:hidden hidden xl:flex xl:flex-col xl:items-center xl:gap-3"
      aria-label="Contact links"
    >
      {personalWebsiteUrl && (
        <SocialLink
          href={personalWebsiteUrl}
          iconType="globe"
          label="Personal website"
        />
      )}

      {contact.tel && (
        <SocialLink
          href={`tel:${contact.tel}`}
          iconType="phone"
          label="Phone"
        />
      )}

      {contact.social.map((social) => (
        <SocialLink
          key={social.name}
          href={social.url}
          iconType={social.icon}
          label={social.name}
        />
      ))}
    </nav>
  );
}
