"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";
import { mshot } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const CONTACT_URL = "https://webdono.com/contact-us";

const FEATURED_SLUGS = [
  "riad-dar-fatima",
  "aliria-bag",
  "dahhani-signature-golf",
  "fatima-atv-quad-experience",
];

function pickFeatured(projects: Project[]): Project[] {
  const bySlug = FEATURED_SLUGS.map((slug) => projects.find((p) => p.slug === slug)).filter(
    (p): p is Project => !!p
  );
  const remaining = projects.filter((p) => !bySlug.includes(p));
  return [...bySlug, ...remaining].slice(0, 4);
}

const floatCards = [
  { className: "right-[13%] top-[6%] w-[180px] xl:w-[220px]", rotate: -7, depth: 30, delay: 0 },
  { className: "right-[-2%] top-[16%] w-[160px] xl:w-[195px]", rotate: 6, depth: 46, delay: 0.15 },
  { className: "right-[18%] bottom-[8%] w-[150px] xl:w-[185px]", rotate: 4, depth: 20, delay: 0.3 },
  { className: "right-[-1%] bottom-[4%] w-[170px] xl:w-[210px]", rotate: -5, depth: 38, delay: 0.45 },
];

function FloatCard({
  p,
  f,
  i,
  smx,
  smy,
}: {
  p: Project;
  f: (typeof floatCards)[number];
  i: number;
  smx: MotionValue<number>;
  smy: MotionValue<number>;
}) {
  const fx = useTransform(smx, (v) => v * f.depth);
  const fy = useTransform(smy, (v) => v * f.depth);
  return (
    <motion.div
      className={`absolute ${f.className}`}
      style={{ x: fx, y: fy }}
      initial={{ opacity: 0, y: 40, rotate: f.rotate }}
      animate={{ opacity: 1, y: [0, -14, 0] }}
      transition={{
        opacity: { duration: 0.9, delay: 1.9 + f.delay },
        y: { duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: 2 + f.delay },
      }}
    >
      <div
        className="group overflow-hidden rounded-xl border border-white/10 bg-bg-card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]"
        style={{ transform: `rotate(${f.rotate}deg)` }}
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
        </div>
        <div className="aspect-[4/3] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mshot(p.url, 480, 360)}
            alt={p.name}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero({ projects }: { projects: Project[] }) {
  const { dict } = useLanguage();
  const featured = pickFeatured(projects);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { damping: 24, stiffness: 120 });
  const smy = useSpring(my, { damping: 24, stiffness: 120 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  }

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
    >
      <div className="glow-field absolute inset-0" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 40%, black, transparent 75%)",
        }}
      />

      {/* Floating website mockups */}
      <div className="pointer-events-none absolute inset-0 hidden xl:block">
        {featured.map((p, i) => (
          <FloatCard key={p.slug} p={p} f={floatCards[i]} i={i} smx={smx} smy={smy} />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.85, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-blue-2 shadow-[0_0_10px_2px_rgba(94,234,212,0.6)]" />
          {dict.hero.eyebrow}
        </motion.div>

        <h1 className="font-display max-w-4xl text-[13vw] leading-[0.98] font-semibold tracking-tight sm:text-[9vw] lg:text-[5.4rem]">
          {dict.hero.line1.split(" ").map((word, i) => (
            <span key={i} className="mr-4 inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          <br />
          {dict.hero.line2.split(" ").map((word, i) => (
            <span key={i} className="mr-4 inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, delay: 2.16 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
          <br />
          <span className="mr-4 inline-block overflow-hidden align-top">
            <motion.span
              className="text-gradient inline-block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {dict.hero.line3}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
          className="balance mt-8 max-w-lg text-base text-muted sm:text-lg"
        >
          {dict.hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.75, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            data-cursor-hover
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-bg"
          >
            <span className="relative z-10">{dict.hero.ctaGallery}</span>
            <ArrowUpRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href={CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium transition-colors hover:border-white/40"
          >
            {dict.nav.startProject}
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">{dict.hero.scroll}</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
