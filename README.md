# VÉRTICE — Estudio de Arquitectura

Landing one-page. Next.js 15 (App Router) + TypeScript + Tailwind CSS + GSAP/ScrollTrigger + Lenis.

```bash
npm install
npm run dev      # http://localhost:3000/vertice-web
npm run build    # genera el sitio estático en out/
```

## Cambiar textos, cifras, proyectos y contacto

Todo está en **un solo archivo: `content/site.ts`**. Ningún componente tiene texto escrito a mano.

- Nombre del estudio: `brand` y `hero.word` (el nombre gigante del hero).
- WhatsApp: `whatsappNumber` (solo dígitos, con indicativo: `573001234567`).
- Dirección pública: `url` (la usan el SEO, el sitemap y Open Graph).
- Proyectos, servicios, pasos, testimonios: son listas; agrega o quita elementos y el diseño se adapta.

## Cambiar imágenes

Reemplaza los archivos de `public/images/` **conservando el mismo nombre**. No hay que tocar código:
al hacer push a `main` el sitio se vuelve a generar con la foto nueva.

| Archivo | Dónde aparece | Tamaño mínimo | Proporción |
|---|---|---|---|
| `hero.jpg` | Fondo del hero en computador (paisaje/cielo) | 2560 × 1440 | 16:9 |
| `hero-casa.png` | La casa recortada, **fondo transparente**. Va delante del nombre gigante (computador y celular) | 2752 × 1536 | 16:9 |
| `hero-mobile.jpg` | Fondo del hero en celular | 1440 × 2560 | 9:16 |
| `estudio.jpg` | Sección "El estudio" | 2400 × 1350 | 16:9 |
| `servicio-1.jpg` … `servicio-5.jpg` | Servicios (imagen flotante / acordeón) | 1600 × 2000 | 4:5 |
| `proyecto-1.jpg` … `proyecto-6.jpg` | Tarjetas de proyectos | 1600 × 2000 | 4:5 |
| `interior.jpg` | Sección oscura de cifras | 1600 × 2000 | 4:5 |
| `testimonio-1.jpg` … `testimonio-4.jpg` | Retratos de testimonios | 800 × 800 | 1:1 |

Notas del hero:

- El hero tiene 3 capas: fondo (`hero.jpg` / `hero-mobile.jpg`) → nombre gigante → `hero-casa.png`.
  La casa se apoya sobre la franja de niebla del fondo, con sombra de contacto, tinte cálido y niebla en la base.
- Tamaño y posición de la casa: variables `--casa-w` (ancho), `--casa-base` (altura de la base) y `--casa-x`
  en `app/globals.css`, bloque `.hero-scene` (celular, tablet y computador por separado).
- Si reemplazas `hero-casa.png`, conserva un margen transparente parecido (~10 % alrededor de la casa);
  si el margen cambia, ajusta esas variables.
- Sin casa recortada: en `site.ts` pon `casa: null` y borra el import `heroCasa`.
- Si cambias un nombre o un formato (por ejemplo `.jpg` → `.png`), cámbialo también en `site.ts`.

Antes de cada build, `scripts/optimizar-imagenes.mjs` convierte cada foto a WebP (calidad 82) en anchos de
640, 1080, 1600 y 2400 px, sin ampliar nunca el original, y el navegador descarga el que corresponde a la
pantalla (`srcset`/`sizes`). Por eso conviene subir los originales grandes: una foto de 896 px solo genera
640 y 896.

## Cambiar colores y tipografías

- **Colores:** `app/globals.css`, bloque `:root` (valores R G B). Cambian en todo el sitio.
- **Fuentes:** `app/layout.tsx` (Manrope para títulos, Inter para textos, vía `next/font`).
- Radios, sombras y animaciones base: `tailwind.config.ts`.

## Estructura

```
app/                 layout (SEO, fuentes, schema.org), page, sitemap, robots, icono, Open Graph
content/site.ts      ← contenido
components/sections/ una sección por archivo (Navbar, Hero, Manifiesto, Pilares, Servicios,
                     Proyectos, Cifras, Proceso, Testimonios, Prensa, Contacto, Footer)
scripts/             optimización de fotos a WebP (se ejecuta sola)
components/ui/       Button, Icon, Logo, Img, RevealImage, Magnetic, Cursor, Preloader, WhatsAppButton
components/providers SmoothScroll (Lenis) y ScrollEffects (animaciones por atributos data-*)
lib/                 gsap, scroll, ready
```

Animaciones reutilizables: añade a cualquier elemento `data-split` (título línea por línea),
`data-fade`, `data-stagger`, `data-counter="150"`; o usa `<RevealImage>` para imágenes.

## Formulario

No usa servidor: valida los campos y abre WhatsApp con el mensaje armado hacia `whatsappNumber`.

## Publicación en GitHub Pages

Dirección: https://nappyplush-lang.github.io/vertice-web

Cada push a `main` ejecuta `.github/workflows/pages.yml`: instala, compila y publica la carpeta `out/`.
En el repositorio debe estar **Settings → Pages → Source: GitHub Actions**.

El sitio vive en la subcarpeta `/vertice-web`. Si cambia el nombre del repositorio o se usa un dominio propio,
hay que cambiar `basePath` en `next.config.mjs` y `url` en `content/site.ts`.

Las carpetas `imagenes/` y `referencias/` guardan los originales y las referencias de diseño; el sitio no las usa.
