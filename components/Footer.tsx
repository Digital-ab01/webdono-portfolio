"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CONTACT_URL = "https://webdono.com/contact-us";

export default function Footer() {
  const { dict } = useLanguage();

  return (
    <footer id="contact" className="relative overflow-hidden px-5 pt-28 sm:px-8 lg:pt-36">
      <div className="glow-field pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-white/10 pt-16 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-accent-blue-2">
            {dict.footer.eyebrow}
          </p>
          <h2 className="font-display balance mx-auto max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-7xl">
            {dict.footer.heading1}{" "}
            <span className="text-gradient">{dict.footer.heading2}</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-muted">{dict.footer.description}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-4 text-sm font-medium text-bg"
            >
              {dict.footer.cta}
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>

        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/10 py-10 sm:flex-row">
          <a href="#top" data-cursor-hover className="font-display text-xl font-semibold tracking-tight">
            Webdono<span className="text-accent-blue">.</span>
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            <a href="#work" data-cursor-hover className="hover:text-foreground">{dict.nav.work}</a>
            <a href="#studio" data-cursor-hover className="hover:text-foreground">{dict.nav.studio}</a>
            <a href="#process" data-cursor-hover className="hover:text-foreground">{dict.nav.process}</a>
            <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" data-cursor-hover className="hover:text-foreground">{dict.nav.contact}</a>
          </nav>

          <p className="text-xs text-muted-2">© {new Date().getFullYear()} Webdono. {dict.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
