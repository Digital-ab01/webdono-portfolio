import { promises as fs } from "fs";
import path from "path";
import { Category, Project, categories } from "@/data/projects";

const DATA_PATH = path.join(process.cwd(), "data", "projects.json");

export async function readProjects(): Promise<Project[]> {
  const raw = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(raw) as Project[];
}

export async function writeProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2) + "\n", "utf-8");
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

export function uniqueSlug(base: string, existing: Project[], ignoreSlug?: string): string {
  const root = slugify(base) || "project";
  let slug = root;
  let i = 2;
  while (existing.some((p) => p.slug === slug && p.slug !== ignoreSlug)) {
    slug = `${root}-${i++}`;
  }
  return slug;
}

export interface ProjectInput {
  name: string;
  url: string;
  category: Category;
  tagline: string;
  description: string;
  industry: string;
  objectives: string[];
  approach: string;
  technologies: string[];
  services: string[];
  year: string;
  image?: string;
}

export function validateProjectInput(body: unknown): { errors: string[]; value: ProjectInput | null } {
  const errors: string[] = [];
  if (typeof body !== "object" || body === null) {
    return { errors: ["Invalid request body."], value: null };
  }
  const b = body as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name) errors.push("Name is required.");

  const url = typeof b.url === "string" ? b.url.trim() : "";
  if (!/^https?:\/\/.+/i.test(url)) errors.push("A valid URL starting with http:// or https:// is required.");

  const category = typeof b.category === "string" ? (b.category as Category) : undefined;
  if (!category || !categories.includes(category)) errors.push("A valid category is required.");

  const tagline = typeof b.tagline === "string" ? b.tagline.trim() : "";
  const description = typeof b.description === "string" ? b.description.trim() : "";
  const industry = typeof b.industry === "string" ? b.industry.trim() : "";
  const approach = typeof b.approach === "string" ? b.approach.trim() : "";
  const year = typeof b.year === "string" ? b.year.trim() : "";
  if (!year) errors.push("Year is required.");

  const objectives = Array.isArray(b.objectives) ? b.objectives.filter((o): o is string => typeof o === "string" && o.trim().length > 0) : [];
  const technologies = Array.isArray(b.technologies) ? b.technologies.filter((t): t is string => typeof t === "string" && t.trim().length > 0) : [];
  const services = Array.isArray(b.services) ? b.services.filter((s): s is string => typeof s === "string" && s.trim().length > 0) : [];

  const image = typeof b.image === "string" && b.image.startsWith("data:image/") ? b.image : undefined;

  if (errors.length > 0 || !category) {
    return { errors, value: null };
  }

  return {
    errors: [],
    value: { name, url, category, tagline, description, industry, objectives, approach, technologies, services, year, image },
  };
}
