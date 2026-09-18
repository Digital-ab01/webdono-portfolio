"use client";

import { motion } from "framer-motion";
import { Project, categories } from "@/data/projects";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function StudioSection({ projects }: { projects: Project[] }) {
  const { dict } = useLanguage();
  const stats = [
    { value: `${projects.length}+`, label: dict.studio.statShipped },
    { value: `${categories.length}`, label: dict.studio.statIndustries },
    { value: "5+", label: dict.studio.statYears },
    { value: "3", label: dict.studio.statCountries },
  ];

  return (
    <section id="studio" className="relative px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-accent-blue-2">
              {dict.studio.eyebrow}
            </p>
            <h2 className="font-display balance text-4xl font-semibold leading-[1.05] sm:text-5xl">
              {dict.studio.heading1}
              <br />
              <span className="text-gradient">{dict.studio.heading2}</span>
            </h2>
            <p className="balance mt-6 max-w-md text-muted">{dict.studio.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 gap-6 sm:gap-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="border-t border-white/10 pt-5">
                <p className="font-display text-gradient text-4xl font-semibold sm:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
