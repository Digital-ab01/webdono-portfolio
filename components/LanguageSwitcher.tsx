"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { locales } from "@/lib/i18n/translations";

const LABELS: Record<string, string> = { en: "EN", fr: "FR", ar: "ع" };

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div className={`flex items-center gap-0.5 rounded-full border border-white/15 p-1 ${className}`}>
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          data-cursor-hover
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide transition-colors ${
            locale === l ? "bg-white/10 text-foreground" : "text-muted hover:text-foreground"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
