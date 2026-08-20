"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidatePortfolio } from "@/app/actions/revalidate";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface SkillCategory {
  id?: string;
  category: string;
  items: string[];
}

interface SkillsManagerProps {
  initialSkills: SkillCategory[];
}

export function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const [skillList, setSkillList] = useState<SkillCategory[]>(initialSkills);
  const [editingCategory, setEditingCategory] = useState<SkillCategory | null>(
    null
  );
  const [itemInput, setItemInput] = useState("");

  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (editingCategory.id) {
      const { error } = await supabase
        .from("skills")
        .update(editingCategory)
        .eq("id", editingCategory.id);

      if (!error) {
        setSkillList(
          skillList.map((s) =>
            s.id === editingCategory.id ? editingCategory : s
          )
        );
        setEditingCategory(null);
        await revalidatePortfolio();
      }
    } else {
      const { data, error } = await supabase
        .from("skills")
        .insert([editingCategory])
        .select();

      if (!error && data) {
        setSkillList([...skillList, data[0]]);
        setEditingCategory(null);
        await revalidatePortfolio();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill category?"))
      return;
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (!error) {
      setSkillList(skillList.filter((s) => s.id !== id));
      await revalidatePortfolio();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Skills Manager</h1>
          <p className="font-mono text-xs text-foreground/60">
            Manage your technical skills and tech stack categories
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingCategory({
              category: "",
              items: [],
            });
            setItemInput("");
          }}
          className="flex items-center gap-2"
        >
          <PlusIcon className="size-4" />
          <span>Add Skill Category</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {skillList.map((cat) => (
          <div
            key={cat.id || cat.category}
            className="flex items-center justify-between rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm"
          >
            <div>
              <h3 className="font-bold">{cat.category}</h3>
              <p className="text-xs font-mono text-foreground/60">
                {cat.items.join(", ")}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingCategory(cat);
                  setItemInput("");
                }}
              >
                Edit
              </Button>
              {cat.id && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(cat.id!)}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {editingCategory && (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal"
        >
          <h2 className="text-lg font-bold">
            {editingCategory.id ? "Edit Category" : "New Skill Category"}
          </h2>

          <div>
            <label className="block text-xs font-mono font-bold mb-1">
              Category Name
            </label>
            <input
              type="text"
              required
              placeholder="Backend / Languages / Databases"
              value={editingCategory.category}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  category: e.target.value,
                })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold">
              Skills List
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={itemInput}
                onChange={(e) => setItemInput(e.target.value)}
                placeholder="Add skill (e.g. Java, PostgreSQL)..."
                className="flex-1 rounded-sm border border-foreground bg-background p-2 text-sm"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (itemInput.trim()) {
                    setEditingCategory({
                      ...editingCategory,
                      items: [...editingCategory.items, itemInput.trim()],
                    });
                    setItemInput("");
                  }
                }}
              >
                Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {editingCategory.items.map((skill, idx) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-foreground bg-accent px-2 py-1 text-xs font-semibold"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingCategory({
                        ...editingCategory,
                        items: editingCategory.items.filter(
                          (_, i) => i !== idx
                        ),
                      })
                    }
                    className="text-destructive font-bold ml-1 hover:scale-125"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit">Save Category</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingCategory(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
