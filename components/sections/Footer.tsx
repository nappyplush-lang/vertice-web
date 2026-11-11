import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import Year from "@/components/ui/Year";
import { site } from "@/content/site";

const { footer, nav, social, contact, brand } = site;

export default function Footer() {
  return (
    <footer id="pie" className="border-t border-carbon/10 pt-[clamp(3.5rem,7vw,6rem)]">
      <div className="wrap">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <a href="#inicio" aria-label={footer.backToTop} className="inline-flex min-h-11 items-center">
              <Logo />
            </a>
            <p className="mt-5 max-w-[32ch] text-piedra-texto">{footer.tagline}</p>
          </div>

          <nav aria-label={footer.navTitle} className="lg:col-span-3">
            <h2 className="text-sm uppercase tracking-[0.16em] text-piedra-texto">{footer.navTitle}</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-6">
              {nav.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="flex min-h-11 items-center transition-colors hover:text-piedra-texto">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="text-sm uppercase tracking-[0.16em] text-piedra-texto">{footer.contactTitle}</h2>
            <ul className="mt-3">
              {[contact.phone, contact.email].map((c) => (
                <li key={c.href}>
                  <a href={c.href} className="flex min-h-11 items-center transition-colors hover:text-piedra-texto">
                    {c.value}
                  </a>
                </li>
              ))}
              <li className="flex min-h-11 items-center text-piedra-texto">
                {contact.address.value}, {contact.address.note}
              </li>
            </ul>
            <ul aria-label={footer.socialTitle} className="mt-4 flex gap-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-carbon/15 transition-colors duration-300 hover:bg-carbon hover:text-hueso"
                  >
                    <Icon name={s.icon} className="h-[1.125rem] w-[1.125rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Firma tipográfica: siempre ocupa el ancho exacto, nunca se desborda */}
        <svg viewBox="0 0 1000 222" aria-hidden="true" className="mt-[clamp(3rem,7vw,6rem)] block h-auto w-full text-carbon/[0.07]">
          <text x="0" y="214" textLength="1000" lengthAdjust="spacingAndGlyphs" fontSize="222" fontWeight="600" fill="currentColor" className="font-display">
            {brand.name}
          </text>
        </svg>

        <div className="flex flex-col gap-2 border-t border-carbon/10 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-[0.9375rem] text-piedra-texto sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <Year /> {brand.fullName}. {footer.rights}
          </p>
          <ul className="flex flex-wrap gap-x-6">
            {footer.legal.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="flex min-h-11 items-center transition-colors hover:text-carbon">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
