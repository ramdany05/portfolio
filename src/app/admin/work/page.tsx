import { createClient } from "@/lib/supabase/server";
import { WorkManager } from "./work-manager";

export default async function AdminWorkPage() {
  const supabase = await createClient();
  const { data: work } = await supabase
    .from("work_experiences")
    .select("*")
    .order("order_index", { ascending: true });

  return <WorkManager initialWork={work || []} />;
}
