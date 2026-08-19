"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Section } from "@/components/ui/section";
import { GitHubIcon } from "@/components/icons";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  InfoIcon,
  Maximize2Icon,
} from "lucide-react";
import type { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

type Project = (typeof RESUME_DATA)["projects"][number];

interface ProjectImageProps {
  title: string;
  image?: string;
  images?: readonly string[];
  onClick?: () => void;
}

function ProjectImage({ title, image, images, onClick }: ProjectImageProps) {
  const displayImage = images && images.length > 0 ? images[0] : image;

  if (displayImage) {
    return (
      <div
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick?.();
          }
        }}
        role="button"
        tabIndex={0}
        className="group relative cursor-pointer overflow-hidden rounded-sm border-2 border-foreground shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg"
      >
        <img
          src={displayImage}
          alt={`${title} screenshot`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-sm border-2 border-foreground bg-background px-3 py-1.5 text-xs font-bold shadow-brutal-sm">
            <InfoIcon className="size-4" /> View Details
          </span>
        </div>
      </div>
    );
  }

  // Placeholder with project initials
  return (
    <div
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.();
        }
      }}
      role="button"
      tabIndex={0}
      className="group relative flex h-full min-h-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-sm border-2 border-foreground bg-card shadow-brutal transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg md:min-h-[280px]"
    >
      <div className="select-none text-center">
        <span className="block font-mono text-4xl font-bold text-foreground/10 transition-colors group-hover:text-foreground/20 md:text-5xl">
          {title
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="flex items-center gap-1.5 rounded-sm border-2 border-foreground bg-background px-3 py-1.5 text-xs font-bold shadow-brutal-sm">
          <InfoIcon className="size-4" /> View Details
        </span>
      </div>
    </div>
  );
}

interface ImageCarouselProps {
  images: readonly string[];
  title: string;
}

function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-2">
      <div className="group relative overflow-hidden rounded-sm border-2 border-foreground bg-black/5 shadow-brutal">
        <img
          src={images[currentIndex]}
          alt={`${title} screenshot ${currentIndex + 1}`}
          className="h-64 w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105 sm:h-80 md:h-96"
          onClick={() => setFullScreenImage(images[currentIndex])}
        />

        <button
          type="button"
          onClick={() => setFullScreenImage(images[currentIndex])}
          className="absolute right-2 top-2 rounded-sm border-2 border-foreground bg-background p-1.5 shadow-brutal-sm transition-all hover:scale-110 opacity-0 group-hover:opacity-100"
          aria-label="View full image"
        >
          <Maximize2Icon className="size-4" />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-sm border-2 border-foreground bg-background p-1.5 shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:shadow-brutal active:translate-x-0"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="size-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm border-2 border-foreground bg-background p-1.5 shadow-brutal-sm transition-all hover:translate-x-0.5 hover:shadow-brutal active:translate-x-0"
              aria-label="Next image"
            >
              <ChevronRightIcon className="size-5" />
            </button>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-sm border-2 border-foreground bg-background/90 px-2 py-0.5 font-mono text-xs font-bold shadow-brutal-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex justify-center gap-2 pt-1">
          {images.map((img, idx) => (
            <button
              key={img}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "h-2 rounded-full border border-foreground transition-all",
                idx === currentIndex
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted hover:bg-muted-foreground/50"
              )}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Fullscreen Image Preview Lightbox */}
      <Dialog
        open={Boolean(fullScreenImage)}
        onOpenChange={() => setFullScreenImage(null)}
      >
        <DialogContent className="max-w-[95vw] max-h-[95vh] border-2 border-foreground p-2 shadow-brutal bg-background/95 sm:rounded-sm">
          <DialogHeader className="sr-only">
            <DialogTitle>Image View: {title}</DialogTitle>
            <DialogDescription>
              Full resolution screenshot view
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center p-2">
            <img
              src={fullScreenImage || ""}
              alt={`${title} enlarged screenshot`}
              className="max-h-[85vh] w-auto max-w-full rounded-sm border border-foreground object-contain shadow-brutal-sm"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

