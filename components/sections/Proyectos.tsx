"use client";

import { useRef } from "react";
import Img from "@/components/ui/Img";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const { projects } = site;
const total = String(projects.items.length).padStart(2, "0");

/**
 * Escritorio: scroll horizontal con pin (GSAP).
 * Móvil / táctil / reducir movimiento: carrusel nativo con scroll-snap.
 */
export default function Proyectos() {
  const section = useRef<HTMLElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const sec = section.current!;
    const vp = viewport.current!;
    const tr = track.current!;
    const setBar = (p: number) => gsap.set(bar.current, { scaleX: gsap.utils.clamp(0.04, 1, p) });
    setBar(0);

    const mm = gsap.matchMedia();
    mm.add(`${MQ.desktop} and ${MQ.motion}`, () => {
      vp.scrollLeft = 0;
      sec.classList.add("is-pinned");
      const distance = () => Math.max(0, tr.scrollWidth - vp.clientWidth);
      gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          onUpdate: (self) => setBar(self.progress),
        },
      });
      return () => {
        sec.classList.remove("is-pinned");
        gsap.set(tr, { clearProps: "transform" });
      };
    });

    // Carrusel nativo: la barra sigue el scroll horizontal
    const onScroll = () => {
      const max = vp.scrollWidth - vp.clientWidth;
      if (max > 0) setBar(vp.scrollLeft / max);
    };
    vp.addEventListener("scroll", onScroll, { passive: true });
    return () => vp.removeEventListener("scroll", onScroll);
  }, { scope: section });

  return (
    <section
      ref={section}
      id="proyectos"
      aria-labelledby="proyectos-titulo"
      className="overflow-x-clip rounded-panel bg-white py-[clamp(4rem,8vw,6rem)] lg:flex lg:min-h-screen lg:flex-col lg:justify-center lg:pb-8 lg:pt-24"
    >
      <div className="wrap">
        <SectionHeading id="proyectos-titulo" eyebrow={projects.eyebrow} title={projects.title} className="lg:[&_h2]:max-w-none lg:[&_h2]:[font-size:clamp(2.25rem,4vw,3.75rem)]">
          <div className="flex items-center gap-4 lg:justify-end">
            <p className="flex items-center gap-2 text-[0.9375rem] text-piedra-texto lg:hidden">
              {projects.hint}
              <Icon name="arrowRight" className="h-4 w-4 animate-nudge" />
            </p>
            <span aria-hidden="true" className="ml-auto block h-px w-24 overflow-hidden bg-carbon/15 lg:ml-0 lg:w-40">
              <span ref={bar} className="block h-full origin-left bg-carbon" />
            </span>
            <span aria-hidden="true" className="text-sm tabular-nums text-piedra-texto">{total}</span>
          </div>
        </SectionHeading>
      </div>

      <div
        ref={viewport}
        data-viewport
        tabIndex={0}
        role="region"
        aria-label={projects.labels.regionLabel}
        className="no-scrollbar mt-8 snap-x snap-mandatory overflow-x-auto overscroll-x-contain lg:mt-10"
        style={{ scrollPaddingInline: "var(--gutter)" }}
      >
        <ul ref={track} className="flex w-max gap-4 px-[var(--gutter)] will-change-transform lg:gap-6 2xl:px-[max(var(--gutter),calc((100vw-1440px)/2+var(--gutter)))]">
          {projects.items.map((p, i) => (
            <li key={p.name} className="snap-start">
              <article className="group flex flex-col">
                <div className="relative aspect-[4/5] w-[78vw] max-w-[21rem] overflow-hidden rounded-card bg-carbon/5 sm:w-[44vw] sm:max-w-[24rem] lg:h-[clamp(15rem,calc(100svh-26.5rem),36rem)] lg:w-auto lg:max-w-none">
                  <Img
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 44vw, 78vw"
                    className="object-cover transition-transform duration-[1200ms] ease-expo fine:group-hover:scale-105"
                  />
                  <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-carbon/45 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                    {p.area} {projects.labels.area}
                  </span>
                  <span aria-hidden="true" className="absolute left-4 top-4 text-sm text-white/90 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="w-0 min-w-full px-1 pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[1.375rem] font-normal leading-tight tracking-[-0.02em] lg:text-2xl">{p.name}</h3>
                    <span className="text-sm text-piedra-texto tabular-nums">{p.year}</span>
                  </div>
                  <p className="mt-1 text-piedra-texto">{p.location}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-carbon/10 pt-4 text-[0.9375rem]">
                    <li>{p.area} {projects.labels.area}</li>
                    <li className="text-piedra-texto">{p.rooms} {projects.labels.rooms}</li>
                    <li className="text-piedra-texto">{p.baths} {projects.labels.baths}</li>
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
