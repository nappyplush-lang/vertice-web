import type { ReactNode, SVGProps } from "react";
import type { IconName } from "@/content/site";

const paths: Record<IconName, ReactNode> = {
  arrow: <path d="M7 17 17 7M8 7h9v9" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5V17M8 7.2v.1M12 17v-3.6a2.2 2.2 0 0 1 4.4 0V17M12 10.5V17" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.2 9.3 4.6 2.7-4.6 2.7z" fill="currentColor" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9.2 8.2c-.5 1.3.2 3 1.7 4.6 1.6 1.5 3.300 2.200 4.600 1.700l.5-1.500-1.900-.9-.8.8c-.9-.3-1.900-1.400-2.300-2.300l.8-.8-.9-1.900z" />
    </>
  ),
  calidad: (
    <>
      <path d="M6 4h12l3.500 5L12 20.500 2.500 9z" />
      <path d="M2.500 9h19M9 4 7.500 9 12 20.500 16.500 9 15 4" />
    </>
  ),
  medida: (
    <>
      <path d="M3 20.500 12 4l9 16.500" />
      <path d="M7.500 20.500 12 12.500l4.500 8M3 20.500h18" />
    </>
  ),
  plazos: (
    <>
      <rect x="3.500" y="5" width="17" height="15.500" rx="3" />
      <path d="M3.500 10h17M8 3v4M16 3v4m-7 8 2 2 4-4" />
    </>
  ),
  garantia: (
    <>
      <path d="M12 3 4.500 6v5.500c0 4.500 3 8 7.500 9.500 4.500-1.500 7.500-5 7.500-9.500V6z" />
      <path d="m8.800 12 2.200 2.200 4.200-4.400" />
    </>
  ),
  telefono: (
    <path d="M5 4h3.500l1.500 4.500-2 1.500a12 12 0 0 0 6 6l1.500-2 4.500 1.500V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7.500 8 6 8-6" />
    </>
  ),
  ubicacion: (
    <>
      <path d="M12 21.500s7-6.200 7-11.500a7 7 0 1 0-14 0c0 5.300 7 11.500 7 11.500Z" />
      <circle cx="12" cy="10" r="2.500" />
    </>
  ),
  horario: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.500l3.500 2" />
    </>
  ),
};

type Props = SVGProps<SVGSVGElement> & { name: IconName };

export default function Icon({ name, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
