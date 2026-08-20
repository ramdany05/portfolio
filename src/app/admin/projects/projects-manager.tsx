"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidatePortfolio } from "@/app/actions/revalidate";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface Project {
  id?: string;
  title: string;
  description: string;
  detailed_description?: string;
  role?: string;
  duration?: string;
  tech_stack: string[];
  features: string[];
  image?: string;
  images: string[];
  github_url?: string;
  live_link_url?: string;
  live_link_label?: string;
}

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    if (editingProject.id) {
      const { error } = await supabase
        .from("projects")
        .update(editingProject)
        .eq("id", editingProject.id);

      if (!error) {
        setProjects(
          projects.map((p) => (p.id === editingProject.id ? editingProject : p))
        );
        setEditingProject(null);
        await revalidatePortfolio();
      }
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert([editingProject])
        .select();

      if (!error && data) {
        setProjects([...projects, data[0]]);
        setEditingProject(null);
        await revalidatePortfolio();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (!error) {
      setProjects(projects.filter((p) => p.id !== id));
      await revalidatePortfolio();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects Manager</h1>
          <p className="font-mono text-xs text-foreground/60">
            Create, edit, or delete projects
          </p>
        </div>

        <Button
          onClick={() =>
            setEditingProject({
              title: "",
              description: "",
              tech_stack: [],
              features: [],
              images: [],
            })
          }
          className="flex items-center gap-2"
        >
          <PlusIcon className="size-4" />
          <span>Add Project</span>
        </Button>
      </div>

      {/* Projects List */}
      <div className="grid gap-4">
        {projects.map((project) => (
          <div
            key={project.id || project.title}
            className="flex items-center justify-between rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm"
          >
            <div>
              <h3 className="font-bold">{project.title}</h3>
              <p className="text-xs text-foreground/60 line-clamp-1">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingProject(project)}
              >
                Edit
              </Button>
              {project.id && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(project.id!)}
                >
                  <Trash2Icon className="size-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Form Drawer / Modal */}
      {editingProject && (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal"
        >
          <h2 className="text-lg font-bold">
            {editingProject.id ? "Edit Project" : "New Project"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Title
              </label>
              <input
                type="text"
                required
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    title: e.target.value,
                  })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Role
              </label>
              <input
                type="text"
                value={editingProject.role || ""}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, role: e.target.value })
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
              value={editingProject.description}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  description: e.target.value,
                })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-mono font-bold mb-1">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={editingProject.detailed_description || ""}
              onChange={(e) =>
                setEditingProject({
                  ...editingProject,
                  detailed_description: e.target.value,
                })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit">Save Project</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingProject(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
