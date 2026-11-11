import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = { eyebrow: string; title: string; id?: string; children?: ReactNode; className?: string; dark?: boolean };

/** Encabezado estándar de sección: etiqueta pequeña + título grande animado. */
export default function SectionHeading({ eyebrow, title, id, children, className, dark }: Props) {
  return (
    <div className={cn("grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8", className)}>
      <div className="lg:col-span-8">
        <p data-fade className={cn("eyebrow", dark && "text-hueso/70")}>{eyebrow}</p>
        <h2 id={id} data-split className="h2 mt-5 max-w-[18ch]">
          {title}
        </h2>
      </div>
      {children ? <div data-fade className="lg:col-span-4 lg:pb-2">{children}</div> : null}
    </div>
  );
}
