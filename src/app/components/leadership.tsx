import { Section } from "@/components/ui/section";
import type { RESUME_DATA } from "@/data/resume-data";

type Leadership = (typeof RESUME_DATA)["leadership"][number];

interface LeadershipItemProps {
  item: Leadership;
}

function LeadershipItem({ item }: LeadershipItemProps) {
  const { title, organization, start, end, description, highlights } = item;

  return (
    <div className="rounded-sm border-2 border-foreground bg-card p-5 shadow-brutal-sm transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal">
      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="font-mono text-xs font-semibold text-foreground/60">
            {organization}
          </p>
        </div>
        <span className="shrink-0 font-mono text-xs font-semibold text-foreground/50">
          {start} — {end}
        </span>
      </div>

      <p className="mt-3 text-sm text-foreground/80 leading-relaxed">
        {description}
      </p>

      {highlights && highlights.length > 0 && (
        <ul className="mt-3 space-y-1.5 border-t border-foreground/15 pt-3">
          {highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-2 text-xs text-foreground/80"
            >
              <span className="mt-0.5 text-primary">✦</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

interface LeadershipListProps {
  leadership: readonly Leadership[];
}

export function Leadership({ leadership }: LeadershipListProps) {
  return (
    <Section>
      <h2
        className="flex items-center gap-4 text-2xl font-bold"
        id="leadership-section"
      >
        Beyond the Code
        <div className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
      </h2>
      <div
        className="space-y-4"
        role="feed"
        aria-labelledby="leadership-section"
      >
        {leadership.map((item) => (
          <article key={`${item.title}-${item.organization}`}>
            <LeadershipItem item={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
