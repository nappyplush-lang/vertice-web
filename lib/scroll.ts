import type Lenis from "lenis";

/** Instancia de Lenis (solo existe en escritorio con mouse). */
let lenis: Lenis | null = null;
export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export function lockScroll(lock: boolean) {
  document.documentElement.classList.toggle("scroll-locked", lock);
  if (lock) lenis?.stop();
  else lenis?.start();
}

export function scrollToTarget(selector: string) {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView();
}
