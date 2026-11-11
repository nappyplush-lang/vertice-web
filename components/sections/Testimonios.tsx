"use client";

import { useRef, useState } from "react";
import Img from "@/components/ui/Img";
import Icon from "@/components/ui/Icon";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const { testimonials } = site;
const count = testimonials.items.length;

export default function Testimonios() {
  const [index, setIndex] = useState(0);
  const startX = useRef<number | null>(null);
  const go = (dir: number) => setIndex((i) => (i + dir + count) % count);

  return (
    <section aria-labelledby="testimonios-titulo" className="pb-[clamp(5rem,11vw,10rem)]">
      <div className="wrap">
        <div
          className="rounded-panel bg-white p-7 shadow-suave sm:p-10 lg:p-16"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null || e.pointerType === "mouse") return;
            const dx = e.clientX - startX.current;
            if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
            startX.current = null;
          }}
        >
          <div className="flex items-start justify-between gap-6">
            <h2 id="testimonios-titulo" data-fade className="eyebrow">
              {testimonials.eyebrow}
            </h2>
            <p aria-hidden="true" className="text-sm tabular-nums text-piedra-texto">
              <span className="text-carbon">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
            </p>
          </div>

          {/* Todas las citas ocupan la misma celda: la altura no salta al cambiar */}
          <div className="mt-8 grid touch-pan-y lg:mt-12" aria-live="polite">
            {testimonials.items.map((t, i) => {
              const on = i === index;
              return (
                <figure
                  key={t.name}
                  aria-hidden={!on}
                  className={cn(
                    "col-start-1 row-start-1 flex flex-col transition-[opacity,transform] duration-700 ease-expo",
                    on ? "translate-y-0 opacity-100 delay-150" : "pointer-events-none translate-y-4 opacity-0",
                  )}
                >
                  <blockquote className="max-w-[30ch] font-display font-light leading-[1.18] tracking-[-0.03em] [font-size:clamp(1.5rem,3.6vw,3.25rem)] lg:max-w-[34ch]">
                    <span aria-hidden="true" className="text-arena">“</span>
                    {t.quote}
                    <span aria-hidden="true" className="text-arena">”</span>
                  </blockquote>
                  <figcaption className="mt-auto flex items-center gap-4 pt-10">
                    <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-carbon/5">
                      <Img src={t.image.src} alt={t.image.alt} fill sizes="64px" className="object-cover" />
                    </span>
                    <span>
                      <span className="block font-medium">{t.name}</span>
                      <span className="block text-piedra-texto">{t.project}</span>
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 border-t border-carbon/10 pt-6">
            <div aria-hidden="true" className="flex gap-1.5">
              {testimonials.items.map((t, i) => (
                <span key={t.name} className={cn("h-px w-8 transition-colors duration-500 sm:w-12", i === index ? "bg-carbon" : "bg-carbon/15")} />
              ))}
            </div>
            <div className="flex gap-2">
              {([["arrowLeft", -1, testimonials.prev], ["arrowRight", 1, testimonials.next]] as const).map(([icon, dir, label]) => (
                <button
                  key={icon}
                  type="button"
                  aria-label={label}
                  onClick={() => go(dir)}
                  className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full border border-carbon/20 transition-colors duration-300 active:bg-carbon active:text-hueso fine:hover:bg-carbon fine:hover:text-hueso"
                >
                  <Icon name={icon} className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
