"use client";

import { useEffect } from "react";
import { countUp, gsap, MQ, ScrollTrigger, SplitText } from "@/lib/gsap";

/**
 * Animaciones genéricas de scroll, activadas con atributos data-*:
 *  data-split     título que aparece línea por línea (máscara)
 *  data-fade      aparece con fade + desplazamiento
 *  data-stagger   sus hijos directos aparecen en cascada
 *  data-reveal    imagen con reveal por clip-path
 *  data-parallax  parallax suave
 *  data-counter   contador 0 → valor
 * Sin JS o con "reducir movimiento" todo el contenido queda visible.
 *
 * Cada grupo se registra en una tarea distinta para no bloquear el hilo
 * principal en móviles de gama media (todo esto ocurre bajo el preloader).
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (!window.matchMedia(MQ.motion).matches) return;
    const all = <T extends HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
    const ctx = gsap.context(() => {});

    const steps: (() => void)[] = [
      () =>
        all("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "split-line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.1,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        }),
      () =>
        all("[data-fade]").forEach((el) => {
          gsap.from(el, { y: 28, opacity: 0, duration: 1, scrollTrigger: { trigger: el, start: "top 90%", once: true } });
        }),
      () =>
        all("[data-stagger]").forEach((el) => {
          gsap.from(el.children, { y: 36, opacity: 0, duration: 1, stagger: 0.09, scrollTrigger: { trigger: el, start: "top 86%", once: true } });
        }),
      () =>
        all("[data-reveal]").forEach((el) => {
          const inner = el.querySelector("[data-reveal-inner]");
          const st = { trigger: el, start: "top 85%", once: true };
          gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.out", scrollTrigger: st, clearProps: "clipPath" });
          if (inner) gsap.from(inner, { scale: 1.25, duration: 1.6, ease: "expo.out", scrollTrigger: st });
        }),
      () =>
        all("[data-parallax]").forEach((el) => {
          gsap.fromTo(el, { yPercent: -5 }, { yPercent: 5, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
        }),
      () =>
        all("[data-counter]:not([data-counter-manual])").forEach((el) => {
          countUp(el, { trigger: el, start: "top 90%", once: true });
        }),
      () => ScrollTrigger.refresh(),
    ];

    let timer = 0;
    const run = (i: number) => {
      if (i >= steps.length) return;
      ctx.add(steps[i]);
      timer = window.setTimeout(() => run(i + 1), 0);
    };
    timer = window.setTimeout(() => run(0), 0);

    return () => {
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return null;
}
