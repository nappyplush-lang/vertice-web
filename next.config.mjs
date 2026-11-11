/** Subcarpeta donde se publica el sitio: https://nappyplush-lang.github.io/vertice-web */
const basePath = "/vertice-web";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Sitio 100 % estático (carpeta out/) para GitHub Pages
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  // Las fotos se optimizan antes del build (scripts/optimizar-imagenes.mjs)
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};
export default nextConfig;
