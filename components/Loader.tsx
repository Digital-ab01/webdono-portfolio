"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.dataset.scrollLock = "true";
    const t1 = setTimeout(() => setDone(true), 1200);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.dataset.scrollLock = "false";
    }, 1900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scaleY: 1 }}
            animate={done ? { scaleY: 0 } : { scaleY: 1 }}
            style={{ originY: 0 }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: done ? 0 : 0 }}
          />
          <div className="relative flex flex-col items-center gap-5">
            <div className="flex items-baseline gap-1 font-display text-3xl font-semibold tracking-tight text-foreground">
              <span>Webdono</span>
            </div>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-pink"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
