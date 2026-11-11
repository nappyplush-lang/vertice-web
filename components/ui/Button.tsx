import type { ReactNode } from "react";
import Icon from "./Icon";
import { cn } from "@/lib/cn";

const variants = {
  dark: { base: "bg-carbon text-hueso hover:bg-carbon/90", dot: "bg-hueso text-carbon" },
  light: { base: "bg-white text-carbon hover:bg-hueso", dot: "bg-carbon text-hueso" },
  outline: { base: "border border-carbon/20 text-carbon hover:border-carbon/50", dot: "bg-carbon text-hueso" },
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: keyof typeof variants;
  className?: string;
  type?: "button" | "submit";
  external?: boolean;
  size?: "md" | "sm";
  onClick?: () => void;
  cursor?: string;
};

/** Botón pill con la flecha ↗ dentro de un círculo. */
export default function Button({ children, href, variant = "dark", className, type = "button", external, size = "md", onClick }: Props) {
  const v = variants[variant];
  const cls = cn(
    "group/btn inline-flex items-center justify-between gap-4 rounded-full font-medium transition-colors duration-300",
    size === "md" ? "min-h-[3.5rem] py-1.5 pl-7 pr-1.5 text-base" : "min-h-[2.875rem] py-1 pl-5 pr-1 text-[0.9375rem]",
    v.base,
    className,
  );
  const dot = cn(
    "relative grid shrink-0 place-items-center overflow-hidden rounded-full",
    size === "md" ? "h-11 w-11" : "h-[2.375rem] w-[2.375rem]",
    v.dot,
  );
  const inner = (
    <>
      <span>{children}</span>
      <span className={dot}>
        <Icon name="arrow" className="h-[1.125rem] w-[1.125rem] transition-transform duration-500 ease-expo group-hover/btn:-translate-y-7 group-hover/btn:translate-x-7" />
        <Icon name="arrow" className="absolute h-[1.125rem] w-[1.125rem] -translate-x-7 translate-y-7 transition-transform duration-500 ease-expo group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
      </span>
    </>
  );
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {inner}
    </button>
  );
}
