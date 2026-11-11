import type { Foto } from "@/lib/fotos";
import { fuentes } from "@/lib/fotos";
import { cn } from "@/lib/cn";

type Props = {
  src: Foto;
  alt: string;
  /** Ancho que ocupa la imagen en pantalla (igual que en CSS): decide qué archivo se descarga. */
  sizes: string;
  /** Llena el contenedor (que debe ser `relative` y tener tamaño propio). */
  fill?: boolean;
  /** Imagen visible al cargar: se descarga de inmediato y con prioridad. */
  priority?: boolean;
  className?: string;
};

/** Imagen WebP con srcset/sizes. Reserva su espacio (width/height) para no mover el contenido. */
export default function Img({ src, alt, sizes, fill, priority, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...fuentes(src)}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn(fill && "absolute inset-0 h-full w-full", className)}
    />
  );
}
