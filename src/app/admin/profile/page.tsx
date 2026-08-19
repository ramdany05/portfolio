import { createClient } from "@/lib/supabase/server";
import { ProfileManager } from "./profile-manager";

export default async function AdminProfilePage() {
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .maybeSingle();

  return <ProfileManager initialProfile={profile} />;
}
