import RevealImage from "@/components/ui/RevealImage";
import { site } from "@/content/site";

const { stats } = site;

/** Única sección oscura del sitio. */
export default function Cifras() {
  return (
    <section aria-labelledby="cifras-titulo" className="section">
      <div className="wrap">
        <div className="grid overflow-hidden rounded-panel bg-carbon text-hueso lg:grid-cols-12">
          <div className="flex flex-col p-7 sm:p-10 lg:col-span-7 lg:p-14 xl:p-16">
            <p data-fade className="eyebrow text-hueso/70">{stats.eyebrow}</p>
            <h2 id="cifras-titulo" data-split className="h2 mt-5 max-w-[15ch] [font-size:clamp(2rem,4.2vw,3.75rem)]">
              {stats.title}
            </h2>
            <ul data-stagger className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:mt-auto lg:pt-16 min-[1400px]:grid-cols-4 min-[1400px]:gap-x-0">
              {stats.items.map((s, i) => (
                <li key={s.label} className={i ? "min-[1400px]:border-l min-[1400px]:border-white/15 min-[1400px]:pl-6" : "min-[1400px]:pr-2"}>
                  <p className="font-display font-light leading-none tracking-[-0.04em] tabular-nums [font-size:clamp(2.75rem,4vw,3.5rem)]">
                    <span data-counter={s.value}>{s.value}</span>
                    <span className="text-arena">{s.suffix}</span>
                  </p>
                  <p className="mt-3 text-base">{s.label}</p>
                  <p className="mt-1 text-sm text-hueso/60">{s.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="p-2 pt-0 lg:col-span-5 lg:p-3 lg:pl-0">
            <RevealImage image={stats.image} sizes="(min-width: 1024px) 38vw, 92vw" className="aspect-[4/3] h-full rounded-[1.5rem] lg:aspect-auto lg:min-h-[34rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
