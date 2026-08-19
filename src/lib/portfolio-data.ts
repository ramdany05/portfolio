import { createPublicClient } from "@/lib/supabase/public-client";
import { RESUME_DATA } from "@/data/resume-data";

export async function getPortfolioData() {
  try {
    const supabase = createPublicClient();

    const [
      { data: profile },
      { data: projects },
      { data: work },
      { data: education },
      { data: certifications },
      { data: leadership },
      { data: skills },
    ] = await Promise.all([
      supabase.from("profile").select("*").single(),
      supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true }),
      supabase
        .from("work_experiences")
        .select("*")
        .order("order_index", { ascending: true }),
      supabase
        .from("education")
        .select("*")
        .order("order_index", { ascending: true }),
      supabase
        .from("certifications")
        .select("*")
        .order("order_index", { ascending: true }),
      supabase
        .from("leadership")
        .select("*")
        .order("order_index", { ascending: true }),
      supabase
        .from("skills")
        .select("*")
        .order("order_index", { ascending: true }),
    ]);

    // Fallback to RESUME_DATA if Supabase hasn't been seeded yet
    return {
      name: profile?.name || RESUME_DATA.name,
      initials: profile?.initials || RESUME_DATA.initials,
      location: profile?.location || RESUME_DATA.location,
      locationLink: profile?.location_link || RESUME_DATA.locationLink,
      about: profile?.about || RESUME_DATA.about,
      summary: profile?.summary || RESUME_DATA.summary,
      avatarUrl: profile?.avatar_url || RESUME_DATA.avatarUrl,
      personalWebsiteUrl:
        profile?.personal_website_url || RESUME_DATA.personalWebsiteUrl,
      contact: {
        email: profile?.email || RESUME_DATA.contact.email,
        tel: profile?.tel || RESUME_DATA.contact.tel,
        social: RESUME_DATA.contact.social,
      },
      education:
        education && education.length > 0
          ? education.map((e) => ({
              school: e.school,
              degree: e.degree,
              start: e.start_date,
              end: e.end_date,
            }))
          : RESUME_DATA.education,
      leadership:
        leadership && leadership.length > 0
          ? leadership.map((l) => ({
              title: l.title,
              organization: l.organization,
              start: l.start_date,
              end: l.end_date,
              description: l.description,
              highlights: l.highlights,
            }))
          : RESUME_DATA.leadership,
      work:
        work && work.length > 0
          ? work.map((w) => ({
              company: w.company,
              link: w.link,
              badges: w.badges,
              techBadges: w.tech_badges,
              title: w.title,
              start: w.start_date,
              end: w.end_date,
              description: w.description,
              highlights: w.highlights,
            }))
          : RESUME_DATA.work,
      skills:
        skills && skills.length > 0
          ? skills.map((s) => ({
              category: s.category,
              items: s.items,
            }))
          : RESUME_DATA.skills,
      certifications:
        certifications && certifications.length > 0
          ? certifications.map((c) => ({
              name: c.name,
              issuer: c.issuer,
              year: c.year,
              url: c.url,
            }))
          : RESUME_DATA.certifications,
      projects:
        projects && projects.length > 0
          ? projects.map((p) => ({
              title: p.title,
              description: p.description,
              detailedDescription: p.detailed_description,
              role: p.role,
              duration: p.duration,
              techStack: p.tech_stack || [],
              features: p.features || [],
              image: p.image,
              images: p.images || [],
              github: p.github_url,
              link: p.live_link_url
                ? {
                    label: p.live_link_label || p.live_link_url,
                    href: p.live_link_url,
                  }
                : undefined,
            }))
          : RESUME_DATA.projects,
    };
  } catch (error) {
    console.warn(
      "Failed to fetch from Supabase, falling back to static data:",
      error
    );
    return RESUME_DATA;
  }
}
