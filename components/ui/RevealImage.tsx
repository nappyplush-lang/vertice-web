import Img from "./Img";
import type { Img as ImgData } from "@/content/site";
import { cn } from "@/lib/cn";

type Props = { image: ImgData; sizes: string; className?: string; parallax?: boolean };

/** Imagen con reveal (clip-path) al entrar en pantalla y parallax suave opcional. */
export default function RevealImage({ image, sizes, className, parallax = true }: Props) {
  return (
    <div data-reveal className={cn("relative overflow-hidden rounded-card bg-carbon/5", className)}>
      <div data-reveal-inner className="absolute inset-0">
        <div {...(parallax ? { "data-parallax": "" } : {})} className={cn("absolute inset-x-0", parallax ? "-inset-y-[7%]" : "inset-y-0")}>
          <Img src={image.src} alt={image.alt} fill sizes={sizes} className="object-cover" />
        </div>
      </div>
    </div>
  );
}
