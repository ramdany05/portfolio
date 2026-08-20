import type { Metadata } from "next";
import { CommandMenu } from "@/components/command-menu";
import { getPortfolioData } from "@/lib/portfolio-data";
import { generateResumeStructuredData } from "@/lib/structured-data";
import { Certifications } from "./components/certifications";
import { ContactSidebar } from "./components/contact-sidebar";
import { Education } from "./components/education";
import { Header } from "./components/header";
import { Leadership } from "./components/leadership";
import { Projects } from "./components/projects";
import { Skills } from "./components/skills";
import { Summary } from "./components/summary";
import { WorkExperience } from "./components/work-experience";

// Always fetch fresh data from Supabase on each request
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPortfolioData();
  return {
    title: `${data.name} - Resume`,
    description: data.about,
    openGraph: {
      title: `${data.name} - Resume`,
      description: data.about,
      type: "profile",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${data.name} - Resume`,
      description: data.about,
    },
  };
}

export default async function ResumePage() {
  const data = await getPortfolioData();
  const structuredData = generateResumeStructuredData();

  function getCommandMenuLinks() {
    const links = [];

    if (data.personalWebsiteUrl) {
      links.push({
        url: data.personalWebsiteUrl,
        title: "Personal Website",
      });
    }

    return [
      ...links,
      ...data.contact.social.map((socialMediaLink) => ({
        url: socialMediaLink.url,
        title: socialMediaLink.name,
      })),
    ];
  }

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe for JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main className="relative overflow-auto print:p-11" id="main-content">
        <ContactSidebar />

        <div className="sr-only">
          <h1>{data.name}&apos;s Resume</h1>
        </div>

        {/* Hero Section — full viewport */}
        <section className="print:min-h-0" aria-label="Hero">
          <div className="animate-fade-in">
            <Header />
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="bg-card px-4 py-10 sm:px-6 sm:py-12 md:px-16 md:py-20 print:bg-transparent print:py-4"
          aria-label="About"
        >
          <div
            className="mx-auto max-w-5xl animate-fade-in"
            style={{ animationDelay: "75ms" }}
          >
            <Summary
              name={data.name}
              summary={data.summary}
              avatarUrl={data.avatarUrl}
              initials={data.initials}
            />
          </div>
        </section>

        {/* Skills Section */}
        <section
          className="border-y-2 border-foreground bg-card px-4 py-8 sm:px-6 sm:py-10 md:px-16 md:py-14 print:border-0 print:bg-transparent print:py-4"
          aria-label="Skills"
        >
          <div
            className="mx-auto max-w-5xl animate-fade-in"
            style={{ animationDelay: "150ms" }}
          >
            <Skills skills={data.skills} />
          </div>
        </section>

        {/* Work Experience Section */}
        <section
          className="px-4 py-8 sm:px-6 sm:py-10 md:px-16 md:py-14 print:py-4"
          aria-label="Work Experience"
        >
          <div
            className="mx-auto max-w-5xl animate-fade-in"
            style={{ animationDelay: "225ms" }}
          >
            <WorkExperience work={data.work} />
          </div>
        </section>

        {/* Projects Section */}
        <section
          className="border-y-2 border-foreground bg-card px-4 py-8 sm:px-6 sm:py-10 md:px-16 md:py-14 print:border-0 print:bg-transparent print:py-4"
          aria-label="Projects"
        >
          <div
            className="mx-auto max-w-5xl animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <Projects projects={data.projects} />
          </div>
        </section>

        {/* Education Section */}
        <section
          className="px-4 py-8 sm:px-6 sm:py-10 md:px-16 md:py-14 print:py-4"
          aria-label="Education"
        >
          <div
            className="mx-auto max-w-5xl animate-fade-in"
            style={{ animationDelay: "375ms" }}
          >
            <Education education={data.education} />
          </div>
        </section>

        {/* Leadership Section */}
        <section
          className="border-y-2 border-foreground bg-card px-4 py-8 sm:px-6 sm:py-10 md:px-16 md:py-14 print:border-0 print:bg-transparent print:py-4"
          aria-label="Leadership"
        >
          <div
            className="mx-auto max-w-5xl animate-fade-in"
            style={{ animationDelay: "450ms" }}
          >
            <Leadership leadership={data.leadership} />
          </div>
        </section>

        {/* Certifications Section */}
        <section
          className="px-4 py-8 sm:px-6 sm:py-10 md:px-16 md:py-14 print:py-4"
          aria-label="Certifications"
        >
          <div
            className="mx-auto max-w-5xl animate-fade-in"
            style={{ animationDelay: "525ms" }}
          >
            <Certifications certifications={data.certifications} />
          </div>
        </section>

        <nav className="print:hidden" aria-label="Quick navigation">
          <CommandMenu links={getCommandMenuLinks()} />
        </nav>
      </main>
    </>
  );
}
