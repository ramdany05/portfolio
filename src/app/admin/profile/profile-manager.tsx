"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidatePortfolio } from "@/app/actions/revalidate";
import { Button } from "@/components/ui/button";

interface Profile {
  id?: string;
  name: string;
  initials: string;
  location: string;
  location_link: string;
  about: string;
  summary: string;
  avatar_url: string;
  personal_website_url?: string;
  email: string;
  tel: string;
}

interface ProfileManagerProps {
  initialProfile: Profile | null;
}

export function ProfileManager({ initialProfile }: ProfileManagerProps) {
  const [profile, setProfile] = useState<Profile>(
    initialProfile || {
      name: "",
      initials: "",
      location: "",
      location_link: "",
      about: "",
      summary: "",
      avatar_url: "/avatar.png",
      personal_website_url: "",
      email: "",
      tel: "",
    }
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    if (profile.id) {
      const { error } = await supabase
        .from("profile")
        .update(profile)
        .eq("id", profile.id);

      if (error) {
        setMessage(`Error updating profile: ${error.message}`);
      } else {
        setMessage("Profile updated successfully!");
        await revalidatePortfolio();
      }
    } else {
      const { data, error } = await supabase
        .from("profile")
        .insert([profile])
        .select()
        .single();

      if (error) {
        setMessage(`Error creating profile: ${error.message}`);
      } else if (data) {
        setProfile(data);
        setMessage("Profile created successfully!");
        await revalidatePortfolio();
      }
    }
    setSaving(false);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile Manager</h1>
        <p className="font-mono text-xs text-foreground/60">
          Manage your personal details, bio, and contact information
        </p>
      </div>

      {message && (
        <div className="rounded-sm border-2 border-foreground bg-accent p-3 text-xs font-mono font-bold shadow-brutal-sm">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSave}
        className="space-y-4 rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Initials
            </label>
            <input
              type="text"
              required
              value={profile.initials}
              onChange={(e) =>
                setProfile({ ...profile, initials: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              required
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Telephone
            </label>
            <input
              type="text"
              required
              value={profile.tel}
              onChange={(e) => setProfile({ ...profile, tel: e.target.value })}
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Location
            </label>
            <input
              type="text"
              required
              value={profile.location}
              onChange={(e) =>
                setProfile({ ...profile, location: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Location Link (Google Maps)
            </label>
            <input
              type="url"
              required
              value={profile.location_link}
              onChange={(e) =>
                setProfile({ ...profile, location_link: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-xs font-bold mb-1">
            Short Headline / About
          </label>
          <input
            type="text"
            required
            value={profile.about}
            onChange={(e) => setProfile({ ...profile, about: e.target.value })}
            className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
          />
        </div>

        <div>
          <label className="block font-mono text-xs font-bold mb-1">
            Full Summary
          </label>
          <textarea
            required
            rows={4}
            value={profile.summary}
            onChange={(e) =>
              setProfile({ ...profile, summary: e.target.value })
            }
            className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Avatar Image URL
            </label>
            <input
              type="text"
              required
              value={profile.avatar_url}
              onChange={(e) =>
                setProfile({ ...profile, avatar_url: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div>
            <label className="block font-mono text-xs font-bold mb-1">
              Personal Website URL (Optional)
            </label>
            <input
              type="text"
              value={profile.personal_website_url || ""}
              onChange={(e) =>
                setProfile({ ...profile, personal_website_url: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>
        </div>

        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Profile Details"}
        </Button>
      </form>
    </div>
  );
}
