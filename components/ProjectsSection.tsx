"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Category, Project, categories } from "@/data/projects";
import FilterBar from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const { dict } = useLanguage();
  const [active, setActive] = useState<Category | "All">("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: projects.length };
    categories.forEach((cat) => {
      c[cat] = projects.filter((p) => p.category === cat).length;
    });
    return c;
  }, [projects]);

  return (
    <section id="work" className="relative px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-accent-blue-2">
              {dict.projects.eyebrow}
            </p>
            <h2 className="font-display balance max-w-2xl text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {dict.projects.headingPrefix} {projects.length} {dict.projects.headingSuffix}
              <span className="text-muted"> {dict.projects.headingTail}</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <FilterBar active={active} onChange={setActive} counts={counts} />
          </motion.div>
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={i}
                onOpen={() => setSelected(project)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted">{dict.projects.empty}</p>
        )}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
