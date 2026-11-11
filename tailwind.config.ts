import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

// Los colores viven como variables CSS en app/globals.css (:root).
const color = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        hueso: color("hueso"),
        carbon: color("carbon"),
        piedra: color("piedra"),
        "piedra-texto": color("piedra-texto"),
        arena: color("arena"),
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: { card: "1.75rem", panel: "2rem" },
      boxShadow: {
        suave: "0 1px 2px rgb(20 20 20 / 0.04), 0 12px 40px -12px rgb(20 20 20 / 0.08)",
      },
      transitionTimingFunction: { expo: "cubic-bezier(0.16, 1, 0.3, 1)" },
      keyframes: {
        marquee: { to: { transform: "translate3d(-50%, 0, 0)" } },
        "scroll-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        nudge: { "0%,100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(6px)" } },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "scroll-line": "scroll-line 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        nudge: "nudge 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      // Dispositivos con mouse real
      addVariant("fine", "@media (hover: hover) and (pointer: fine)");
      // Escritorio con mouse: activa efectos de hover avanzados
      addVariant("desk", "@media (min-width: 1024px) and (hover: hover) and (pointer: fine)");
    }),
  ],
};
export default config;
