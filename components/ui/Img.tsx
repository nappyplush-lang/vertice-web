import NextImage, { type ImageProps } from "next/image";

/**
 * next/image con la calidad del proyecto (85).
 * El placeholder "blur" se reserva para el hero: en muchas imágenes a la vez
 * su filtro SVG bloquea el hilo principal. Aquí el contenedor reserva el
 * espacio con un fondo neutro (sin saltos de layout).
 */
export default function Img(props: ImageProps) {
  return <NextImage quality={85} {...props} />;
}
