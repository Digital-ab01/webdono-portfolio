"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const raf_id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(raf_id);
      lenis.destroy();
    };
  }, []);

  // Stop/start lenis when a modal locks scroll (via body data attribute)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const locked = document.body.dataset.scrollLock === "true";
      if (!lenisRef.current) return;
      if (locked) lenisRef.current.stop();
      else lenisRef.current.start();
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-scroll-lock"] });
    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
