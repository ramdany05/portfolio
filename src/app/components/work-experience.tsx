"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

type WorkExperience = (typeof RESUME_DATA)["work"][number];

interface WorkPeriodProps {
  start: WorkExperience["start"];
  end?: WorkExperience["end"];
}

function WorkPeriod({ start, end }: WorkPeriodProps) {
  return (
    <p
      className="font-mono text-xs font-semibold text-foreground/60 md:text-sm"
      title={`Employment period: ${start} to ${end ?? "Present"}`}
    >
      {start} — {end ?? "Present"}
    </p>
  );
}

interface WorkExperienceProps {
  work: (typeof RESUME_DATA)["work"];
}

/**
 * Work Experience section — tabbed layout.
 * Mobile: Clean horizontal pill selector + Card view.
 * Desktop: Vertical sidebar tabs + Details panel.
 */
export function WorkExperience({ work }: WorkExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = work[activeIndex];

  return (
    <Section>
      {/* Section header */}
      <div className="flex items-center gap-4">
        <h2
          className="flex items-center gap-2 text-2xl font-bold"
          id="work-experience"
        >
          Where I&apos;ve Worked
        </h2>
        <div className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
      </div>

      {/* Content container */}
      <div className="flex flex-col gap-6 md:flex-row print:gap-4">
        {/* Mobile Tabs: Horizontal Pills with smooth scroll */}
        {/* Desktop Tabs: Vertical left sidebar */}
        <div
          className="flex flex-row gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar md:w-1/4 md:flex-col md:gap-1 md:overflow-x-visible md:pb-0 md:pt-0 md:border-l-2 md:border-foreground/20 print:hidden"
          role="tablist"
          aria-label="Work experiences"
        >
          {work.map((item, index) => (
            <button
              key={`${item.company}-${item.start}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "shrink-0 rounded-sm px-4 py-2.5 text-left font-mono text-xs font-bold transition-all duration-150 sm:text-sm md:rounded-none md:border-l-2 md:px-4 md:py-3",
                index === activeIndex
                  ? "border-2 border-foreground bg-primary text-primary-foreground shadow-brutal-sm md:-ml-[2px] md:border-l-2 md:border-t-0 md:border-r-0 md:border-b-0 md:border-foreground md:bg-transparent md:text-foreground md:shadow-none"
                  : "border-2 border-foreground/20 bg-card text-foreground/70 hover:border-foreground hover:text-foreground md:border-transparent md:bg-transparent md:text-foreground/50 md:hover:border-foreground/40"
              )}
              aria-selected={index === activeIndex}
              role="tab"
            >
              {item.company}
            </button>
          ))}
        </div>

        {/* Details Panel - Card container on mobile, clean details on desktop */}
        <div
          className="flex-1 rounded-sm border-2 border-foreground bg-card p-5 shadow-brutal md:border-0 md:bg-transparent md:p-0 md:shadow-none"
          role="tabpanel"
        >
          <div className="mb-4 space-y-1 md:mb-6">
            <h3 className="text-lg font-bold sm:text-xl">
              {active.title}
              <span className="text-foreground/50"> @ </span>
              {active.link ? (
                <a
                  href={active.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-foreground/30 underline-offset-2 hover:decoration-foreground"
                >
                  {active.company}
                </a>
              ) : (
                active.company
              )}
            </h3>
            <WorkPeriod start={active.start} end={active.end} />
          </div>

          {/* Description + Highlights */}
          <div className="space-y-4">
            <p className="text-pretty text-xs leading-relaxed text-foreground/80 sm:text-sm">
              {active.description}
            </p>

            {active.highlights && active.highlights.length > 0 && (
              <ul className="space-y-2.5" aria-label="Highlights">
                {active.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-xs text-foreground/80 sm:text-sm"
                  >
                    <span
                      className="mt-0.5 shrink-0 text-primary"
                      aria-hidden="true"
                    >
                      ✦
                    </span>
                    <span className="text-pretty">{highlight}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* Tech badges */}
            {active.techBadges && active.techBadges.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {active.techBadges.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="text-xs print:text-[10px]"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Print: show all experiences linearly */}
      <div className="hidden print:block print:space-y-6">
        {work.map((item) => (
          <div key={`${item.company}-${item.start}-print`}>
            <div className="mb-2">
              <h3 className="text-sm font-semibold">
                {item.title} @ {item.company}
              </h3>
              <p className="font-mono text-[10px] text-gray-500">
                {item.start} — {item.end ?? "Present"}
              </p>
            </div>
            <p className="text-[10px] text-foreground/70">{item.description}</p>
            {item.highlights && item.highlights.length > 0 && (
              <ul className="mt-1 list-inside list-disc text-[10px] text-foreground/70">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
