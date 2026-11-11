"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { markReady } from "@/lib/ready";
import { LogoMark } from "./Logo";
import { site } from "@/content/site";

/** Preloader breve (≈1,4 s): isotipo + contador 0–100 y cortina que sube. */
export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const finish = () => {
      el.style.display = "none";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      markReady();
      gsap.to(el, { opacity: 0, duration: 0.2, onComplete: finish });
      return;
    }
    const state = { v: 0 };
    gsap
      .timeline()
      .to(state, {
        v: 100,
        duration: 0.85,
        ease: "power2.inOut",
        onUpdate: () => {
          if (num.current) num.current.textContent = String(Math.round(state.v)).padStart(3, "0");
        },
      })
      .from("[data-pre-mark]", { opacity: 0, y: 14, duration: 0.6 }, 0)
      .add(markReady)
      .to("[data-pre-content]", { opacity: 0, duration: 0.25 }, ">-0.05")
      .to(el, { yPercent: -100, duration: 0.55, ease: "expo.inOut", onComplete: finish }, "<");
  }, { scope: root });

  return (
    <div ref={root} className="preloader fixed inset-0 z-[100] bg-carbon text-hueso" aria-hidden="true">
      <div data-pre-content className="flex h-full flex-col items-center justify-center">
        <span data-pre-mark>
          <LogoMark className="h-14 w-14" />
        </span>
        <span className="mt-5 font-display text-sm font-medium tracking-[0.4em]">{site.brand.name}</span>
        <span
          ref={num}
          className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-6 font-display text-[clamp(3rem,10vw,6rem)] font-light leading-none tracking-tight tabular-nums"
        >
          000
        </span>
      </div>
    </div>
  );
}
