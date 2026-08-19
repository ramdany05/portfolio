import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import {
  UserIcon,
  BriefcaseIcon,
  FolderGit2Icon,
  GraduationCapIcon,
  AwardIcon,
  SparklesIcon,
  LogOutIcon,
  GlobeIcon,
  WrenchIcon,
} from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  async function handleSignOut() {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    redirect("/login");
  }

  const navItems = [
    { label: "Profile", href: "/admin/profile", icon: UserIcon },
    { label: "Skills", href: "/admin/skills", icon: WrenchIcon },
    { label: "Work Experience", href: "/admin/work", icon: BriefcaseIcon },
    { label: "Projects", href: "/admin/projects", icon: FolderGit2Icon },
    { label: "Education", href: "/admin/education", icon: GraduationCapIcon },
    { label: "Certifications", href: "/admin/certifications", icon: AwardIcon },
    { label: "Leadership", href: "/admin/leadership", icon: SparklesIcon },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r-2 border-foreground bg-card p-6 flex flex-col justify-between shadow-brutal-sm">
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold">CMS Dashboard</h2>
            <p className="font-mono text-xs text-foreground/60 truncate">
              {user.email}
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-sm border border-foreground/20 px-3 py-2 text-sm font-semibold transition-all hover:border-foreground hover:bg-accent hover:shadow-brutal-sm"
                >
                  <Icon className="size-4 text-primary" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-6 border-t border-foreground/20">
          <Link href="/" target="_blank" className="w-full block">
            <Button variant="outline" size="sm" className="w-full flex gap-2">
              <GlobeIcon className="size-4" />
              <span>View Portfolio</span>
            </Button>
          </Link>

          <form action={handleSignOut}>
            <Button
              variant="destructive"
              size="sm"
              className="w-full flex gap-2"
            >
              <LogOutIcon className="size-4" />
              <span>Sign Out</span>
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
