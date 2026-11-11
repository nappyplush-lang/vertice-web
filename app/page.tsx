import Preloader from "@/components/ui/Preloader";
import Cursor from "@/components/ui/Cursor";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollEffects from "@/components/providers/ScrollEffects";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Manifiesto from "@/components/sections/Manifiesto";
import Pilares from "@/components/sections/Pilares";
import Servicios from "@/components/sections/Servicios";
import Proyectos from "@/components/sections/Proyectos";
import Cifras from "@/components/sections/Cifras";
import Proceso from "@/components/sections/Proceso";
import Testimonios from "@/components/sections/Testimonios";
import Prensa from "@/components/sections/Prensa";
import Contacto from "@/components/sections/Contacto";
import Footer from "@/components/sections/Footer";
import { site } from "@/content/site";

export default function Page() {
  return (
    <>
      <a
        href="#contenido"
        className="fixed left-4 top-4 z-[110] -translate-y-24 rounded-full bg-carbon px-5 py-3 text-hueso transition-transform focus:translate-y-0"
      >
        {site.nav.skip}
      </a>
      <Preloader />
      <SmoothScroll />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Manifiesto />
        <Pilares />
        <Servicios />
        <Proyectos />
        <Cifras />
        <Proceso />
        <Testimonios />
        <Prensa />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppButton />
      <Cursor />
      {/* Debe ir al final: registra las animaciones cuando todas las secciones ya existen */}
      <ScrollEffects />
    </>
  );
}
