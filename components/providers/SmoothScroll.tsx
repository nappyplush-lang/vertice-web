"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, MQ, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

/**
 * Smooth scroll con Lenis SOLO en escritorio con mouse.
 * En pantallas táctiles se deja el scroll nativo (más fluido y sin lag).
 */
export default function SmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const lenis = new Lenis({ duration: 1.15, anchors: true, autoRaf: false });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(raf);
        lenis.destroy();
        setLenis(null);
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, []);

  return null;
}
