import { site } from "@/content/site";

const { press } = site;

/** Glifos SVG para los logotipos ficticios (se alternan). */
const glyphs = [
  <circle key="a" cx="12" cy="12" r="8" />,
  <path key="b" d="M4 20 12 4l8 16z" />,
  <path key="c" d="M4 4h16v16H4zM4 12h16" />,
  <path key="d" d="M4 18a8 8 0 0 1 16 0M12 4v6" />,
  <path key="e" d="M12 3v18M3 12h18M5.500 5.500l13 13M18.500 5.500l-13 13" />,
  <path key="f" d="M4 6h16M4 12h10M4 18h16" />,
  <path key="g" d="M12 4a8 8 0 1 0 8 8h-8z" />,
];
const styles = [
  "font-display text-2xl font-medium tracking-[-0.03em]",
  "font-display text-xl font-light uppercase tracking-[0.22em]",
  "font-display text-2xl font-semibold tracking-[-0.04em]",
  "font-body text-xl font-medium uppercase tracking-[0.08em]",
];

function Logos({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center">
      {press.items.map((name, i) => (
        <li key={name} className="flex items-center gap-3 whitespace-nowrap px-7 text-carbon/70 lg:px-12">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7" aria-hidden="true">
            {glyphs[i % glyphs.length]}
          </svg>
          <span className={styles[i % styles.length]}>{name}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Prensa() {
  return (
    <section aria-labelledby="prensa-titulo" className="pb-[clamp(5rem,11vw,10rem)]">
      <div className="wrap">
        <h2 id="prensa-titulo" data-fade className="eyebrow">
          {press.eyebrow}
        </h2>
      </div>
      <div
        data-fade
        className="group mt-8 flex overflow-hidden border-y border-carbon/10 py-8 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] lg:py-10"
      >
        <div className="flex w-max animate-marquee will-change-transform group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          <Logos />
          <Logos hidden />
        </div>
      </div>
    </section>
  );
}
