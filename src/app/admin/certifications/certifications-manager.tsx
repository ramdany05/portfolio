"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { revalidatePortfolio } from "@/app/actions/revalidate";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2Icon } from "lucide-react";

interface Certification {
  id?: string;
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

interface CertificationsManagerProps {
  initialCerts: Certification[];
}

export function CertificationsManager({
  initialCerts,
}: CertificationsManagerProps) {
  const [certList, setCertList] = useState<Certification[]>(initialCerts);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;

    if (editingCert.id) {
      const { error } = await supabase
        .from("certifications")
        .update(editingCert)
        .eq("id", editingCert.id);

      if (!error) {
        setCertList(
          certList.map((c) => (c.id === editingCert.id ? editingCert : c))
        );
        setEditingCert(null);
        await revalidatePortfolio();
      }
    } else {
      const { data, error } = await supabase
        .from("certifications")
        .insert([editingCert])
        .select();

      if (!error && data) {
        setCertList([...certList, data[0]]);
        setEditingCert(null);
        await revalidatePortfolio();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certification?")) return;
    const { error } = await supabase
      .from("certifications")
      .delete()
      .eq("id", id);
    if (!error) {
      setCertList(certList.filter((c) => c.id !== id));
      await revalidatePortfolio();
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Certifications Manager</h1>
          <p className="font-mono text-xs text-foreground/60">
            Manage your professional licenses and online course credentials
          </p>
        </div>

        <Button
          onClick={() =>
            setEditingCert({
              name: "",
              issuer: "",
              year: "",
              url: "",
            })
          }
          className="flex items-center gap-2"
        >
          <PlusIcon className="size-4" />
          <span>Add Certification</span>
        </Button>
      </div>

      <div className="grid gap-4">
        {certList.map((item) => (
          <div
            key={item.id || item.name}
            className="flex items-center justify-between rounded-sm border-2 border-foreground bg-card p-4 shadow-brutal-sm"
          >
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-xs font-mono text-foreground/60">
                {item.issuer} ({item.year})
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingCert(item)}
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

      {editingCert && (
        <form
          onSubmit={handleSave}
          className="space-y-4 rounded-sm border-2 border-foreground bg-card p-6 shadow-brutal"
        >
          <h2 className="text-lg font-bold">
            {editingCert.id ? "Edit Certification" : "New Certification"}
          </h2>

          <div>
            <label className="block text-xs font-mono font-bold mb-1">
              Certification Name
            </label>
            <input
              type="text"
              required
              value={editingCert.name}
              onChange={(e) =>
                setEditingCert({ ...editingCert, name: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Issuer / Institution
              </label>
              <input
                type="text"
                required
                placeholder="Google via Coursera"
                value={editingCert.issuer}
                onChange={(e) =>
                  setEditingCert({ ...editingCert, issuer: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-bold mb-1">
                Year
              </label>
              <input
                type="text"
                required
                placeholder="2024"
                value={editingCert.year}
                onChange={(e) =>
                  setEditingCert({ ...editingCert, year: e.target.value })
                }
                className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono font-bold mb-1">
              Credential URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://coursera.org/verify/..."
              value={editingCert.url || ""}
              onChange={(e) =>
                setEditingCert({ ...editingCert, url: e.target.value })
              }
              className="w-full rounded-sm border border-foreground bg-background p-2 text-sm"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit">Save Certification</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingCert(null)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
