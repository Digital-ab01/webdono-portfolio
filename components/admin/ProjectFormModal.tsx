"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Category, Project, categories } from "@/data/projects";
import { mshot } from "@/lib/utils";

const INPUT_CLASS =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2.5 text-sm outline-none transition-colors focus:border-accent-blue";

function toLines(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function toCsv(text: string): string[] {
  return text
    .split(",")
    .map((l) => l.trim())
    .filter(Boolean);
}

const MAX_UPLOAD_WIDTH = 1440;

function fileToResizedDataUrl(file: File, maxWidth = MAX_UPLOAD_WIDTH, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Couldn't read file."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Couldn't read image."));
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported."));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function ProjectFormModal({
  initial,
  onClose,
  onSaved,
}: {
  initial?: Project;
  onClose: () => void;
  onSaved: (project: Project) => void;
}) {
  const isEdit = !!initial;

  const [name, setName] = useState(initial?.name ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? categories[0]);
  const [year, setYear] = useState(initial?.year ?? String(new Date().getFullYear()));
  const [tagline, setTagline] = useState(initial?.tagline ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [industry, setIndustry] = useState(initial?.industry ?? "");
  const [approach, setApproach] = useState(initial?.approach ?? "");
  const [objectives, setObjectives] = useState((initial?.objectives ?? []).join("\n"));
  const [technologies, setTechnologies] = useState((initial?.technologies ?? []).join(", "));
  const [services, setServices] = useState((initial?.services ?? []).join(", "));
  const [image, setImage] = useState<string | undefined>(initial?.image);
  const [imageError, setImageError] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const liveScreenshotUrl = /^https?:\/\/.+/i.test(url) ? mshot(url, 1280, 960) : null;
  const previewUrl = image ?? liveScreenshotUrl;

  async function onImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setImageError(null);
    try {
      setImage(await fileToResizedDataUrl(file));
    } catch {
      setImageError("Couldn't process that image. Try a different file.");
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);

    const payload = {
      name,
      url,
      category,
      year,
      tagline,
      description,
      industry,
      approach,
      objectives: toLines(objectives),
      technologies: toCsv(technologies),
      services: toCsv(services),
      image,
    };

    try {
      const res = await fetch(isEdit ? `/api/projects/${initial!.slug}` : "/api/projects", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
        return;
      }
      onSaved(data as Project);
    } catch {
      setError("Couldn't reach the server. Try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <motion.div
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm sm:py-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="glass w-full max-w-2xl rounded-2xl p-6 sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-display text-xl font-semibold">
              {isEdit ? `Edit ${initial!.name}` : "Add a new project"}
            </h2>
            <p className="mt-1 text-sm text-muted">
              Upload a thumbnail, or leave it blank to auto-generate one from the URL.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 hover:border-white/40"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_140px]">
            <div className="space-y-5">
              <Field label="Project name">
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="e.g. Riad Dar Fatima"
                />
              </Field>
              <Field label="Website URL">
                <input
                  required
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className={INPUT_CLASS}
                  placeholder="https://example.com"
                />
              </Field>
            </div>
            <Field label="Preview">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.03]">
                {previewUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={previewUrl} alt="" className="h-full w-full object-cover object-top" />
                ) : (
                  <div className="flex h-full items-center justify-center text-[11px] text-muted-2">
                    No URL yet
                  </div>
                )}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <label
                  data-cursor-hover
                  className="cursor-pointer rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-medium hover:border-white/40"
                >
                  Upload image
                  <input type="file" accept="image/*" onChange={onImageChange} className="hidden" />
                </label>
                {image && (
                  <button
                    type="button"
                    onClick={() => setImage(undefined)}
                    className="text-[11px] text-muted hover:text-foreground"
                  >
                    Remove
                  </button>
                )}
              </div>
              {imageError && <p className="mt-1 text-[11px] text-red-400">{imageError}</p>}
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Field label="Category">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className={INPUT_CLASS}
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Year">
              <input
                required
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={INPUT_CLASS}
                placeholder="2024"
              />
            </Field>
          </div>

          <Field label="Tagline">
            <input
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className={INPUT_CLASS}
              placeholder="One line describing the project"
            />
          </Field>

          <Field label="Description">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${INPUT_CLASS} min-h-20 resize-y`}
            />
          </Field>

          <Field label="Client industry">
            <input
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className={INPUT_CLASS}
              placeholder="e.g. Boutique Hospitality"
            />
          </Field>

          <Field label="Objectives (one per line)">
            <textarea
              value={objectives}
              onChange={(e) => setObjectives(e.target.value)}
              className={`${INPUT_CLASS} min-h-20 resize-y`}
              placeholder={"Increase direct bookings\nBuild credibility with reviews"}
            />
          </Field>

          <Field label="Design approach">
            <textarea
              value={approach}
              onChange={(e) => setApproach(e.target.value)}
              className={`${INPUT_CLASS} min-h-20 resize-y`}
            />
          </Field>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Technologies (comma separated)">
              <input
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                className={INPUT_CLASS}
                placeholder="WordPress, Elementor, Cloudflare"
              />
            </Field>
            <Field label="Services provided (comma separated)">
              <input
                value={services}
                onChange={(e) => setServices(e.target.value)}
                className={INPUT_CLASS}
                placeholder="Web Design, Development"
              />
            </Field>
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium hover:border-white/40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-bg transition-opacity disabled:opacity-50"
            >
              {saving ? "Saving…" : isEdit ? "Save changes" : "Add project"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-muted-2">
        {label}
      </span>
      {children}
    </label>
  );
}
