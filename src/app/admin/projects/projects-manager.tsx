"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidatePortfolio } from "@/app/actions/revalidate";
import { Button } from "@/components/ui/button";
import {
  PlusIcon,
  Trash2Icon,
  UploadIcon,
  XIcon,
  ImageIcon,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface Project {
  id?: string;
  title: string;
  description: string;
  detailed_description?: string;
  role?: string;
  start_date?: string;
  end_date?: string;
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
  const [uploading, setUploading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const supabase = createClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !editingProject) return;

    setUploading(true);
    const newImageUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio-images")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert(`Failed to upload ${file.name}: ${uploadError.message}`);
        continue;
      }

      const { data: publicUrlData } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        newImageUrls.push(publicUrlData.publicUrl);
      }
    }

    const updatedImages = [...(editingProject.images || []), ...newImageUrls];
    const updatedThumbnail =
      updatedImages.length > 0 ? updatedImages[0] : editingProject.image;

    setEditingProject({
      ...editingProject,
      images: updatedImages,
      image: updatedThumbnail,
    });

    setUploading(false);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!editingProject) return;
    const updatedImages = editingProject.images.filter(
      (_, idx) => idx !== indexToRemove
    );
    const updatedThumbnail =
      updatedImages.length > 0 ? updatedImages[0] : undefined;

    setEditingProject({
      ...editingProject,
      images: updatedImages,
      image: updatedThumbnail,
    });
  };

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
          onClick={() => {
            setEditingProject({
              title: "",
              description: "",
              tech_stack: [],
              features: [],
              images: [],
            });
            setTechInput("");
            setFeatureInput("");
          }}
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
                onClick={() => {
                  setEditingProject(project);
                  setTechInput("");
                  setFeatureInput("");
                }}
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Start Date
              </label>
              <input
                type="month"
                value={editingProject.start_date || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    start_date: e.target.value,
                  })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                End Date{" "}
                <span className="font-normal text-foreground/50">
                  (leave blank if ongoing)
                </span>
              </label>
              <input
                type="month"
                value={editingProject.end_date || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    end_date: e.target.value,
                  })
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

          {/* Tech Stack (Tags) */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold">
              Technologies / Tech Stack (Tags)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add tech (e.g. React, TypeScript)..."
                className="flex-1 rounded-sm border border-foreground bg-background p-2 text-sm"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (techInput.trim()) {
                    setEditingProject({
                      ...editingProject,
                      tech_stack: [
                        ...(editingProject.tech_stack || []),
                        techInput.trim(),
                      ],
                    });
                    setTechInput("");
                  }
                }}
              >
                Add Tag
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-1">
              {editingProject.tech_stack?.map((tech, idx) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 rounded-sm border border-foreground bg-accent px-2 py-1 text-xs font-semibold"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProject({
                        ...editingProject,
                        tech_stack: editingProject.tech_stack.filter(
                          (_, i) => i !== idx
                        ),
                      })
                    }
                    className="text-destructive font-bold hover:scale-125"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold">
              Key Features & Highlights
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Add feature highlight..."
                className="flex-1 rounded-sm border border-foreground bg-background p-2 text-sm"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (featureInput.trim()) {
                    setEditingProject({
                      ...editingProject,
                      features: [
                        ...(editingProject.features || []),
                        featureInput.trim(),
                      ],
                    });
                    setFeatureInput("");
                  }
                }}
              >
                Add Feature
              </Button>
            </div>

            <ul className="space-y-1 pt-1">
              {editingProject.features?.map((feature, idx) => (
                <li
                  key={feature}
                  className="flex items-center justify-between rounded-sm border border-foreground/20 p-2 text-xs"
                >
                  <span>✦ {feature}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProject({
                        ...editingProject,
                        features: editingProject.features.filter(
                          (_, i) => i !== idx
                        ),
                      })
                    }
                    className="ml-2 font-bold text-destructive"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External Links */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                GitHub Repository URL
              </label>
              <input
                type="url"
                placeholder="https://github.com/..."
                value={editingProject.github_url || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    github_url: e.target.value,
                  })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Live Demo URL
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={editingProject.live_link_url || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    live_link_url: e.target.value,
                  })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Live Demo Label
              </label>
              <input
                type="text"
                placeholder="job-m.netlify.app"
                value={editingProject.live_link_label || ""}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    live_link_label: e.target.value,
                  })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>
          </div>

          {/* Image Uploader & Gallery Preview */}
          <div className="space-y-3 rounded-sm border border-foreground/20 bg-muted/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider">
                  Project Screenshots & Gallery
                </h4>
                <p className="text-xs text-foreground/60">
                  Upload images to Supabase Storage. The first image will be
                  used as the project thumbnail.
                </p>
              </div>

              <label className="flex cursor-pointer items-center gap-1.5 rounded-sm border-2 border-foreground bg-background px-3 py-1.5 font-mono text-xs font-bold shadow-brutal-sm transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal">
                <UploadIcon className="size-3.5" />
                <span>{uploading ? "Uploading..." : "Upload Images"}</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={handleFileUpload}
                  className="sr-only"
                />
              </label>
            </div>

            {editingProject.images && editingProject.images.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
                {editingProject.images.map((imgUrl, idx) => (
                  <div
                    key={imgUrl}
                    className="group relative overflow-hidden rounded-sm border-2 border-foreground bg-card shadow-brutal-sm"
                  >
                    <img
                      src={imgUrl}
                      alt={`Project preview ${idx + 1}`}
                      className="h-24 w-full object-cover"
                    />
                    {idx === 0 && (
                      <span className="absolute bottom-1 left-1 rounded border border-foreground bg-primary px-1.5 py-0.5 font-mono text-[9px] font-bold text-primary-foreground">
                        Thumbnail
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="absolute right-1 top-1 rounded-sm border border-foreground bg-destructive p-1 text-destructive-foreground opacity-90 transition-opacity hover:opacity-100"
                      aria-label="Remove image"
                    >
                      <XIcon className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-20 items-center justify-center rounded-sm border border-dashed border-foreground/30 font-mono text-xs text-foreground/40">
                <ImageIcon className="mr-2 size-4" /> No images uploaded yet
              </div>
            )}
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
