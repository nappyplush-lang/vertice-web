import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { ruta } from "@/lib/fotos";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand.fullName,
    short_name: site.brand.name,
    description: site.seo.description,
    start_url: ruta("/"),
    display: "browser",
    background_color: "#F7F5F2",
    theme_color: "#F7F5F2",
    icons: [{ src: ruta("/icon.svg"), type: "image/svg+xml", sizes: "any" }],
  };
}
