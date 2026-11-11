import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/content/site";

const { pillars } = site;

export default function Pilares() {
  return (
    <section aria-labelledby="pilares-titulo" className="pb-[clamp(5rem,11vw,10rem)]">
      <div className="wrap">
        <SectionHeading id="pilares-titulo" eyebrow={pillars.eyebrow} title={pillars.title} />
        <ul data-stagger className="mt-[clamp(2.5rem,5vw,4.5rem)] grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
          {pillars.items.map((p, i) => (
            <li
              key={p.title}
              className="group flex gap-5 rounded-card bg-white p-6 shadow-suave sm:flex-col sm:gap-0 sm:p-8 xl:min-h-[21rem]"
            >
              <div className="flex shrink-0 items-start justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-carbon text-hueso transition-colors duration-500 fine:group-hover:bg-arena fine:group-hover:text-carbon">
                  <Icon name={p.icon} className="h-6 w-6" />
                </span>
                <span aria-hidden="true" className="hidden text-sm text-piedra-texto sm:block">
                  0{i + 1}
                </span>
              </div>
              <div className="sm:mt-auto sm:pt-12">
                <h3 className="font-display text-[1.375rem] font-normal leading-tight tracking-[-0.02em] sm:text-2xl">{p.title}</h3>
                <p className="mt-2.5 text-piedra-texto">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
