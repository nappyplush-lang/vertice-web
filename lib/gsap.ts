"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
gsap.defaults({ ease: "power3.out" });

/** Media queries compartidas por todas las animaciones. */
export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  desktop: "(min-width: 1024px)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

/** Contador 0 → valor (lee el destino de data-counter). */
export function countUp(el: HTMLElement, scrollTrigger?: ScrollTrigger.Vars, delay = 0) {
  const end = Number(el.dataset.counter ?? 0);
  const state = { v: 0 };
  el.textContent = "0";
  return gsap.to(state, {
    v: end,
    duration: 1.8,
    delay,
    ease: "power2.out",
    scrollTrigger,
    onUpdate: () => {
      el.textContent = String(Math.round(state.v));
    },
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
