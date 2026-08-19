-- SQL Seed Script for Supabase Portfolio Database

-- 1. Insert Profile
INSERT INTO public.profile (name, initials, location, location_link, about, summary, avatar_url, personal_website_url, email, tel)
VALUES (
  'Ramdany Suhandi',
  'RS',
  'Indonesia, WIB',
  'https://www.google.com/maps/place/Indonesia',
  'Software Engineer building products that solve real-world problems through software.',
  'Fresh graduate with a Bachelor''s degree in Information Systems and hands-on experience developing enterprise applications, e-commerce platforms, and offline-first POS systems. Skilled in software development using Java, Spring Boot, Express.js, PostgreSQL, and MySQL, with a strong foundation in REST API development, database design, authorization systems, and cloud-based solutions.',
  '/avatar.png',
  '',
  'suhandiramdany@gmail.com',
  '+6281211335765'
);

-- 2. Insert Education
INSERT INTO public.education (school, degree, start_date, end_date, order_index)
VALUES (
  'Universitas Gunadarma',
  'Bachelor''s Degree in Information Systems (GPA: 3.65 / 4.00) — Thesis: Implementation of Serverless Computing on Google Cloud Platform to Increase Scalability and Flexibility',
  'Sep 2021',
  'Sep 2025',
  0
);

-- 3. Insert Leadership
INSERT INTO public.leadership (title, organization, start_date, end_date, description, highlights, order_index)
VALUES 
(
  'Workshop Instructor',
  'Computerization Development Center — Gunadarma University',
  'Jan 2023',
  'Apr 2025',
  'Taught HTML, CSS, and JavaScript to students in web development courses.',
  '["Taught 20+ students per workshop in HTML, CSS, and JavaScript fundamentals", "Built a 30-question assessment exam to evaluate new teaching assistants"]'::jsonb,
  0
),
(
  'Cloud Computing Cohort',
  'Bangkit Academy (Google, GoTo, Traveloka program)',
  'Feb 2024',
  'Jun 2024',
  'Industry-led cloud computing training program by Google, GoTo, and Traveloka.',
  '["Completed 965-hour Google-led program with Grade A (Full Graduate)", "Led a campus socialization event with 30+ participants at Gunadarma University"]'::jsonb,
  1
),
(
  'Finalist — Competitive Programming',
  'Codefest 01, Gunadarma I/O',
  'Jan 2023',
  'Jan 2023',
  'Participated in an algorithm and problem-solving competition.',
  '["Placed 4th of 10+ participants in a Java-based competitive programming contest"]'::jsonb,
  2
);

-- 4. Insert Work Experiences
INSERT INTO public.work_experiences (company, link, badges, tech_badges, title, start_date, end_date, description, highlights, order_index)
VALUES
(
  'PT Agromina Biotech International',
  'https://www.agrominabiotech.com/',
  '["On Site"]'::jsonb,
  '["Laravel", "Express.js", "PostgreSQL", "MySQL"]'::jsonb,
  'Backend Intern',
  'Dec 2025',
  'Jun 2026',
  'Developed and maintained web-based solutions for multiple business clients.',
  '["Delivered 3 production-ready client solutions across e-commerce, corporate, and educational domains, and a POS platform (in development) using Laravel, Express.js, PostgreSQL, and MySQL", "Built backend systems including RBAC, analytics reporting, email automation, REST APIs, real-time synchronization, and automated testing infrastructure"]'::jsonb,
  0
),
(
  'PT Integrity Indonesia',
  'https://www.linkedin.com/company/integrity-indonesia/',
  '["On Site"]'::jsonb,
  '["Java", "Spring Boot", "React", "TypeScript"]'::jsonb,
  'Software Engineer Intern',
  'Oct 2025',
  'Dec 2025',
  'Contributed to an enterprise background screening platform.',
  '["Developed enterprise features including authorization workflows, RBAC, organization management, and user/group administration using Java, Spring Boot, React, and TypeScript", "Designed and maintained data infrastructure with 102K+ geographic records, Liquibase migrations, and server-side search capabilities, improving scalability, data integrity, and operational efficiency"]'::jsonb,
  1
),
(
  'Freelance',
  'https://www.easyinaja.com/',
  '["Remote"]'::jsonb,
  '["Node.js", "Express.js", "MongoDB", "AI/LLMs"]'::jsonb,
  'Fullstack Developer',
  'Mar 2025',
  'Aug 2025',
  'Delivered web and AI solutions for businesses and end-users.',
  '["Shipped SEO-optimized sites, a content-based food recommendation system, and an LLM-powered chat feature using open-access APIs", "Built frontend interfaces and integrated backend services using Node.js, Express.js, and MongoDB"]'::jsonb,
  2
);

