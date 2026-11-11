import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = site.seo.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen para compartir en redes, generada con la marca. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#141414", color: "#F7F5F2", padding: 72 }}>
        <svg width="72" height="72" viewBox="0 0 32 32" fill="none" stroke="#B8916A" strokeWidth="1.75">
          <path d="M3 27 16 5l13 22" />
          <path d="M10.500 27 16 17.500 21.500 27" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 150, letterSpacing: 18, lineHeight: 1 }}>{site.brand.name}</div>
          <div style={{ fontSize: 36, marginTop: 24, color: "#B8B3AC" }}>{site.hero.headline}</div>
        </div>
      </div>
    ),
    size,
  );
}
