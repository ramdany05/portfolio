import { createClient } from "@/lib/supabase/server";
import { LeadershipManager } from "./leadership-manager";

export default async function AdminLeadershipPage() {
  const supabase = await createClient();
  const { data: leadership } = await supabase
    .from("leadership")
    .select("*")
    .order("order_index", { ascending: true });

  return <LeadershipManager initialLeadership={leadership || []} />;
}