-- 5. Insert Skills
INSERT INTO public.skills (category, items, order_index)
VALUES
('Languages', '["Java", "JavaScript", "TypeScript"]'::jsonb, 0),
('Backend', '["Spring Boot", "Express.js", "Laravel", "REST API", "Socket.IO"]'::jsonb, 1),
('Frontend', '["React.js", "Inertia.js"]'::jsonb, 2),
('Databases', '["MySQL", "PostgreSQL", "MongoDB", "Redis"]'::jsonb, 3),
('DevOps & Tools', '["Docker", "CI/CD", "Git", "OpenAPI/Swagger", "GCP"]'::jsonb, 4),
('Architecture', '["RBAC", "System Design"]'::jsonb, 5),
('AI & ML', '["OpenAI API", "LLM Integration"]'::jsonb, 6);

-- 6. Insert Certifications
INSERT INTO public.certifications (name, issuer, year, url, order_index)
VALUES
(
  'Specializing in Cloud Computing',
  'Bangkit Academy',
  '2024',
  'https://drive.google.com/file/d/15rL0F5FACBlUEsFWNy-9TmVjod7c_L0b/view?usp=sharing',
  0
),
(
  'Divide and Conquer, Sorting and Searching, and Randomized Algorithms',
  'Stanford University via Coursera',
  '2024',
  'https://www.coursera.org/account/accomplishments/verify/XWGV9MT9FTG8',
  1
),
(
  'System Administration and IT Infrastructure Services',
  'Google via Coursera',
  '2024',
  'https://www.coursera.org/account/accomplishments/verify/JH7ARVZMHSBE',
  2
),
(
  'The Bits and Bytes of Computer Networking',
  'Google via Coursera',
  '2024',
  'https://www.coursera.org/account/accomplishments/verify/VS34BQH6PTCY',
  3
);

-- 7. Insert Projects
INSERT INTO public.projects (title, description, detailed_description, role, duration, tech_stack, features, image, images, github_url, live_link_url, live_link_label, order_index)
VALUES
(
  'JobMatch',
  'Full-stack job-aggregation platform serving 1,677+ live Indonesian tech jobs from 5 sources.',
  'Full-stack job-aggregation platform serving 1,677+ live Indonesian tech jobs from 5 sources. Engineered a multi-strategy scraping pipeline (public APIs, Playwright headless browsers with anti-bot bypass) refreshing every 5 minutes, plus a per-user match scoring engine with automated Telegram alerts.',
  'Lead Fullstack Developer',
  '2024',
  '["TypeScript", "Java", "React.js", "Spring Boot", "PostgreSQL"]'::jsonb,
  '["Multi-strategy scraping pipeline refreshing every 5 minutes", "Bypass anti-bot mechanisms using Playwright headless browsers", "Per-user match scoring engine for tailored job recommendations", "Automated instant notifications via Telegram integration"]'::jsonb,
  '/projects/job-match.png',
  '["/projects/job-match.png"]'::jsonb,
  'https://github.com/ramdany05/jobmatch',
  'https://job-m.netlify.app',
  'job-m.netlify.app',
  0
),
(
  'Sistem Kompensasi',
  'Solo-built compensation management web app with multi-module dashboard covering position management, job evaluation, compensation calculation, approval workflows, and reporting.',
  'Solo-built compensation management web app with multi-module dashboard covering position management, job evaluation, compensation calculation, approval workflows, and reporting. Developed as an Academic HRIS project with a case study on PT Linkar Aneka Konstruksi Indonesia.',
  'Solo Developer',
  '2024',
  '["React.js", "TypeScript", "Tailwind CSS", "Context API"]'::jsonb,
  '["Position management and hierarchy structure", "Job evaluation and point factor method calculation", "Automated compensation and benefits grading", "Multi-level approval workflows and audit-ready reports"]'::jsonb,
  NULL,
  '[]'::jsonb,
  'https://github.com/ramdany05/sistem-kompensasi',
  NULL,
  NULL,
  1
),
(
  'Kulineran Pakansari',
  'Solo-built restaurant discovery and recommendation web app for the Pakansari area, featuring category-based search, recommendations, and interactive mapping.',
  'Solo-built restaurant discovery and recommendation web app for the Pakansari area, featuring category-based search, recommendations, and interactive mapping via Google Maps Embed API. Built as an academic GIS project to aid local food exploration.',
  'Solo Developer',
  '2024',
  '["React.js", "TypeScript", "Tailwind CSS", "Google Maps"]'::jsonb,
  '["Interactive Google Maps Embed integration", "Category and tag-based culinary search filter", "Localized food recommendations", "Responsive, mobile-friendly layout"]'::jsonb,
  NULL,
  '[]'::jsonb,
  'https://github.com/ramdany05/kulineran-pakansari',
  NULL,
  NULL,
  2
);
