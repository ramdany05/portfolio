"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidatePortfolio } from "@/app/actions/revalidate";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface Education {
  id?: string;
  school: string;
  degree: string;
  start_date: string;
  end_date: string;
}

interface EducationManagerProps {
  initialEducation: Education[];
}

export function EducationManager({ initialEducation }: EducationManagerProps) {
  const [eduList, setEduList] = useState<Education[]>(initialEducation);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;

    if (editingEdu.id) {
      const { error } = await supabase
        .from("education")
        .update(editingEdu)
        .eq("id", editingEdu.id);

      if (!error) {
        setEduList(
          eduList.map((e) => (e.id === editingEdu.id ? editingEdu : e))
        );
        setEditingEdu(null);
        await revalidatePortfolio();
      }
    } else {
      const { data, error } = await supabase
        .from("education")
        .insert([editingEdu])
        .select();

      if (!error && data) {
        setEduList([...eduList, data[0]]);
        setEditingEdu(null);
        await revalidatePortfolio();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this education entry?"))
      return;
    const { error } = await supabase.from("education").delete().eq("id", id);
    if (!error) {
      setEduList(eduList.filter((e) => e.id !== id));
      await revalidatePortfolio();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Education Manager</h1>
          <p className="font-mono text-xs text-foreground/60">
            Manage your academic history and degrees
          </p>
        </div>

        <Button
          onClick={() =>
            setEditingEdu({
              school: "",
              degree: "",
              start_date: "",
              end_date: "",
            })
          }
          className="flex items-center gap-2"
        >
          <PlusIcon className="size-4" />
          <span>Add Education</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {eduList.map((item) => (
          <div
            key={item.id || item.school}
            className="flex items-center justify-between rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm"
          >
            <div>
              <h3 className="font-bold">{item.school}</h3>
              <p className="text-xs text-foreground/80">{item.degree}</p>
              <p className="font-mono text-xs text-foreground/50">
                {item.start_date} — {item.end_date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingEdu(item)}
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

      {editingEdu && (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal"
        >
          <h2 className="text-lg font-bold">
            {editingEdu.id ? "Edit Education" : "New Education Entry"}
          </h2>

          <div>
            <label className="block text-xs font-mono font-bold mb-1">
              School / University
            </label>
            <input
              type="text"
              required
              value={editingEdu.school}
              onChange={(e) =>
                setEditingEdu({ ...editingEdu, school: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold mb-1">
              Degree & Thesis Description
            </label>
            <textarea
              required
              rows={3}
              value={editingEdu.degree}
              onChange={(e) =>
                setEditingEdu({ ...editingEdu, degree: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              placeholder="Bachelor's Degree in Information Systems (GPA: 3.65 / 4.00) — Thesis: ..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Start Date
              </label>
              <input
                type="text"
                required
                placeholder="Sep 2021"
                value={editingEdu.start_date}
                onChange={(e) =>
                  setEditingEdu({ ...editingEdu, start_date: e.target.value })
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
                placeholder="Sep 2025"
                value={editingEdu.end_date}
                onChange={(e) =>
                  setEditingEdu({ ...editingEdu, end_date: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit">Save Entry</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingEdu(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
