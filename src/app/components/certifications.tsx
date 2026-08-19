import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { ExternalLinkIcon, AwardIcon } from "lucide-react";
import type { RESUME_DATA } from "@/data/resume-data";

type Certification = (typeof RESUME_DATA)["certifications"][number];

interface CertificationItemProps {
  certification: Certification;
}

function CertificationItem({ certification }: CertificationItemProps) {
  const { name, issuer, year, url } = certification;

  const content = (
    <div className="group relative flex h-full flex-col justify-between rounded-sm border-2 border-foreground bg-card p-5 shadow-brutal-sm transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge variant="secondary" className="font-mono text-xs">
            {issuer}
          </Badge>
          <span className="font-mono text-xs font-semibold text-foreground/60">
            {year}
          </span>
        </div>

        <div className="space-y-1">
          <h3 className="text-base font-bold leading-snug group-hover:text-primary transition-colors">
            {name}
          </h3>
        </div>
      </div>

      {url && (
        <div className="mt-4 flex items-center gap-1.5 font-mono text-xs font-bold text-foreground/70 group-hover:text-foreground">
          <AwardIcon className="size-3.5" />
          <span>Verify Credential</span>
          <ExternalLinkIcon className="size-3 transition-transform group-hover:translate-x-0.5" />
        </div>
      )}
    </div>
  );

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
        aria-label={`${name} by ${issuer}`}
      >
        {content}
      </a>
    );
  }

  return content;
}

interface CertificationsListProps {
  certifications: readonly Certification[];
}

export function Certifications({ certifications }: CertificationsListProps) {
  return (
    <Section>
      <h2
        className="flex items-center gap-4 text-2xl font-bold"
        id="certifications-section"
      >
        What I&apos;ve Learned
        <div className="h-px flex-1 bg-foreground/15" aria-hidden="true" />
      </h2>
      <div
        className="grid gap-4 sm:grid-cols-2"
        role="feed"
        aria-labelledby="certifications-section"
      >
        {certifications.map((item) => (
          <article key={item.name} className="h-full">
            <CertificationItem certification={item} />
          </article>
        ))}
      </div>
    </Section>
  );
}
