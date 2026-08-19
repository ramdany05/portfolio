import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

type SkillCategory = (typeof RESUME_DATA)["skills"][number];

interface SkillCategoryCardProps {
  category: SkillCategory;
}

function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-sm font-semibold text-foreground/60">
        {category.category}
      </h3>
      <ul className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <li key={skill}>
            <Badge
              className="text-xs print:text-[10px]"
              aria-label={`Skill: ${skill}`}
            >
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SkillsProps {
  skills: (typeof RESUME_DATA)["skills"];
  className?: string;
}

/**
 * Skills section — categorized grid layout.
 * Skills grouped by category with clear visual hierarchy.
 */
export function Skills({ skills, className }: SkillsProps) {
  return (
    <Section className={cn("space-y-6", className)}>
      <h2
        className="flex items-center gap-4 text-2xl font-bold"
        id="skills-section"
      >
        What I Work With
        <div className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-4">
        {skills.map((category) => (
          <SkillCategoryCard key={category.category} category={category} />
        ))}
      </div>
    </Section>
  );
}
