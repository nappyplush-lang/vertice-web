import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/** Isotipo: dos ángulos concéntricos que forman un vértice. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinejoin="miter" aria-hidden="true" className={className}>
      <path d="M3 27 16 5l13 22" />
      <path d="M10.500 27 16 17.500 21.500 27" />
    </svg>
  );
}

export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-7 w-7 shrink-0" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-[0.2em]">{site.brand.name}</span>
        <span className="mt-1 hidden text-[0.6875rem] tracking-[0.04em] opacity-70 sm:block">{site.brand.descriptor}</span>
      </span>
    </span>
  );
}
