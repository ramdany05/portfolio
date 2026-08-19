import Image from "next/image";

interface AboutProps {
  name: string;
  summary: string;
  avatarUrl: string;
  initials: string;
  className?: string;
}

/**
 * About section — greeting style, no section title.
 * Text on the left, image on the right (stacked on mobile).
 */
export function Summary({
  name,
  summary,
  avatarUrl,
  initials,
  className,
}: AboutProps) {
  return (
    <div
      className={`flex flex-col items-center gap-8 md:flex-row md:gap-12 print:flex-row print:items-center print:gap-4 ${className ?? ""}`}
    >
      {/* Text */}
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Hi, I&apos;m <span className="text-primary">{name}</span> 👋
        </h2>
        <p className="text-pretty font-mono text-sm leading-relaxed text-foreground/70 md:text-base print:text-[12px]">
          {summary}
        </p>
      </div>

      {/* Image */}
      <div className="shrink-0">
        <div className="relative size-48 overflow-hidden rounded-lg border-2 border-foreground shadow-brutal md:size-56 print:hidden">
          <Image
            src={avatarUrl}
            alt={`${name}'s photo`}
            fill
            className="object-cover"
            priority
          />
        </div>
        {/* Print fallback */}
        <div className="hidden size-20 items-center justify-center rounded-lg border-2 border-foreground text-lg font-semibold print:flex">
          {initials}
        </div>
      </div>
    </div>
  );
}