function ProjectDetailModal({
  project,
  isOpen,
  onClose,
}: ProjectDetailModalProps) {
  if (!project) return null;

  const {
    title,
    description,
    detailedDescription,
    techStack,
    image,
    images,
    role,
    duration,
    features,
    github,
    link,
  } = project;

  const allImages = images && images.length > 0 ? images : image ? [image] : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto border-2 border-foreground shadow-brutal sm:rounded-sm">
        <DialogHeader className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-2 pr-6">
            <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            {duration && (
              <span className="font-mono text-xs font-semibold text-muted-foreground">
                {duration}
              </span>
            )}
          </div>
          {role && (
            <p className="font-mono text-sm text-foreground/60">
              Role: <span className="font-bold text-foreground">{role}</span>
            </p>
          )}
          <DialogDescription className="sr-only">
            Details for project {title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Image carousel or placeholder */}
          {allImages.length > 0 ? (
            <ImageCarousel images={allImages} title={title} />
          ) : (
            <div className="flex h-48 items-center justify-center rounded-sm border-2 border-foreground bg-card shadow-brutal">
              <span className="font-mono text-4xl font-bold text-foreground/10">
                {title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </span>
            </div>
          )}

          {/* Detailed description */}
          <div className="rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm">
            <h4 className="mb-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Overview
            </h4>
            <p className="text-sm leading-relaxed text-foreground/80">
              {detailedDescription || description}
            </p>
          </div>

          {/* Key Features */}
          {features && features.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Key Features & Highlights
              </h4>
              <ul className="grid gap-2 sm:grid-cols-2">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 rounded-sm border border-foreground/20 bg-muted/40 p-2.5 text-xs text-foreground/80"
                  >
                    <span className="mt-0.5 text-primary">✦</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Technologies Used
              </h4>
              <ul className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <li key={tech}>
                    <Badge variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-2">
            {github && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <GitHubIcon className="size-4" />
                  <span>View Source</span>
                </a>
              </Button>
            )}
            {link && (
              <Button size="sm" asChild>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLinkIcon className="size-4" />
                  <span>Live Demo ({link.label})</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpenDetails: (project: Project) => void;
}

function ProjectCard({ project, index, onOpenDetails }: ProjectCardProps) {
  const { title, description, techStack, image, images, github, link } =
    project;
  const isReversed = index % 2 !== 0;

  return (
    <article
      className={cn(
        "grid gap-6 md:grid-cols-2 md:items-center md:gap-8",
        isReversed && "md:[direction:rtl]"
      )}
    >
      {/* Image */}
      <div className={cn(isReversed && "md:[direction:ltr]")}>
        <ProjectImage
          title={title}
          image={image}
          images={images}
          onClick={() => onOpenDetails(project)}
        />
      </div>

      {/* Content */}
      <div className={cn("space-y-4", isReversed && "md:[direction:ltr]")}>
        <div>
          <p className="mb-1 font-mono text-sm font-semibold text-foreground/50">
            Featured Project
          </p>
          <h3
            onClick={() => onOpenDetails(project)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onOpenDetails(project);
              }
            }}
            role="button"
            tabIndex={0}
            className="inline-block cursor-pointer text-2xl font-bold transition-colors hover:text-primary hover:underline"
          >
            {title}
          </h3>
        </div>

        <div className="rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm">
          <p className="text-pretty text-sm text-foreground/70">
            {description}
          </p>
        </div>

        {/* Tech tags */}
        {techStack.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <li key={tech}>
                <Badge
                  variant="secondary"
                  className="text-xs print:text-[10px]"
                >
                  {tech}
                </Badge>
              </li>
            ))}
          </ul>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 print:hidden">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-1.5 text-xs font-bold"
          >
            <InfoIcon className="size-4" />
            Details
          </Button>

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-sm border-2 border-foreground bg-card shadow-brutal-sm transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
              aria-label={`${title} GitHub repository`}
            >
              <GitHubIcon className="size-4" aria-hidden="true" />
            </a>
          )}
          {link && (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex size-9 items-center justify-center rounded-sm border-2 border-foreground bg-card shadow-brutal-sm transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal"
              aria-label={`${title} live demo`}
            >
              <ExternalLinkIcon className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

interface ProjectsProps {
  projects: (typeof RESUME_DATA)["projects"];
}

/**
 * Projects section — alternating 2-column layout.
 * Image on one side, description + tags + action buttons on the other.
 */
export function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section className="space-y-10 print:space-y-6">
      <h2
        className="flex items-center gap-4 text-2xl font-bold"
        id="side-projects"
      >
        What I&apos;ve Built
        <div className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
      </h2>

      <div
        className="space-y-12 print:space-y-6"
        role="feed"
        aria-labelledby="side-projects"
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onOpenDetails={setSelectedProject}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  );
}
