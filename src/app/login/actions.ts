import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function handleGoogleSignIn() {
  "use server";
  const supabase = await createClient();
  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/api/auth/callback`,
    },
  });

  if (error) {
    console.error("Auth error:", error);
    return;
  }

  if (data.url) {
    redirect(data.url);
  }
}
