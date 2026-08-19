import { createClient } from "@/lib/supabase/server";
import { ProjectsManager } from "./projects-manager";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("order_index", { ascending: true });

  return <ProjectsManager initialProjects={projects || []} />;
}
