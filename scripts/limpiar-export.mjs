/** Los originales de public/images no se publican: el sitio solo usa los WebP de /img. */
import { rm } from "node:fs/promises";
await rm("out/images", { recursive: true, force: true });
