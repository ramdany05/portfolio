import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { GraduationCapIcon, BookOpenIcon } from "lucide-react";
import type { RESUME_DATA } from "@/data/resume-data";

type Education = (typeof RESUME_DATA)["education"][number];

interface EducationItemProps {
  education: Education;
}

/**
 * Individual education card component with neobrutalist styling
 */
function EducationItem({ education }: EducationItemProps) {
  const { school, start, end, degree } = education;

  // Extract thesis and GPA if present in degree string
  const degreeParts = degree.split(" — Thesis: ");
  const degreeTitleAndGPA = degreeParts[0];
  const thesis = degreeParts[1];

  // Extract GPA badge if matching pattern (GPA: X.XX / 4.00)
  const gpaMatch = degreeTitleAndGPA.match(/\(GPA:\s*[\d.]+\s*\/\s*[\d.]+\)/i);
  const cleanDegreeTitle = gpaMatch
    ? degreeTitleAndGPA.replace(gpaMatch[0], "").trim()
    : degreeTitleAndGPA;
  const gpaText = gpaMatch ? gpaMatch[0].replace(/[()]/g, "") : null;

  return (
    <div className="rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal-lg">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCapIcon className="size-5 text-primary" />
            <h3 className="text-xl font-bold">{school}</h3>
          </div>
          <p className="font-mono text-sm font-semibold text-foreground/80">
            {cleanDegreeTitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
          <span className="font-mono text-xs font-bold text-foreground/60">
            {start} — {end}
          </span>
          {gpaText && (
            <Badge variant="default" className="text-xs font-mono">
              {gpaText}
            </Badge>
          )}
        </div>
      </div>

      {thesis && (
        <div className="mt-4 rounded-sm border border-foreground/20 bg-muted/40 p-3 text-xs text-foreground/80">
          <div className="mb-1 flex items-center gap-1.5 font-mono font-bold text-foreground">
            <BookOpenIcon className="size-3.5 text-primary" />
            <span>Bachelor Thesis:</span>
          </div>
          <p className="leading-relaxed">{thesis}</p>
        </div>
      )}
    </div>
  );
}

interface EducationListProps {
  education: readonly Education[];
}

export function Education({ education }: EducationListProps) {
  return (
    <Section>
      <h2
        className="flex items-center gap-4 text-2xl font-bold"
        id="education-section"
      >
        Where I Studied
        <div className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
      </h2>
      <div
        className="space-y-6"
        role="feed"
        aria-labelledby="education-section"
      >
        {education.map((item) => (
          <article key={item.school}>
            <EducationItem education={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
