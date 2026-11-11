"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import Button from "@/components/ui/Button";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/content/site";
import { lockScroll } from "@/lib/scroll";
import { cn } from "@/lib/cn";

const { nav, social, contact } = site;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(nav.links[0].href);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fondo blur al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta la sección visible
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Menú móvil: bloquea el scroll, aísla el fondo y cierra con Escape
  useEffect(() => {
    lockScroll(open);
    ["contenido", "pie"].forEach((id) => document.getElementById(id)?.toggleAttribute("inert", open));
    if (!open) return;
    menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open]);

  const solid = scrolled && !open;
  const onDark = !solid; // sobre el hero o sobre el menú abierto

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 pt-[max(0.875rem,env(safe-area-inset-top))] lg:pt-5">
        <div className="wrap">
          <div
            className={cn(
              "relative flex items-center justify-between gap-4 rounded-full py-2 pl-4 pr-2 transition-colors duration-500 lg:pl-6",
              onDark ? "text-white" : "text-carbon",
            )}
          >
            {/* Fondo blur (solo opacidad: barato de animar) */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 -z-10 rounded-full border border-carbon/10 bg-hueso/75 shadow-suave backdrop-blur-xl transition-opacity duration-500",
                solid ? "opacity-100" : "opacity-0",
              )}
            />

            <a href="#inicio" aria-label={site.brand.fullName} className="flex min-h-11 items-center" onClick={() => setOpen(false)}>
              <Logo />
            </a>

            <nav aria-label={nav.menuLabel} className="hidden lg:block">
              <ul className="flex items-center gap-1.5">
                {nav.links.map((l) => {
                  const isActive = active === l.href;
                  return (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        aria-current={isActive ? "true" : undefined}
                        className={cn(
                          "flex min-h-11 items-center rounded-full border px-4 text-[0.9375rem] transition-colors duration-300 xl:px-5",
                          onDark
                            ? isActive ? "border-white bg-white text-carbon" : "border-white/40 hover:border-white hover:bg-white/10"
                            : isActive ? "border-carbon bg-carbon text-hueso" : "border-carbon/15 hover:border-carbon/50",
                        )}
                      >
                        {l.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <ul className="mr-1 hidden items-center gap-1.5 xl:flex">
                {social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className={cn(
                        "grid h-11 w-11 place-items-center rounded-full border transition-colors duration-300",
                        onDark ? "border-white/40 hover:bg-white hover:text-carbon" : "border-carbon/15 hover:bg-carbon hover:text-hueso",
                      )}
                    >
                      <Icon name={s.icon} className="h-[1.125rem] w-[1.125rem]" />
                    </a>
                  </li>
                ))}
              </ul>
              <Magnetic className="hidden sm:inline-block">
                <Button href={nav.cta.href} size="sm" variant={onDark ? "light" : "dark"} onClick={() => setOpen(false)}>
                  {nav.cta.label}
                </Button>
              </Magnetic>
              <button
                ref={toggleRef}
                type="button"
                aria-expanded={open}
                aria-controls="menu-movil"
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "flex h-[2.875rem] items-center gap-3 rounded-full border pl-5 pr-4 text-[0.9375rem] font-medium transition-colors duration-300 lg:hidden",
                  onDark ? "border-white/50" : "border-carbon/20",
                )}
              >
                <span>{open ? nav.menuClose : nav.menuOpen}</span>
                <span aria-hidden="true" className="relative block h-3 w-5">
                  <span className={cn("absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-500 ease-expo", open && "translate-y-[5.5px] rotate-45")} />
                  <span className={cn("absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-500 ease-expo", open && "-translate-y-[5.5px] -rotate-45")} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil a pantalla completa */}
      <div
        id="menu-movil"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={nav.menuLabel}
        inert={!open}
        className={cn(
          "fixed inset-0 z-40 flex flex-col overflow-y-auto bg-carbon text-hueso transition-[transform,visibility] duration-700 ease-expo lg:hidden",
          open ? "visible translate-y-0" : "invisible -translate-y-full",
        )}
      >
        <nav aria-label={nav.menuLabel} className="wrap flex flex-1 flex-col justify-center pb-6 pt-28">
          <ul>
            {nav.links.map((l, i) => (
              <li key={l.href} className="overflow-hidden border-b border-white/10">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${180 + i * 60}ms` : "0ms" }}
                  className={cn(
                    "flex items-baseline justify-between py-3 font-display text-[clamp(2.25rem,10.5vw,4rem)] font-light leading-[1.15] tracking-[-0.03em] transition-[transform,opacity] duration-700 ease-expo",
                    open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                  )}
                >
                  <span>{l.label}</span>
                  <span className="font-body text-sm tracking-normal text-hueso/50">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div
          style={{ transitionDelay: open ? "560ms" : "0ms" }}
          className={cn(
            "wrap flex flex-col gap-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] transition-opacity duration-700",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          <Button href={nav.cta.href} variant="light" className="w-full" onClick={() => setOpen(false)}>
            {nav.cta.label}
          </Button>
          <div className="flex items-center justify-between">
            <a href={contact.email.href} className="flex min-h-11 items-center text-base text-hueso/80">
              {contact.email.value}
            </a>
            <ul className="flex gap-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-white/25">
                    <Icon name={s.icon} className="h-[1.125rem] w-[1.125rem]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
