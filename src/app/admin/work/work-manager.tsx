"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidatePortfolio } from "@/app/actions/revalidate";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface WorkExperience {
  id?: string;
  company: string;
  link: string;
  title: string;
  start_date: string;
  end_date?: string;
  description: string;
  badges: string[];
  tech_badges: string[];
  highlights: string[];
}

interface WorkManagerProps {
  initialWork: WorkExperience[];
}

export function WorkManager({ initialWork }: WorkManagerProps) {
  const [workList, setWorkList] = useState<WorkExperience[]>(initialWork);
  const [editingWork, setEditingWork] = useState<WorkExperience | null>(null);
  const [highlightInput, setHighlightInput] = useState("");
  const [badgeInput, setBadgeInput] = useState("");
  const [techBadgeInput, setTechBadgeInput] = useState("");

  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWork) return;

    if (editingWork.id) {
      const { error } = await supabase
        .from("work_experiences")
        .update(editingWork)
        .eq("id", editingWork.id);

      if (!error) {
        setWorkList(
          workList.map((w) => (w.id === editingWork.id ? editingWork : w))
        );
        setEditingWork(null);
        await revalidatePortfolio();
      }
    } else {
      const { data, error } = await supabase
        .from("work_experiences")
        .insert([editingWork])
        .select();

      if (!error && data) {
        setWorkList([...workList, data[0]]);
        setEditingWork(null);
        await revalidatePortfolio();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this work experience?"))
      return;
    const { error } = await supabase
      .from("work_experiences")
      .delete()
      .eq("id", id);
    if (!error) {
      setWorkList(workList.filter((w) => w.id !== id));
      await revalidatePortfolio();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Work Experience Manager</h1>
          <p className="font-mono text-xs text-foreground/60">
            Manage your employment history and internships
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingWork({
              company: "",
              link: "",
              title: "",
              start_date: "",
              end_date: "",
              description: "",
              badges: [],
              tech_badges: [],
              highlights: [],
            });
            setHighlightInput("");
            setBadgeInput("");
            setTechBadgeInput("");
          }}
          className="flex items-center gap-2"
        >
          <PlusIcon className="size-4" />
          <span>Add Position</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {workList.map((item) => (
          <div
            key={item.id || item.company}
            className="flex items-center justify-between rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm"
          >
            <div>
              <h3 className="font-bold">
                {item.title} at {item.company}
              </h3>
              <p className="font-mono text-xs text-foreground/60">
                {item.start_date} — {item.end_date || "Present"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingWork(item);
                  setHighlightInput("");
                  setBadgeInput("");
                  setTechBadgeInput("");
                }}
              >
                Edit
              </Button>
              {item.id && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id!)}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingWork && (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal"
        >
          <h2 className="text-lg font-bold">
            {editingWork.id ? "Edit Position" : "New Position"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Company
              </label>
              <input
                type="text"
                required
                value={editingWork.company}
                onChange={(e) =>
                  setEditingWork({ ...editingWork, company: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Job Title
              </label>
              <input
                type="text"
                required
                value={editingWork.title}
                onChange={(e) =>
                  setEditingWork({ ...editingWork, title: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Company Website URL
              </label>
              <input
                type="url"
                required
                value={editingWork.link}
                onChange={(e) =>
                  setEditingWork({ ...editingWork, link: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Start Date
              </label>
              <input
                type="text"
                required
                placeholder="Dec 2025"
                value={editingWork.start_date}
                onChange={(e) =>
                  setEditingWork({ ...editingWork, start_date: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                End Date (Leave blank if Present)
              </label>
              <input
                type="text"
                placeholder="Jun 2026"
                value={editingWork.end_date || ""}
                onChange={(e) =>
                  setEditingWork({ ...editingWork, end_date: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold mb-1">
              Description
            </label>
            <textarea
              required
              rows={2}
              value={editingWork.description}
              onChange={(e) =>
                setEditingWork({ ...editingWork, description: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold">
              Highlights / Accomplishments
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="Add bullet point highlight..."
                className="flex-1 rounded-sm border border-foreground bg-background p-2 text-sm"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (highlightInput.trim()) {
                    setEditingWork({
                      ...editingWork,
                      highlights: [
                        ...editingWork.highlights,
                        highlightInput.trim(),
                      ],
                    });
                    setHighlightInput("");
                  }
                }}
              >
                Add
              </Button>
            </div>

            <ul className="space-y-1">
              {editingWork.highlights.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-center justify-between text-xs border border-foreground/20 p-2 rounded-sm"
                >
                  <span>✦ {item}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingWork({
                        ...editingWork,
                        highlights: editingWork.highlights.filter(
                          (_, i) => i !== idx
                        ),
                      })
                    }
                    className="text-destructive font-bold ml-2"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit">Save Position</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingWork(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
