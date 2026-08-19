-- Supabase Schema for Web CV / Portfolio (Approach A - Relational)

-- 1. Profile Table
CREATE TABLE IF NOT EXISTS public.profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  location TEXT NOT NULL,
  location_link TEXT NOT NULL,
  about TEXT NOT NULL,
  summary TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  personal_website_url TEXT,
  email TEXT NOT NULL,
  tel TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Social Links Table
CREATE TABLE IF NOT EXISTS public.social_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Education Table
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  school TEXT NOT NULL,
  degree TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Leadership / Activities Table
CREATE TABLE IF NOT EXISTS public.leadership (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  organization TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Work Experience Table
CREATE TABLE IF NOT EXISTS public.work_experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  link TEXT NOT NULL,
  badges JSONB DEFAULT '[]'::jsonb NOT NULL,
  tech_badges JSONB DEFAULT '[]'::jsonb NOT NULL,
  title TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  description TEXT NOT NULL,
  highlights JSONB DEFAULT '[]'::jsonb NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Skills Table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  items JSONB DEFAULT '[]'::jsonb NOT NULL,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Certifications Table
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  year TEXT NOT NULL,
  url TEXT,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  detailed_description TEXT,
  role TEXT,
  duration TEXT,
  tech_stack JSONB DEFAULT '[]'::jsonb NOT NULL,
  features JSONB DEFAULT '[]'::jsonb NOT NULL,
  image TEXT,
  images JSONB DEFAULT '[]'::jsonb NOT NULL,
  github_url TEXT,
  live_link_url TEXT,
  live_link_label TEXT,
  order_index INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leadership ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.work_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow PUBLIC read access to all tables
CREATE POLICY "Allow public read access" ON public.profile FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.education FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.leadership FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.work_experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT USING (true);

-- Allow AUTHENTICATED users to INSERT/UPDATE/DELETE (Admin)
CREATE POLICY "Allow auth full access" ON public.profile FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.education FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.leadership FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.work_experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.certifications FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
