"use client";

import { useEffect, useRef, useState } from "react";
import Img from "@/components/ui/Img";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { cn } from "@/lib/cn";

const { services } = site;
const DESK = `(min-width: 1024px) and ${MQ.fine}`;

/**
 * Escritorio con mouse: filas grandes con una imagen flotante que sigue al cursor.
 * Táctil / móvil: acordeón con la imagen dentro.
 */
export default function Servicios() {
  const list = useRef<HTMLUListElement>(null);
  const floater = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(0);
  const [hover, setHover] = useState(0);
  const [near, setNear] = useState(false);

  // Las imágenes flotantes no se descargan hasta que la sección se acerca
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setNear(true), io.disconnect()), { rootMargin: "600px" });
    if (list.current) io.observe(list.current);
    return () => io.disconnect();
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(DESK, () => {
      const el = floater.current!;
      const ul = list.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, scale: 0.6, opacity: 0 });
      const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
      const rTo = gsap.quickTo(el, "rotation", { duration: 0.7, ease: "power3.out" });
      let lastX = 0;
      const move = (e: MouseEvent) => {
        xTo(e.clientX + 180);
        yTo(e.clientY);
        rTo(gsap.utils.clamp(-6, 6, (e.clientX - lastX) * 0.35));
        lastX = e.clientX;
      };
      const enter = (e: MouseEvent) => {
        gsap.set(el, { x: e.clientX + 180, y: e.clientY });
        gsap.to(el, { scale: 1, opacity: 1, duration: 0.6, ease: "expo.out", overwrite: "auto" });
      };
      const leave = () => gsap.to(el, { scale: 0.6, opacity: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
      ul.addEventListener("mousemove", move);
      ul.addEventListener("mouseenter", enter);
      ul.addEventListener("mouseleave", leave);
      return () => {
        ul.removeEventListener("mousemove", move);
        ul.removeEventListener("mouseenter", enter);
        ul.removeEventListener("mouseleave", leave);
      };
    });
  });

  const onRow = (i: number) => {
    if (window.matchMedia(DESK).matches) scrollToTarget("#contacto");
    else setOpen((v) => (v === i ? null : i));
  };

  return (
    <section id="servicios" aria-labelledby="servicios-titulo" className="section pt-0">
      <div className="wrap">
        <SectionHeading id="servicios-titulo" eyebrow={services.eyebrow} title={services.title} />

        <ul ref={list} data-stagger className="mt-[clamp(2.5rem,5vw,4.5rem)] border-t border-carbon/15">
          {services.items.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.title} className="border-b border-carbon/15">
                <h3>
                  <button
                    type="button"
                    data-cursor={services.hint}
                    aria-expanded={isOpen}
                    aria-controls={`servicio-${i}`}
                    onClick={() => onRow(i)}
                    onMouseEnter={() => setHover(i)}
                    onFocus={() => setHover(i)}
                    className="group grid w-full grid-cols-[2.25rem_1fr_auto] items-center gap-x-3 py-6 text-left transition-colors duration-500 desk:grid-cols-12 desk:gap-x-8 desk:py-9"
                  >
                    <span className="text-sm text-piedra-texto desk:col-span-1">0{i + 1}</span>
                    <span className="font-display font-light leading-[1.05] tracking-[-0.035em] transition-transform duration-700 ease-expo [font-size:clamp(1.625rem,4.4vw,3.75rem)] desk:col-span-6 desk:group-hover:translate-x-4">
                      {s.title}
                    </span>
                    <span className="hidden text-piedra-texto desk:col-span-4 desk:block">{s.text}</span>
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 place-items-center justify-self-end rounded-full border border-carbon/20 transition-colors duration-500 desk:col-span-1 desk:group-hover:border-carbon desk:group-hover:bg-carbon desk:group-hover:text-hueso"
                    >
                      <Icon name="plus" className={cn("h-5 w-5 transition-transform duration-500 ease-expo desk:hidden", isOpen && "rotate-45")} />
                      <Icon name="arrow" className="hidden h-5 w-5 desk:block" />
                    </span>
                  </button>
                </h3>

                {/* Panel del acordeón (móvil / táctil) */}
                <div
                  id={`servicio-${i}`}
                  role="region"
                  aria-label={s.title}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-700 ease-expo desk:hidden",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid gap-5 pb-7 sm:grid-cols-2 sm:items-center sm:gap-8">
                      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-carbon/5">
                        <Img src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 640px) 46vw, 92vw" className="object-cover" />
                      </div>
                      <p className="text-piedra-texto">{s.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Imagen flotante que sigue al cursor (solo escritorio con mouse) */}
      <div
        ref={floater}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[25rem] w-[20rem] overflow-hidden rounded-card opacity-0 shadow-[0_30px_80px_-20px_rgb(20_20_20/0.45)] desk:block"
      >
        {near && services.items.map((s, i) => (
          <Img
            key={s.title}
            src={s.image.src}
            alt=""
            fill
            sizes="320px"
            className={cn("object-cover transition-[opacity,transform] duration-700 ease-expo", hover === i ? "scale-100 opacity-100" : "scale-110 opacity-0")}
          />
        ))}
      </div>
    </section>
  );
}
