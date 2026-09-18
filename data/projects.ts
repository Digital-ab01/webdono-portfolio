export type Category =
  | "Tourism"
  | "Hotels & Riads"
  | "E-commerce"
  | "Corporate Websites"
  | "Transportation"
  | "Luxury Services"
  | "Agriculture"
  | "Experiences"
  | "Automotive";

export const categories: Category[] = [
  "Tourism",
  "Hotels & Riads",
  "E-commerce",
  "Corporate Websites",
  "Transportation",
  "Luxury Services",
  "Agriculture",
  "Experiences",
  "Automotive",
];

export interface Project {
  slug: string;
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
  /** Optional uploaded thumbnail (data URL). Falls back to a live screenshot of `url` when absent. */
  image?: string;
}

export function getProjectsByCategory(projects: Project[], category: Category | "All") {
  if (category === "All") return projects;
  return projects.filter((p) => p.category === category);
}
