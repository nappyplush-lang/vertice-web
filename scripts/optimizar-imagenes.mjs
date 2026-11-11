/**
 * Convierte las fotos de public/images a WebP en varios anchos (public/img)
 * y escribe content/fotos.generated.json con sus medidas.
 * Se ejecuta solo antes de `npm run dev` y `npm run build`.
 */
import { createHash } from "node:crypto";
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ORIGEN = "public/images";
const DESTINO = "public/img";
const MANIFIESTO = "content/fotos.generated.json";
const ANCHOS = [640, 1080, 1600, 2400];
const CALIDAD = 82;

await rm(DESTINO, { recursive: true, force: true });
await mkdir(DESTINO, { recursive: true });

const archivos = (await readdir(ORIGEN)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const fotos = {};

for (const archivo of archivos) {
  const datos = await readFile(path.join(ORIGEN, archivo));
  const { width, height } = await sharp(datos).metadata();
  const nombre = path.parse(archivo).name;
  // El hash cambia cuando cambia la foto: así el navegador nunca muestra una versión vieja
  const hash = createHash("sha1").update(datos).digest("hex").slice(0, 8);

  // Nunca se amplía: si el original es más pequeño que un ancho, se usa su ancho real como tope
  const anchos = ANCHOS.filter((a) => a < width);
  if (width <= ANCHOS.at(-1)) anchos.push(width);

  for (const ancho of anchos) {
    await sharp(datos)
      .resize({ width: ancho, withoutEnlargement: true })
      .webp({ quality: CALIDAD, effort: 5 })
      .toFile(path.join(DESTINO, `${nombre}-${hash}-${ancho}.webp`));
  }

  const mini = await sharp(datos).resize({ width: 24 }).webp({ quality: 40 }).toBuffer();
  fotos[archivo] = {
    base: `${nombre}-${hash}`,
    width,
    height,
    widths: anchos,
    blur: `data:image/webp;base64,${mini.toString("base64")}`,
  };
  console.log(`${archivo.padEnd(22)} ${width}×${height} → ${anchos.join(", ")}`);
}

await writeFile(MANIFIESTO, JSON.stringify(fotos, null, 2) + "\n");
console.log(`\n${archivos.length} fotos → ${DESTINO} (WebP, calidad ${CALIDAD})`);
