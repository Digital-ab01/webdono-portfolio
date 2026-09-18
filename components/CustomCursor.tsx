"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

function subscribeFinePointer(callback: () => void) {
  const mql = window.matchMedia(FINE_POINTER_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}
function getFinePointerSnapshot() {
  return window.matchMedia(FINE_POINTER_QUERY).matches;
}
function getFinePointerServerSnapshot() {
  return false;
}

export default function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [clicking, setClicking] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.4 });

  const dotX = useSpring(x, { damping: 40, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(y, { damping: 40, stiffness: 900, mass: 0.2 });

  useEffect(() => {
    if (!enabled) return;

    function onMove(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor-hover]"
      ) as HTMLElement | null;
      setHovering(!!interactive);
      setLabel(interactive?.getAttribute("data-cursor-label") ?? null);
    }
    function onDown() {
      setClicking(true);
    }
    function onUp() {
      setClicking(false);
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? (label ? 96 : 64) : 16,
          height: hovering ? (label ? 96 : 64) : 16,
          backgroundColor: "#ffffff",
          scale: clicking ? 0.85 : 1,
        }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
      >
        {label && (
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-medium tracking-wide text-black uppercase">
            {label}
          </span>
        )}
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-accent-blue"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: hovering ? 0 : 1,
        }}
      />
    </>
  );
}
