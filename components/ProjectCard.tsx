"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { mshot, hostname } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

// Same screenshot dimensions and aspect ratio for every card, so the grid
// stays evenly aligned regardless of how many projects admins add.
// Width is a full desktop viewport so the live screenshot renders each
// site's desktop layout instead of tripping its mobile breakpoint, and the
// aspect ratio matches it (~16:10) so the card shows the full first screen
// instead of a tall, portrait-cropped sliver.
const IMAGE_ASPECT = "aspect-[16/10]";
const IMAGE_WIDTH = 1600;
const IMAGE_HEIGHT = 1000;

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const { dict } = useLanguage();
  const ref = useRef<HTMLButtonElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: py * -6, ry: px * 8 });
  }

  return (
    <motion.button
      ref={ref}
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.3 } }}
      transition={{ duration: 0.6, delay: (index % 6) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      onClick={onOpen}
      data-cursor-hover
      data-cursor-label="View"
      style={{ perspective: 1000 }}
      className="group block w-full text-left"
    >
      <motion.div
        animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
        transition={{ type: "spring", damping: 20, stiffness: 200 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-bg-card"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className={`relative w-full overflow-hidden ${IMAGE_ASPECT}`}>
          {!loaded && <div className="skeleton absolute inset-0" />}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={imgRef}
            src={project.image ?? mshot(project.url, IMAGE_WIDTH, IMAGE_HEIGHT)}
            alt={project.name}
            onLoad={() => setLoaded(true)}
            loading="lazy"
            className={`h-full w-full scale-105 object-cover object-top transition-all duration-700 ease-out group-hover:scale-110 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 via-45% to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
            <span className="glass rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-white/90">
              {dict.categories[project.category] ?? project.category}
            </span>
            <span className="flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 text-black opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={16} />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 translate-y-2 p-5 transition-transform duration-500 group-hover:translate-y-0">
            <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-white/50">
              {hostname(project.url)}
            </p>
            <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
              {project.name}
            </h3>
            <p className="mt-1 max-h-0 overflow-hidden text-sm text-white/70 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-20 group-hover:opacity-100">
              {project.tagline}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.button>
  );
}
