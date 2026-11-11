"use client";

import { useRef, type ReactNode } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

/** Atrae suavemente a su contenido hacia el cursor (solo con mouse). */
export default function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(`${MQ.fine} and ${MQ.motion}`, () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      return () => {
        el.removeEventListener("mousemove", move);
        el.removeEventListener("mouseleave", leave);
      };
    });
  });

  return (
    <span ref={ref} className={className ?? "inline-block"}>
      {children}
    </span>
  );
}
