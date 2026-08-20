import type { StaticImageData } from "next/image";

export type ResumeIcon =
  | React.ComponentType<React.SVGProps<SVGSVGElement>>
  | StaticImageData;

export type IconType =
  | "github"
  | "linkedin"
  | "x"
  | "globe"
  | "mail"
  | "phone"
  | "instagram"
  | "email";

export interface ResumeData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  summary: string;
  avatarUrl: string;
  personalWebsiteUrl: string;
  contact: {
    email: string;
    tel: string;
    social: Array<{
      name: string;
      url: string;
      icon: IconType;
    }>;
  };
  education: Array<{
    school: string;
    degree: string;
    start: string;
    end: string;
  }>;
  leadership: Array<{
    title: string;
    organization: string;
    start: string;
    end: string;
    description: string;
    highlights?: readonly string[];
  }>;
  work: Array<{
    company: string;
    link: string;
    badges: string[];
    techBadges: string[];
    title: string;
    start: string;
    end: string | null;
    description: string;
    highlights?: readonly string[];
  }>;
  skills: Array<{
    category: string;
    items: string[];
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    year: string;
    url?: string;
  }>;
  projects: Array<{
    title: string;
    techStack: string[];
    description: string;
    image?: string;
    images?: readonly string[];
    detailedDescription?: string;
    role?: string;
    start_date?: string;
    end_date?: string;
    features?: readonly string[];
    github?: string;
    link?: {
      label: string;
      href: string;
    };
  }>;
}
