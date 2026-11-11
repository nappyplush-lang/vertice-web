"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Cursor personalizado (anillo que sigue al mouse). Desactivado en táctil. */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
      let shown = false;
      const move = (e: MouseEvent) => {
        if (!shown) {
          shown = true;
          gsap.set(el, { x: e.clientX, y: e.clientY });
          el.dataset.visible = "true";
        }
        xTo(e.clientX);
        yTo(e.clientY);
      };
      const over = (e: MouseEvent) => {
        const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, select, input, textarea, label");
        const text = t?.closest<HTMLElement>("[data-cursor]")?.dataset.cursor ?? "";
        const field = !!t?.matches("input, textarea, select");
        el.dataset.state = field ? "hidden" : text ? "label" : t ? "active" : "idle";
        if (label.current) label.current.textContent = text;
      };
      const out = () => {
        el.dataset.visible = "false";
        shown = false;
      };
      window.addEventListener("mousemove", move, { passive: true });
      document.addEventListener("mouseover", over, { passive: true });
      document.documentElement.addEventListener("mouseleave", out);
      return () => {
        window.removeEventListener("mousemove", move);
        document.removeEventListener("mouseover", over);
        document.documentElement.removeEventListener("mouseleave", out);
      };
    });
  });

  return (
    <div
      ref={root}
      aria-hidden="true"
      data-state="idle"
      data-visible="false"
      className="group/cursor pointer-events-none fixed left-0 top-0 z-[90] hidden opacity-0 transition-opacity duration-300 data-[visible=true]:opacity-100 data-[state=hidden]:!opacity-0 fine:block"
    >
      <span className="absolute -left-4 -top-4 h-8 w-8 rounded-full border border-white mix-blend-difference transition-transform duration-500 ease-expo group-data-[state=active]/cursor:scale-[1.9] group-data-[state=label]/cursor:scale-0" />
      <span className="absolute -left-11 -top-11 grid h-[5.5rem] w-[5.5rem] scale-0 place-items-center rounded-full bg-hueso text-center text-[0.8125rem] font-medium text-carbon shadow-suave transition-transform duration-500 ease-expo group-data-[state=label]/cursor:scale-100">
        <span ref={label} />
      </span>
    </div>
  );
}
