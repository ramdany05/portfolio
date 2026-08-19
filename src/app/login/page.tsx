import { handleGoogleSignIn } from "./actions";
import { Button } from "@/components/ui/button";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6 rounded-sm border-2 border-foreground bg-card p-8 text-center shadow-brutal">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="font-mono text-sm text-foreground/60">
            Sign in to manage your portfolio content
          </p>
        </div>

        {error === "unauthorized" && (
          <div className="rounded-sm border-2 border-destructive bg-destructive/10 p-3 text-sm font-bold text-destructive shadow-brutal-sm">
            Access denied. You must use the authorized admin email address.
          </div>
        )}

        {error === "auth-failed" && (
          <div className="rounded-sm border-2 border-destructive bg-destructive/10 p-3 text-sm font-bold text-destructive shadow-brutal-sm">
            Authentication failed. Please try again.
          </div>
        )}

        <form action={handleGoogleSignIn}>
          <Button type="submit" size="lg" className="w-full font-bold">
            Sign in with Google
          </Button>
        </form>
      </div>
    </div>
  );
}
