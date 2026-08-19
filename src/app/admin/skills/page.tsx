import { createClient } from "@/lib/supabase/server";
import { SkillsManager } from "./skills-manager";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .order("order_index", { ascending: true });

  return <SkillsManager initialSkills={skills || []} />;
}
