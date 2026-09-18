"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ExternalLink, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { Project, categories } from "@/data/projects";
import { mshot, hostname } from "@/lib/utils";
import ProjectFormModal from "@/components/admin/ProjectFormModal";

export default function AdminDashboard({ initialProjects }: { initialProjects: Project[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [query, setQuery] = useState("");
  const [formMode, setFormMode] = useState<"closed" | "create" | Project>("closed");
  const [deleting, setDeleting] = useState<Project | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    document.body.dataset.scrollLock = formMode !== "closed" || deleting ? "true" : "false";
    return () => {
      document.body.dataset.scrollLock = "false";
    };
  }, [formMode, deleting]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projects;
    return projects.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        hostname(p.url).toLowerCase().includes(q)
    );
  }, [projects, query]);

  function handleSaved(project: Project, wasEdit: boolean) {
    setProjects((prev) => {
      if (wasEdit) {
        return prev.map((p) => (p.slug === (formMode as Project).slug ? project : p));
      }
      return [project, ...prev];
    });
    setFormMode("closed");
  }

  async function confirmDelete() {
    if (!deleting) return;
    setDeleteError(null);
    try {
      const res = await fetch(`/api/projects/${deleting.slug}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setDeleteError(data.error ?? "Couldn't delete this project.");
        return;
      }
      setProjects((prev) => prev.filter((p) => p.slug !== deleting.slug));
      setDeleting(null);
    } catch {
      setDeleteError("Couldn't reach the server. Try again.");
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-svh px-5 py-10 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-blue-2">Webdono Admin</p>
            <h1 className="font-display mt-1 text-3xl font-semibold">Portfolio projects</h1>
            <p className="mt-1 text-sm text-muted">
              {projects.length} project{projects.length === 1 ? "" : "s"} across {categories.length} categories.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium hover:border-white/40"
            >
              View site
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium hover:border-white/40"
            >
              <LogOut size={14} /> Log out
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, category, or domain…"
            className="w-full max-w-sm rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-blue"
          />
          <button
            onClick={() => setFormMode("create")}
            className="flex items-center gap-1.5 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-bg"
          >
            <Plus size={15} /> Add project
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10">
          <div className="hidden grid-cols-[80px_1.4fr_1fr_0.6fr_auto] gap-4 border-b border-white/10 bg-white/[0.02] px-5 py-3 text-[11px] uppercase tracking-[0.15em] text-muted-2 sm:grid">
            <span>Preview</span>
            <span>Project</span>
            <span>Category</span>
            <span>Year</span>
            <span className="text-right">Actions</span>
          </div>

          {filtered.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted">No projects match your search.</p>
          )}

          {filtered.map((p) => (
            <div
              key={p.slug}
              className="grid grid-cols-[56px_1fr_auto] items-center gap-4 border-b border-white/10 px-5 py-3 last:border-b-0 sm:grid-cols-[80px_1.4fr_1fr_0.6fr_auto]"
            >
              <div className="h-12 w-16 overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mshot(p.url, 160, 120)}
                  alt=""
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{p.name}</p>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 truncate text-xs text-muted hover:text-foreground"
                >
                  {hostname(p.url)} <ExternalLink size={11} />
                </a>
              </div>
              <span className="hidden truncate text-sm text-muted sm:block">{p.category}</span>
              <span className="hidden text-sm text-muted sm:block">{p.year}</span>
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={() => setFormMode(p)}
                  aria-label={`Edit ${p.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:border-white/40"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => {
                    setDeleteError(null);
                    setDeleting(p);
                  }}
                  aria-label={`Delete ${p.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 hover:border-red-400/60 hover:text-red-400"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {formMode !== "closed" && (
        <ProjectFormModal
          initial={formMode === "create" ? undefined : formMode}
          onClose={() => setFormMode("closed")}
          onSaved={(project) => handleSaved(project, formMode !== "create")}
        />
      )}

      {deleting && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="glass w-full max-w-sm rounded-2xl p-6">
            <h3 className="font-display text-lg font-semibold">Delete {deleting.name}?</h3>
            <p className="mt-2 text-sm text-muted">
              This removes it from the live portfolio immediately. This can&apos;t be undone.
            </p>
            {deleteError && <p className="mt-3 text-sm text-red-400">{deleteError}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setDeleting(null)}
                className="rounded-full border border-white/15 px-4 py-2.5 text-sm font-medium hover:border-white/40"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-full bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
