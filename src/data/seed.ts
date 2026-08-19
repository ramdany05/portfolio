import { createClient } from "@supabase/supabase-js";
import { RESUME_DATA } from "./resume-data";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase environment variables in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedData() {
  console.log("Starting data seed into Supabase...");

  // 1. Seed Profile
  console.log("Seeding profile...");
  const { error: profileError } = await supabase.from("profile").insert([
    {
      name: RESUME_DATA.name,
      initials: RESUME_DATA.initials,
      location: RESUME_DATA.location,
      location_link: RESUME_DATA.locationLink,
      about: RESUME_DATA.about,
      summary: RESUME_DATA.summary,
      avatar_url: RESUME_DATA.avatarUrl,
      personal_website_url: RESUME_DATA.personalWebsiteUrl,
      email: RESUME_DATA.contact.email,
      tel: RESUME_DATA.contact.tel,
    },
  ]);
  if (profileError) {
    console.error("Profile Seed Error:", profileError);
  } else {
    console.log("✓ Profile seeded successfully");
  }

  // 2. Seed Education
  console.log("Seeding education...");
  const eduData = RESUME_DATA.education.map((edu, index) => ({
    school: edu.school,
    degree: edu.degree,
    start_date: edu.start,
    end_date: edu.end,
    order_index: index,
  }));
  const { error: eduError } = await supabase.from("education").insert(eduData);
  if (eduError) {
    console.error("Education Seed Error:", eduError);
  } else {
    console.log("✓ Education seeded successfully");
  }

  // 3. Seed Leadership
  console.log("Seeding leadership...");
  const leadData = RESUME_DATA.leadership.map((lead, index) => ({
    title: lead.title,
    organization: lead.organization,
    start_date: lead.start,
    end_date: lead.end,
    description: lead.description,
    highlights: lead.highlights || [],
    order_index: index,
  }));
  const { error: leadError } = await supabase
    .from("leadership")
    .insert(leadData);
  if (leadError) {
    console.error("Leadership Seed Error:", leadError);
  } else {
    console.log("✓ Leadership seeded successfully");
  }

  // 4. Seed Work Experiences
  console.log("Seeding work experiences...");
  const workData = RESUME_DATA.work.map((work, index) => ({
    company: work.company,
    link: work.link,
    badges: work.badges,
    tech_badges: work.techBadges,
    title: work.title,
    start_date: work.start,
    end_date: work.end || null,
    description: work.description,
    highlights: work.highlights || [],
    order_index: index,
  }));
  const { error: workError } = await supabase
    .from("work_experiences")
    .insert(workData);
  if (workError) {
    console.error("Work Experiences Seed Error:", workError);
  } else {
    console.log("✓ Work Experiences seeded successfully");
  }

  // 5. Seed Skills
  console.log("Seeding skills...");
  const skillsData = RESUME_DATA.skills.map((skill, index) => ({
    category: skill.category,
    items: skill.items,
    order_index: index,
  }));
  const { error: skillError } = await supabase
    .from("skills")
    .insert(skillsData);
  if (skillError) {
    console.error("Skills Seed Error:", skillError);
  } else {
    console.log("✓ Skills seeded successfully");
  }

  // 6. Seed Certifications
  console.log("Seeding certifications...");
  const certData = RESUME_DATA.certifications.map((cert, index) => ({
    name: cert.name,
    issuer: cert.issuer,
    year: cert.year,
    url: cert.url || null,
    order_index: index,
  }));
  const { error: certError } = await supabase
    .from("certifications")
    .insert(certData);
  if (certError) {
    console.error("Certifications Seed Error:", certError);
  } else {
    console.log("✓ Certifications seeded successfully");
  }

  // 7. Seed Projects
  console.log("Seeding projects...");
  const projectsData = RESUME_DATA.projects.map((project, index) => ({
    title: project.title,
    description: project.description,
    detailed_description: project.detailedDescription || null,
    role: project.role || null,
    duration: project.duration || null,
    tech_stack: project.techStack || [],
    features: project.features || [],
    image: project.image || null,
    images: project.images || [],
    github_url: project.github || null,
    live_link_url: project.link?.href || null,
    live_link_label: project.link?.label || null,
    order_index: index,
  }));
  const { error: projError } = await supabase
    .from("projects")
    .insert(projectsData);
  if (projError) {
    console.error("Projects Seed Error:", projError);
  } else {
    console.log("✓ Projects seeded successfully");
  }

  console.log("\n🎉 Seed completed!");
}

seedData();
