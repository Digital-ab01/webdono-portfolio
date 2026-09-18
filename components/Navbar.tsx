"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const CONTACT_URL = "https://webdono.com/contact-us";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const { dict } = useLanguage();

  const links = [
    { label: dict.nav.work, href: "#work" },
    { label: dict.nav.studio, href: "#studio" },
    { label: dict.nav.process, href: "#process" },
    { label: dict.nav.contact, href: "#contact" },
  ];

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  useEffect(() => {
    document.body.dataset.scrollLock = open ? "true" : "false";
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:px-6 sm:pt-5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`flex w-full max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_8px_40px_rgba(0,0,0,0.4)]" : "bg-transparent"
          }`}
        >
          <a href="#top" data-cursor-hover className="font-display text-lg font-semibold tracking-tight">
            Webdono<span className="text-accent-blue">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor-hover
                className="group relative text-sm text-muted transition-colors hover:text-foreground"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-accent-blue to-accent-purple transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <LanguageSwitcher className="hidden md:flex" />

          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="hidden items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-sm font-medium transition-colors hover:border-white/40 md:flex"
          >
            {dict.nav.startProject}
            <ArrowUpRight size={15} />
          </a>

          <button
            aria-label="Toggle menu"
            data-cursor-hover
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-40 flex flex-col justify-center bg-bg px-8 md:hidden"
        initial={false}
        animate={open ? { clipPath: "circle(150% at 100% 0%)" } : { clipPath: "circle(0% at 100% 0%)" }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        style={{ pointerEvents: open ? "auto" : "none" }}
      >
        <div className="glow-field absolute inset-0" />
        <nav className="relative flex flex-col gap-6">
          {links.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: open ? 0.15 + i * 0.06 : 0 }}
              className="font-display text-4xl font-medium"
            >
              {l.label}
            </motion.a>
          ))}
          <motion.a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: open ? 0.4 : 0 }}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-bg"
          >
            {dict.nav.startProject} <ArrowUpRight size={16} />
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: open ? 0.46 : 0 }}
            className="mt-2"
          >
            <LanguageSwitcher />
          </motion.div>
        </nav>
      </motion.div>
    </>
  );
}
