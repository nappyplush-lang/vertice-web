import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.brand.fullName,
    short_name: site.brand.name,
    description: site.seo.description,
    start_url: "/",
    display: "browser",
    background_color: "#F7F5F2",
    theme_color: "#F7F5F2",
    icons: [{ src: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
  };
}
