"use client";

import { motion } from "framer-motion";
import { Category, categories } from "@/data/projects";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const all: (Category | "All")[] = ["All", ...categories];

export default function FilterBar({
  active,
  onChange,
  counts,
}: {
  active: Category | "All";
  onChange: (c: Category | "All") => void;
  counts: Record<string, number>;
}) {
  const { dict } = useLanguage();

  return (
    <div className="scrollbar-none -mx-6 flex gap-2 overflow-x-auto px-6 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
      {all.map((c) => {
        const isActive = active === c;
        return (
          <button
            key={c}
            onClick={() => onChange(c)}
            data-cursor-hover
            className={`relative shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              isActive
                ? "border-transparent text-bg"
                : "border-white/12 text-muted hover:border-white/30 hover:text-foreground"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink"
                transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {c === "All" ? dict.filter.all : dict.categories[c] ?? c}
              <span className={`text-[11px] ${isActive ? "text-bg/70" : "text-muted-2"}`}>
                {counts[c] ?? 0}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
