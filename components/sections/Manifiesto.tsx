"use client";

import { useRef } from "react";
import Button from "@/components/ui/Button";
import RevealImage from "@/components/ui/RevealImage";
import { site } from "@/content/site";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

const { manifesto } = site;

export default function Manifiesto() {
  const text = useRef<HTMLParagraphElement>(null);

  // El texto se "enciende" palabra por palabra con el scroll
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      // El estado atenuado solo se aplica cuando el párrafo entra en pantalla
      // (immediateRender: false): fuera de pantalla el texto conserva su contraste.
      gsap
        .timeline({ scrollTrigger: { trigger: text.current, start: "top bottom", end: "bottom 48%", scrub: true } })
        .fromTo(
          text.current!.querySelectorAll("span"),
          { opacity: 0.14 },
          { opacity: 1, ease: "none", stagger: 0.1, immediateRender: false },
          0,
        )
        .to({}, { duration: 0.01 }, 0);
    });
  });

  return (
    <section id="estudio" aria-labelledby="estudio-titulo" className="section">
      <div className="wrap">
        <h2 id="estudio-titulo" data-fade className="eyebrow">
          {manifesto.eyebrow}
        </h2>
        <p
          ref={text}
          className="mt-8 max-w-[26ch] font-display font-light leading-[1.14] tracking-[-0.03em] [font-size:clamp(1.75rem,4.6vw,4.25rem)] sm:max-w-none"
        >
          {manifesto.text.split(" ").map((word, i) => (
            <span key={i}>{word} </span>
          ))}
        </p>

        <div className="mt-[clamp(3rem,7vw,6rem)] grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <RevealImage
            image={manifesto.image}
            sizes="(min-width: 1024px) 56vw, 92vw"
            parallax={false}
            className="aspect-[16/9] lg:col-span-7"
          />
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-fade className="lead">
              {manifesto.body}
            </p>
            <dl data-stagger className="mt-8 border-t border-carbon/10">
              {manifesto.facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4 border-b border-carbon/10 py-4">
                  <dt className="text-piedra-texto">{f.label}</dt>
                  <dd className="font-display text-xl tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div data-fade className="mt-8">
              <Button href={manifesto.cta.href} variant="outline">
                {manifesto.cta.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
