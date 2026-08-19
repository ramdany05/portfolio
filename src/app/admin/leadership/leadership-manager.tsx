"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface Leadership {
  id?: string;
  title: string;
  organization: string;
  start_date: string;
  end_date: string;
  description: string;
  highlights: string[];
}

interface LeadershipManagerProps {
  initialLeadership: Leadership[];
}

export function LeadershipManager({
  initialLeadership,
}: LeadershipManagerProps) {
  const [leadershipList, setLeadershipList] =
    useState<Leadership[]>(initialLeadership);
  const [editingItem, setEditingItem] = useState<Leadership | null>(null);
  const [highlightInput, setHighlightInput] = useState("");

  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (editingItem.id) {
      const { error } = await supabase
        .from("leadership")
        .update(editingItem)
        .eq("id", editingItem.id);

      if (!error) {
        setLeadershipList(
          leadershipList.map((l) => (l.id === editingItem.id ? editingItem : l))
        );
        setEditingItem(null);
      }
    } else {
      const { data, error } = await supabase
        .from("leadership")
        .insert([editingItem])
        .select();

      if (!error && data) {
        setLeadershipList([...leadershipList, data[0]]);
        setEditingItem(null);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    const { error } = await supabase.from("leadership").delete().eq("id", id);
    if (!error) {
      setLeadershipList(leadershipList.filter((l) => l.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Leadership & Activities Manager
          </h1>
          <p className="font-mono text-xs text-foreground/60">
            Manage your extracurricular achievements, competitions, and
            workshops
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingItem({
              title: "",
              organization: "",
              start_date: "",
              end_date: "",
              description: "",
              highlights: [],
            });
            setHighlightInput("");
          }}
          className="flex items-center gap-2"
        >
          <PlusIcon className="size-4" />
          <span>Add Activity</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {leadershipList.map((item) => (
          <div
            key={item.id || item.title}
            className="flex items-center justify-between rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm"
          >
            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="font-mono text-xs text-foreground/60">
                {item.organization} ({item.start_date} — {item.end_date})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingItem(item);
                  setHighlightInput("");
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

      {editingItem && (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal"
        >
          <h2 className="text-lg font-bold">
            {editingItem.id ? "Edit Activity" : "New Activity"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Title / Role
              </label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, title: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Organization / Event
              </label>
              <input
                type="text"
                required
                value={editingItem.organization}
                onChange={(e) =>
                  setEditingItem({
                    ...editingItem,
                    organization: e.target.value,
                  })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Start Date
              </label>
              <input
                type="text"
                required
                value={editingItem.start_date}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, start_date: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                End Date
              </label>
              <input
                type="text"
                required
                value={editingItem.end_date}
                onChange={(e) =>
                  setEditingItem({ ...editingItem, end_date: e.target.value })
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
              value={editingItem.description}
              onChange={(e) =>
                setEditingItem({ ...editingItem, description: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold">
              Highlights / Achievements
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                placeholder="Add achievement..."
                className="flex-1 rounded-sm border border-foreground bg-background p-2 text-sm"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (highlightInput.trim()) {
                    setEditingItem({
                      ...editingItem,
                      highlights: [
                        ...editingItem.highlights,
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
              {editingItem.highlights.map((item, idx) => (
                <li
                  key={item}
                  className="flex items-center justify-between text-xs border border-foreground/20 p-2 rounded-sm"
                >
                  <span>✦ {item}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingItem({
                        ...editingItem,
                        highlights: editingItem.highlights.filter(
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
            <Button type="submit">Save Entry</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingItem(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
