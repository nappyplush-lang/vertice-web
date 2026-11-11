"use client";

/** Año actual, calculado en el navegador para que nunca quede desactualizado. */
export default function Year() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
