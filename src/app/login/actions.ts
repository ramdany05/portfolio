import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

export async function handleGoogleSignIn() {
  "use server";
  const supabase = await createClient();

  // Dynamically determine current site origin from request headers or env
  const headerList = await headers();
  const host = headerList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (host ? `${protocol}://${host}` : "http://localhost:3000");

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
