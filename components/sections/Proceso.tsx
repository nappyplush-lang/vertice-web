"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";

const { process } = site;

/** Línea de tiempo que se llena con el scroll: vertical en móvil, horizontal en desktop. */
export default function Proceso() {
  const list = useRef<HTMLOListElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ motion: MQ.motion, desktop: MQ.desktop }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      const steps = gsap.utils.toArray<HTMLElement>("[data-step]", list.current);
      const n = steps.length - 1;
      const paint = (p: number) => steps.forEach((s, i) => s.classList.toggle("is-on", p >= i / n - 0.02));
      // Los pasos se atenúan solo al entrar en pantalla; antes mantienen su contraste
      let armed = false;
      const arm = ScrollTrigger.create({
        trigger: list.current,
        start: "top bottom",
        once: true,
        onEnter: () => {
          armed = true;
          paint(0);
        },
      });
      gsap.fromTo(
        fill.current,
        desktop ? { scaleX: 0, scaleY: 1 } : { scaleY: 0, scaleX: 1 },
        {
          scaleX: 1,
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list.current,
            start: desktop ? "top 78%" : "top 70%",
            end: desktop ? "top 28%" : "bottom 65%",
            scrub: 0.4,
            onUpdate: (self) => armed && paint(self.progress),
          },
        },
      );
      return () => {
        arm.kill();
        steps.forEach((s) => s.classList.add("is-on"));
      };
    });
  });

  return (
    <section id="proceso" aria-labelledby="proceso-titulo" className="section pt-0">
      <div className="wrap">
        <SectionHeading id="proceso-titulo" eyebrow={process.eyebrow} title={process.title}>
          <p className="lead">{process.intro}</p>
        </SectionHeading>

        <ol ref={list} className="relative mt-[clamp(3rem,6vw,5.5rem)] grid gap-10 lg:grid-cols-5 lg:gap-6">
          {/* Riel + relleno */}
          <li aria-hidden="true" className="absolute bottom-3 left-[0.6875rem] top-3 w-px bg-carbon/15 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[0.6875rem] lg:h-px lg:w-auto">
            <span ref={fill} className="block h-full w-full origin-top bg-carbon lg:origin-left" />
          </li>

          {process.steps.map((s, i) => (
            <li key={s.title} data-step className="is-on group relative pl-12 lg:pl-0 lg:pr-4">
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 grid h-[1.4375rem] w-[1.4375rem] place-items-center rounded-full border border-carbon/25 bg-hueso transition-colors duration-500 group-[.is-on]:border-carbon group-[.is-on]:bg-carbon lg:static"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-arena opacity-0 transition-opacity duration-500 group-[.is-on]:opacity-100" />
              </span>
              <div className="opacity-40 transition-opacity duration-700 group-[.is-on]:opacity-100 lg:mt-8">
                <p className="text-sm text-piedra-texto">
                  0{i + 1} <span className="mx-1.5 text-carbon/25">/</span> {s.time}
                </p>
                <h3 className="mt-2 font-display text-[1.75rem] font-light leading-tight tracking-[-0.03em] lg:mt-3 lg:text-[2rem]">{s.title}</h3>
                <p className="mt-2.5 max-w-[34ch] text-piedra-texto">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
