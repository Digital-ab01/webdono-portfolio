"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Monitor, Smartphone, Tablet, X } from "lucide-react";
import { Project } from "@/data/projects";
import { hostname } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CONTACT_URL = "https://webdono.com/contact-us";

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_WIDTHS: Record<Device, string> = {
  desktop: "100%",
  tablet: "834px",
  mobile: "390px",
};

function CaseStudyBody({ project }: { project: Project }) {
  const { dict } = useLanguage();
  const [device, setDevice] = useState<Device>("desktop");
  const [frameBlocked, setFrameBlocked] = useState(false);

  return (
    <div className="relative mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 lg:pt-12">
      <div className="min-w-0">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-display balance mb-2 text-3xl font-semibold sm:text-4xl"
        >
          {project.tagline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.6 }}
          className="mb-8 max-w-xl text-muted"
        >
          {project.description}
        </motion.p>

        {/* Live preview — full width */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-bg-card"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="hidden items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-muted sm:flex">
              <span>{hostname(project.url)}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 rounded-full border border-white/10 p-1">
                <button
                  onClick={() => setDevice("desktop")}
                  data-cursor-hover
                  aria-label={dict.modal.desktopView}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                    device === "desktop" ? "bg-white/10 text-foreground" : "text-muted"
                  }`}
                >
                  <Monitor size={13} />
                </button>
                <button
                  onClick={() => setDevice("tablet")}
                  data-cursor-hover
                  aria-label={dict.modal.tabletView}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                    device === "tablet" ? "bg-white/10 text-foreground" : "text-muted"
                  }`}
                >
                  <Tablet size={13} />
                </button>
                <button
                  onClick={() => setDevice("mobile")}
                  data-cursor-hover
                  aria-label={dict.modal.mobileView}
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs transition-colors ${
                    device === "mobile" ? "bg-white/10 text-foreground" : "text-muted"
                  }`}
                >
                  <Smartphone size={13} />
                </button>
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex items-center gap-1 text-xs text-muted hover:text-foreground"
              >
                {dict.modal.openLive} <ExternalLink size={12} />
              </a>
            </div>
          </div>
          <div className="relative h-[70vh] w-full overflow-auto bg-white">
            <div
              className={device === "desktop" ? "h-full w-full" : "mx-auto h-full"}
              style={{ width: DEVICE_WIDTHS[device] }}
            >
              <iframe
                src={project.url}
                title={`${project.name} live preview`}
                className="h-full w-full"
                loading="lazy"
                onError={() => setFrameBlocked(true)}
              />
            </div>
            {frameBlocked && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-bg-card text-center">
                <p className="max-w-xs text-sm text-muted">{dict.modal.frameBlocked}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent-blue-2 underline underline-offset-4"
                >
                  {dict.modal.openHost} {hostname(project.url)}
                </a>
              </div>
            )}
          </div>
        </motion.div>

        {/* Details — below the preview */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5">
              <div>
                <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-muted-2">
                  {dict.modal.clientIndustry}
                </p>
                <p className="text-sm">{project.industry}</p>
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-2">
                  {dict.modal.objectives}
                </p>
                <ul className="space-y-1.5">
                  {project.objectives.map((o) => (
                    <li key={o} className="flex gap-2 text-sm text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent-blue-2" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-2">
                  {dict.modal.designApproach}
                </p>
                <p className="text-sm text-muted">{project.approach}</p>
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-2">
                  {dict.modal.technologies}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-2">
                  {dict.modal.servicesProvided}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-white/[0.06] px-2.5 py-1 text-xs text-foreground/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground px-5 py-3.5 text-sm font-medium text-bg"
              >
                {dict.modal.visitWebsite}
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium transition-colors hover:border-white/40"
              >
                {dict.modal.contactWebdono}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { dict } = useLanguage();

  useEffect(() => {
    document.body.dataset.scrollLock = project ? "true" : "false";
  }, [project]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-[80] overflow-y-auto bg-bg"
          initial={{ clipPath: "inset(0% 0% 100% 0% round 24px)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0% round 0px)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0% round 24px)" }}
          transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="glow-field pointer-events-none fixed inset-0" />

          {/* Header */}
          <div className="glass sticky top-0 z-20 flex items-center justify-between px-5 py-4 sm:px-8">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue-2">
                {dict.categories[project.category] ?? project.category} · {project.year}
              </p>
              <h2 className="font-display truncate text-lg font-semibold sm:text-xl">
                {project.name}
              </h2>
            </div>
            <button
              onClick={onClose}
              data-cursor-hover
              aria-label="Close case study"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition-colors hover:border-white/40"
            >
              <X size={18} />
            </button>
          </div>

          <CaseStudyBody key={project.slug} project={project} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
