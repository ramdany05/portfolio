import { createClient } from "@/lib/supabase/server";
import { EducationManager } from "./education-manager";

export default async function AdminEducationPage() {
  const supabase = await createClient();
  const { data: education } = await supabase
    .from("education")
    .select("*")
    .order("order_index", { ascending: true });

  return <EducationManager initialEducation={education || []} />;
}
