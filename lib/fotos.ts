import manifiesto from "@/content/fotos.generated.json";

/** Una foto de public/images ya convertida a WebP en varios anchos. */
export type Foto = { base: string; width: number; height: number; widths: number[]; blur: string };

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const fotos = manifiesto as Record<string, Foto>;

/** Busca una foto por su nombre de archivo en public/images (por ejemplo "proyecto-1.jpg"). */
export function foto(archivo: string): Foto {
  const f = fotos[archivo];
  if (!f) throw new Error(`Falta la foto public/images/${archivo}`);
  return f;
}

/** Ruta de un archivo de /public teniendo en cuenta la subcarpeta del sitio. */
export const ruta = (p: string) => `${BASE}${p}`;

const url = (f: Foto, ancho: number) => ruta(`/img/${f.base}-${ancho}.webp`);

/** Atributos src/srcset: el navegador elige el ancho según la pantalla y `sizes`. */
export function fuentes(f: Foto) {
  return {
    src: url(f, f.widths[f.widths.length - 1]),
    srcSet: f.widths.map((a) => `${url(f, a)} ${a}w`).join(", "),
    width: f.width,
    height: f.height,
  };
}
