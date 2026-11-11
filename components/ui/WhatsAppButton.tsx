"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { site, whatsappUrl } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Botón flotante de WhatsApp. Se oculta sobre el hero, el formulario y el
 * footer para no tapar botones ni contenido. En móvil además se retira al
 * bajar y reaparece al subir, así nunca queda encima de lo que se está leyendo.
 */
export default function WhatsAppButton() {
  const [clear, setClear] = useState(false); // fuera de hero / contacto / footer
  const [idle, setIdle] = useState(true); // en móvil se retira mientras se baja leyendo

  useEffect(() => {
    const zones = ["#inicio", "#contacto", "#pie"].map((s) => document.querySelector(s)).filter(Boolean) as Element[];
    const inView = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? inView.add(e.target) : inView.delete(e.target)));
        setClear(inView.size === 0);
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    zones.forEach((z) => io.observe(z));

    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 12) return;
      setIdle(y < last || window.matchMedia("(min-width: 1024px)").matches);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const visible = clear && idle;

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={site.contact.whatsapp.label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      data-cursor="WhatsApp"
      className={cn(
        "fixed z-40 grid h-14 w-14 place-items-center rounded-full bg-carbon text-hueso shadow-[0_10px_30px_-8px_rgb(20_20_20/0.5)] ring-1 ring-white/15 transition-[transform,opacity] duration-500 ease-expo",
        "bottom-[calc(1rem+env(safe-area-inset-bottom))] right-[calc(1rem+env(safe-area-inset-right))] lg:bottom-8 lg:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Icon name="whatsapp" className="h-6 w-6" />
      <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-carbon bg-[#25D366]" />
    </a>
  );
}
