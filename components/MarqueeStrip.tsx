"use client";

import { categories } from "@/data/projects";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function MarqueeStrip() {
  const { dict } = useLanguage();
  const labels = categories.map((c) => dict.categories[c] ?? c);
  const items = [...labels, ...labels];
  return (
    <div className="relative overflow-hidden border-y border-white/8 bg-bg-elevated py-5">
      <div className="flex w-max animate-marquee gap-10">
        {[...items, ...items].map((c, i) => (
          <div key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-xl font-medium text-muted-2 sm:text-2xl">
              {c}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent-purple/60" />
          </div>
        ))}
      </div>
    </div>
  );
}
