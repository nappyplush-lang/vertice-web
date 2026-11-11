/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [85],
    deviceSizes: [360, 430, 640, 768, 1024, 1280, 1440, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
  },
};
export default nextConfig;
