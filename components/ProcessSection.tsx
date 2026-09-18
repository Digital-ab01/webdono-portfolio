"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const stepNumbers = ["01", "02", "03", "04"];

export default function ProcessSection() {
  const { dict } = useLanguage();
  const steps = dict.process.steps.map((s, i) => ({ ...s, n: stepNumbers[i] }));

  return (
    <section id="process" className="relative px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-accent-blue-2">
            {dict.process.eyebrow}
          </p>
          <h2 className="font-display balance max-w-xl text-4xl font-semibold leading-[1.05] sm:text-5xl">
            {dict.process.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group border-t border-white/10 py-8 pr-6 transition-colors duration-500 hover:border-accent-purple/60"
            >
              <p className="text-gradient font-display text-sm font-semibold">{s.n}</p>
              <h3 className="font-display mt-4 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-sm text-muted">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
