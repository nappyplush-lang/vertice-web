"use client";

import { useRef } from "react";
import Image, { getImageProps } from "next/image";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/content/site";
import { countUp, gsap, MQ, useGSAP } from "@/lib/gsap";
import { onReady } from "@/lib/ready";

const { hero } = site;

/** Art direction: imagen vertical en pantallas verticales, horizontal en el resto. */
const PORTRAIT = "(max-width: 1023px) and (orientation: portrait)";

function ArtPicture({ desktop, mobile, alt, priority, blur }: { desktop: typeof hero.image.desktop; mobile: typeof hero.image.mobile; alt: string; priority?: boolean; blur?: boolean }) {
  const common = { alt, sizes: "100vw", quality: 85, priority, placeholder: blur ? ("blur" as const) : ("empty" as const) };
  const { props: d } = getImageProps({ ...common, src: desktop });
  const { props: m } = getImageProps({ ...common, src: mobile });
  return (
    <picture>
      <source media={PORTRAIT} srcSet={m.srcSet} sizes="100vw" width={m.width} height={m.height} />
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      <img {...d} className="absolute inset-0 h-full w-full object-cover" />
    </picture>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.motion, () => {
      const q = gsap.utils.selector(root);
      // Estado inicial (oculto tras el preloader) y entrada
      gsap.set(q("[data-in]"), { opacity: 0, y: 26 });
      gsap.set(q("[data-word]"), { opacity: 0, yPercent: 22 });
      gsap.set(q("[data-scene]"), { scale: 1.1 });
      const nums = q("[data-counter]") as HTMLElement[];
      nums.forEach((n) => (n.textContent = "0"));

      const off = onReady(() => {
        gsap
          .timeline({ defaults: { ease: "expo.out" } })
          .to(q("[data-scene]"), { scale: 1, duration: 2 }, 0)
          .to(q("[data-word]"), { opacity: 1, yPercent: 0, duration: 1.5 }, 0.1)
          .to(q("[data-in]"), { opacity: 1, y: 0, duration: 1.1, stagger: 0.08 }, 0.4);
        nums.forEach((n) => countUp(n, undefined, 0.7));
      });

      // Parallax por capas: fondo, nombre y casa se mueven a ritmos distintos
      const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(q("[data-bg]"), { yPercent: 6, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-word-inner]"), { yPercent: 55, ease: "none", scrollTrigger: st });
      gsap.to(q("[data-casa]"), { yPercent: 2.5, ease: "none", scrollTrigger: st });
      return off;
    });
  }, { scope: root });

  return (
    <section ref={root} id="inicio" aria-label={hero.headline} className="p-2 pb-0 sm:p-3 sm:pb-0">
      <div className="relative isolate h-[calc(100svh-0.5rem)] lg:[--pad:calc(var(--gutter)+0.75rem)] lg:[--padr:calc(var(--gutter)-0.25rem)] min-h-[36rem] overflow-hidden rounded-card bg-carbon text-white sm:h-[calc(100svh-0.75rem)] lg:rounded-panel">
        {/* Escena: fondo → nombre gigante → casa recortada */}
        <div data-scene className="hero-scene absolute inset-0">
          <div data-bg className="absolute inset-x-0 -top-[7%] h-[107%]">
            <ArtPicture desktop={hero.image.desktop} mobile={hero.image.mobile} alt={hero.image.alt} priority blur />
          </div>

          <div data-word className="hero-word pointer-events-none absolute inset-x-0 px-[5%] lg:pl-[var(--pad)] lg:pr-[var(--padr)]" aria-hidden="true">
            <svg data-word-inner viewBox="0 0 1000 222" className="block h-auto w-full overflow-visible">
              <defs>
                <linearGradient id="vertice-fade" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
                  <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
                </linearGradient>
              </defs>
              <text x="0" y="214" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="222" fontWeight="600" fill="url(#vertice-fade)" className="font-display">
                {hero.word}
              </text>
            </svg>
          </div>

          {/* Bruma lejana: asienta el nombre en el cielo, por detrás de la casa */}
          <div aria-hidden="true" className="hero-haze absolute inset-0" />

          {hero.casa ? (
            <div data-casa className="hero-casa absolute">
              {/* Sombra de contacto */}
              <div aria-hidden="true" className="hero-casa-shadow absolute" />
              <Image
                src={hero.casa}
                alt=""
                priority
                quality={85}
                sizes="(max-width: 1023px) and (orientation: portrait) 160vw, (max-width: 1023px) 80vw, 66vw"
                className="hero-casa-img relative block h-auto w-full"
              />
            </div>
          ) : null}

          {/* Niebla en la base: funde la casa con el paisaje */}
          <div aria-hidden="true" className="hero-fog absolute inset-x-0" />
        </div>

        {/* Degradados para legibilidad del menú y de los textos inferiores */}
        <div aria-hidden="true" className="hero-top absolute inset-x-0 top-0" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/75 via-black/30 to-transparent lg:h-[45%] lg:from-black/55" />

        {/* Contenido */}
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-6 sm:p-8 lg:pb-10 lg:pl-[var(--pad)] lg:pr-[var(--padr)]">
          <h1
            data-in
            className="max-w-[16ch] font-display text-[clamp(1.75rem,7.4vw,2.75rem)] font-light leading-[1.08] tracking-[-0.03em] lg:absolute lg:left-[var(--pad)] lg:top-[7.5rem] lg:max-w-[17rem] lg:text-[1.125rem] lg:font-normal lg:leading-snug lg:tracking-normal"
          >
            {hero.headline}
          </h1>
          <p
            data-in
            className="mt-3 text-base text-white/80 lg:absolute lg:right-[var(--padr)] lg:top-[7.5rem] lg:mt-0 lg:max-w-[12rem] lg:text-right lg:text-[1.125rem] lg:leading-snug lg:text-white"
          >
            {hero.aside}
          </p>

          <div className="mt-6 grid gap-4 lg:mt-0 lg:grid-cols-3 lg:items-end">
            {/* Indicador de scroll (desktop) */}
            <a data-in href="#estudio" className="hidden min-h-11 items-center gap-4 self-end text-[0.9375rem] lg:inline-flex lg:w-fit">
              <span aria-hidden="true" className="relative block h-12 w-px overflow-hidden bg-white/30">
                <span className="absolute inset-0 animate-scroll-line bg-white" />
              </span>
              {hero.scroll}
            </a>

            {/* Tarjetas glass con cifras */}
            <ul className="grid grid-cols-2 gap-3 lg:order-3 lg:ml-auto lg:w-[15rem] lg:grid-cols-1">
              {hero.stats.map((s) => (
                <li
                  key={s.label}
                  data-in
                  className="rounded-[1.25rem] border border-white/20 bg-white/10 p-4 backdrop-blur-xl lg:rounded-3xl lg:p-5"
                >
                  <p className="font-display text-[clamp(1.75rem,7vw,2.5rem)] font-light leading-none tracking-tight tabular-nums">
                    <span data-counter={s.value} data-counter-manual>{s.value}</span>
                    {s.suffix}
                  </p>
                  <p className="mt-2 text-[0.8125rem] leading-snug text-white/85 lg:text-sm">{s.label}</p>
                </li>
              ))}
            </ul>

            {/* CTA centrado + indicador de scroll (móvil) */}
            <div data-in className="flex items-center gap-3 lg:order-2 lg:justify-center">
              <Magnetic className="block flex-1 lg:inline-block lg:flex-none">
                <Button href={hero.cta.href} variant="light" className="w-full [&>span:first-child]:whitespace-nowrap max-[389px]:gap-2 max-[389px]:pl-5 max-[389px]:text-[0.9375rem] lg:w-auto">
                  {hero.cta.label}
                </Button>
              </Magnetic>
              <a
                href="#estudio"
                aria-label={hero.scroll}
                className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/40 lg:hidden"
              >
                <span aria-hidden="true" className="relative block h-6 w-px overflow-hidden bg-white/30">
                  <span className="absolute inset-0 animate-scroll-line bg-white" />
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
