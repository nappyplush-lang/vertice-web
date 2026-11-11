/**
 * ─────────────────────────────────────────────────────────────
 *  CONTENIDO DEL SITIO — este es el ÚNICO archivo que hay que editar
 *  para cambiar textos, cifras, proyectos, imágenes y contacto.
 * ─────────────────────────────────────────────────────────────
 *  Imágenes: reemplaza los archivos en /public/images conservando
 *  el mismo nombre. Si cambias un nombre, cambia también su import.
 */
import type { StaticImageData } from "next/image";

import hero from "@/public/images/hero.jpg";
import heroMobile from "@/public/images/hero-mobile.jpg";
import heroCasa from "@/public/images/hero-casa.png";
import estudio from "@/public/images/estudio.jpg";
import interior from "@/public/images/interior.jpg";
import servicio1 from "@/public/images/servicio-1.jpg";
import servicio2 from "@/public/images/servicio-2.jpg";
import servicio3 from "@/public/images/servicio-3.jpg";
import servicio4 from "@/public/images/servicio-4.jpg";
import servicio5 from "@/public/images/servicio-5.jpg";
import proyecto1 from "@/public/images/proyecto-1.jpg";
import proyecto2 from "@/public/images/proyecto-2.jpg";
import proyecto3 from "@/public/images/proyecto-3.jpg";
import proyecto4 from "@/public/images/proyecto-4.jpg";
import proyecto5 from "@/public/images/proyecto-5.jpg";
import proyecto6 from "@/public/images/proyecto-6.jpg";
import testimonio1 from "@/public/images/testimonio-1.jpg";
import testimonio2 from "@/public/images/testimonio-2.jpg";
import testimonio3 from "@/public/images/testimonio-3.jpg";
import testimonio4 from "@/public/images/testimonio-4.jpg";

export type IconName =
  | "arrow" | "arrowDown" | "arrowLeft" | "arrowRight" | "plus" | "check"
  | "instagram" | "linkedin" | "youtube" | "whatsapp"
  | "calidad" | "medida" | "plazos" | "garantia"
  | "telefono" | "email" | "ubicacion" | "horario";

export type Img = { src: StaticImageData; alt: string };

const whatsappNumber = "573000000000"; // solo dígitos, con indicativo del país

export const site = {
  /** Dominio final (se usa en SEO, sitemap y Open Graph). */
  url: "https://vertice-estudio.vercel.app",

  brand: {
    name: "VÉRTICE",
    descriptor: "Estudio de Arquitectura",
    fullName: "VÉRTICE Estudio de Arquitectura",
  },

  seo: {
    title: "VÉRTICE — Estudio de Arquitectura de lujo",
    description:
      "Diseñamos y construimos casas contemporáneas a medida: arquitectura residencial, interiorismo y paisajismo con garantía de 10 años.",
    locale: "es_CO",
    priceRange: "$$$$",
    geo: { latitude: 6.2086, longitude: -75.5659 },
  },

  nav: {
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Estudio", href: "#estudio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Proceso", href: "#proceso" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: { label: "Consultoría", href: "#contacto" },
    menuOpen: "Menú",
    menuClose: "Cerrar",
    menuLabel: "Menú principal",
    skip: "Saltar al contenido",
  },

  social: [
    { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
    { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
    { label: "YouTube", href: "https://youtube.com/", icon: "youtube" },
  ] as { label: string; href: string; icon: IconName }[],

  contact: {
    phone: { label: "Teléfono", value: "+57 300 000 0000", href: "tel:+573000000000", note: "Llamadas y WhatsApp" },
    email: { label: "Email", value: "hola@tudominio.com", href: "mailto:hola@tudominio.com", note: "Respondemos en menos de 24 horas" },
    address: {
      label: "Estudio",
      value: "Calle 10 # 00-00, El Poblado",
      note: "Medellín, Colombia",
      href: "https://maps.google.com/?q=El+Poblado+Medellin",
      street: "Calle 10 # 00-00",
      city: "Medellín",
      region: "Antioquia",
      country: "CO",
    },
    hours: { label: "Horario", value: "Lunes a viernes, 8:00 a 18:00", note: "Sábados con cita previa", schema: "Mo-Fr 08:00-18:00" },
    whatsapp: {
      number: whatsappNumber,
      label: "Escríbenos por WhatsApp",
      message: "Hola VÉRTICE, quiero una consultoría para mi proyecto.",
    },
  },

  hero: {
    word: "VÉRTICE",
    headline: "Diseñamos espacios que combinan estética y función",
    aside: "Diseñando la vida del futuro",
    cta: { label: "Agenda tu consultoría", href: "#contacto" },
    scroll: "Desliza",
    image: {
      desktop: hero,
      mobile: heroMobile,
      alt: "Colinas cubiertas de niebla al amanecer, con una casa contemporánea de líneas curvas diseñada por VÉRTICE",
    },
    /**
     * Casa recortada (PNG con fondo transparente). Se coloca DELANTE del nombre
     * gigante, apoyada sobre la niebla; la misma imagen sirve para celular.
     * Tamaño y posición: variables `--casa-*` en app/globals.css.
     * Si no la tienes: pon `casa: null` y borra su import de arriba.
     */
    casa: heroCasa as StaticImageData | null,
    stats: [
      { value: 12, suffix: "+", label: "Años diseñando y construyendo casas de autor" },
      { value: 150, suffix: "+", label: "Casas entregadas en ocho departamentos" },
    ],
  },

  manifesto: {
    eyebrow: "El estudio",
    text: "Creemos que una casa no se decora: se piensa. Cada línea que trazamos responde a la luz, al terreno y a la forma en que vives. Por eso proyectamos pocas casas al año, y cada una como si fuera la nuestra.",
    image: { src: estudio, alt: "Estudio de VÉRTICE: mesa larga con maquetas y dos arquitectos revisando planos junto a los ventanales" } as Img,
    body: "Somos un equipo de arquitectos, interioristas y constructores que acompaña cada proyecto de principio a fin: desde la primera visita al lote hasta el día en que recibes las llaves.",
    facts: [
      { label: "Fundado en", value: "2012" },
      { label: "Equipo", value: "24 personas" },
      { label: "Sede", value: "Medellín" },
    ],
    cta: { label: "Conoce el proceso", href: "#proceso" },
  },

  pillars: {
    eyebrow: "Por qué VÉRTICE",
    title: "Cuatro compromisos que no negociamos",
    items: [
      { icon: "calidad", title: "Calidad premium", text: "Materiales nobles y técnicas probadas, seleccionados para envejecer bien." },
      { icon: "medida", title: "Proyectos a medida", text: "Diseñamos para tu forma de vivir y para tu lote. Nunca desde un catálogo." },
      { icon: "plazos", title: "Cumplimos plazos", text: "Cronograma transparente, con hitos claros y reportes de avance semanales." },
      { icon: "garantia", title: "Garantía de 10 años", text: "Respaldo extendido sobre estructura y acabados, por escrito." },
    ] as { icon: IconName; title: string; text: string }[],
  },

  services: {
    eyebrow: "Servicios",
    title: "Todo lo que tu casa necesita, bajo una sola dirección",
    hint: "Consultar",
    items: [
      { title: "Arquitectura residencial", text: "Casas nuevas diseñadas desde cero: implantación, volumetría, planos y licencias.", image: { src: servicio1, alt: "Villa contemporánea en ladera con piscina y terrazas iluminadas al atardecer" } },
      { title: "Interiorismo", text: "Espacios interiores coherentes con la arquitectura: materiales, mobiliario, iluminación y arte.", image: { src: servicio2, alt: "Sala minimalista de doble altura con panelería de roble, sofá curvo y ventanal al jardín" } },
      { title: "Paisajismo", text: "Jardines, terrazas y espejos de agua que integran la casa con su entorno.", image: { src: servicio3, alt: "Jardín con sendero de piedra junto a una casa moderna" } },
      { title: "Remodelaciones", text: "Transformamos casas existentes respetando su carácter y actualizando su desempeño.", image: { src: servicio4, alt: "Cocina remodelada con isla de piedra natural" } },
      { title: "Consultoría", text: "Análisis de lote, viabilidad normativa y presupuesto antes de que compres o construyas.", image: { src: servicio5, alt: "Arquitectos revisando planos y una maqueta junto a muestras de madera" } },
    ] as { title: string; text: string; image: Img }[],
  },

  projects: {
    eyebrow: "Proyectos destacados",
    title: "Casas que hemos construido",
    hint: "Desliza para ver más",
    labels: { rooms: "hab.", baths: "baños", area: "m²", regionLabel: "Proyectos destacados" },
    items: [
      { name: "Casa Bruma", location: "La Calera, Cundinamarca", area: 420, rooms: 4, baths: 5, year: 2024, image: { src: proyecto1, alt: "Casa Bruma: volúmenes de vidrio, madera y acero entre pinos y niebla, a la hora azul" } },
      { name: "Casa Horizonte", location: "Santa Marta, Magdalena", area: 510, rooms: 5, baths: 6, year: 2024, image: { src: proyecto2, alt: "Casa Horizonte: villa sobre un acantilado con piscina infinita frente al mar" } },
      { name: "Edificio Ceiba", location: "El Poblado, Medellín", area: 310, rooms: 3, baths: 4, year: 2023, image: { src: proyecto3, alt: "Edificio Ceiba: edificio residencial boutique de piedra clara con balcones iluminados" } },
      { name: "Edificio Travertino", location: "Rosales, Bogotá", area: 280, rooms: 3, baths: 3, year: 2023, image: { src: proyecto4, alt: "Edificio Travertino: fachada de travertino y madera reflejada en un espejo de agua" } },
      { name: "Casa Mirador", location: "Llanogrande, Antioquia", area: 365, rooms: 4, baths: 4, year: 2022, image: { src: proyecto5, alt: "Casa Mirador: voladizo de concreto y madera sobre una piscina con fogón exterior" } },
      { name: "Casa Laguna", location: "Guatapé, Antioquia", area: 440, rooms: 4, baths: 5, year: 2022, image: { src: proyecto6, alt: "Casa Laguna: casa blanca de formas curvas con piscina orgánica junto a un lago" } },
    ] as { name: string; location: string; area: number; rooms: number; baths: number; year: number; image: Img }[],
  },

  stats: {
    eyebrow: "En cifras",
    title: "Construimos casas de las que nos sentimos orgullosos",
    image: { src: interior, alt: "Sala de doble altura de noche, con chimenea encendida, muros de madera y ventanal al bosque" } as Img,
    items: [
      { value: 12, suffix: "+", label: "Años de experiencia", note: "Construyendo desde 2012" },
      { value: 150, suffix: "+", label: "Casas construidas", note: "En ocho departamentos" },
      { value: 98, suffix: "%", label: "Clientes satisfechos", note: "Nos recomiendan" },
      { value: 10, suffix: "", label: "Años de garantía", note: "En estructura y acabados" },
    ],
  },

  process: {
    eyebrow: "Proceso",
    title: "Cinco pasos, ninguna sorpresa",
    intro: "Un método claro para que sepas siempre en qué etapa está tu casa, cuánto falta y qué decisiones siguen.",
    steps: [
      { title: "Consulta", time: "Semana 1", text: "Visitamos el lote, escuchamos tu idea y definimos alcance y presupuesto." },
      { title: "Concepto", time: "3 a 4 semanas", text: "Primeros trazos, volumetría y referencias. Eliges el rumbo del proyecto." },
      { title: "Diseño", time: "8 a 12 semanas", text: "Planos completos, renders, materiales e ingenierías listos para construir." },
      { title: "Construcción", time: "8 a 14 meses", text: "Dirección de obra propia, con reportes semanales y visitas guiadas." },
      { title: "Entrega", time: "Día de llaves", text: "Recorrido final, manual de la casa y acompañamiento durante la garantía." },
    ],
  },

  testimonials: {
    eyebrow: "Testimonios",
    title: "Lo que dicen quienes ya viven en su casa",
    prev: "Testimonio anterior",
    next: "Testimonio siguiente",
    items: [
      { quote: "Llegamos con una carpeta de referencias y salimos con una casa que no se parece a ninguna. Entendieron cómo vivimos antes de dibujar una sola línea.", name: "Laura Restrepo", project: "Casa Mirador", image: { src: testimonio1, alt: "Retrato de Laura Restrepo" } },
      { quote: "Cumplieron cada fecha del cronograma. Después de dos obras anteriores con otras firmas, eso para nosotros valía más que cualquier render.", name: "Andrés Villegas", project: "Casa Bruma", image: { src: testimonio2, alt: "Retrato de Andrés Villegas" } },
      { quote: "Vivíamos fuera del país durante la obra y nunca sentimos que perdíamos el control. Cada semana sabíamos exactamente qué había pasado.", name: "Felipe y Carolina Duque", project: "Casa Horizonte", image: { src: testimonio3, alt: "Retrato de Felipe y Carolina Duque" } },
      { quote: "El nivel de detalle es obsesivo. Tres años después, la casa se ve mejor que el día que nos la entregaron.", name: "Mariana Ochoa", project: "Casa Laguna", image: { src: testimonio4, alt: "Retrato de Mariana Ochoa" } },
    ] as { quote: string; name: string; project: string; image: Img }[],
  },

  press: {
    eyebrow: "Premios y prensa",
    title: "Reconocimientos",
    items: ["Bienal Andina", "Revista Umbral", "Premio Canto Rodado", "Hábitat Hoy", "Atlas de Casas", "Trazo Awards", "Anuario Sur"],
  },

  cta: {
    eyebrow: "¿Hablamos de tu proyecto?",
    title: "Construyamos la casa de tus sueños",
    text: "Cuéntanos qué tienes en mente. Un arquitecto del estudio te contactará para una primera consultoría sin costo.",
  },

  form: {
    title: "Solicita tu consultoría",
    fields: {
      nombre: { label: "Nombre", placeholder: "Tu nombre completo", error: "Escribe tu nombre." },
      email: { label: "Email", placeholder: "tu@correo.com", error: "Escribe un email válido." },
      telefono: { label: "Teléfono", placeholder: "+57 300 000 0000", error: "Escribe un teléfono válido." },
      tipo: {
        label: "Tipo de proyecto", placeholder: "Selecciona una opción", error: "Elige el tipo de proyecto.",
        options: ["Casa nueva", "Interiorismo", "Paisajismo", "Remodelación", "Consultoría"],
      },
      presupuesto: {
        label: "Presupuesto estimado", placeholder: "Selecciona un rango", error: "Elige un rango de presupuesto.",
        options: ["Menos de USD 150.000", "USD 150.000 a 300.000", "USD 300.000 a 600.000", "Más de USD 600.000", "Aún no lo sé"],
      },
      mensaje: { label: "Cuéntanos sobre tu proyecto", placeholder: "Ubicación del lote, área aproximada, fechas…", error: "Cuéntanos un poco más (mínimo 10 caracteres)." },
    },
    submit: "Enviar por WhatsApp",
    privacy: "Al enviar se abrirá WhatsApp con tu mensaje listo. No guardamos tus datos en este sitio.",
    errorSummary: "Revisa los campos marcados para poder enviar.",
    success: {
      title: "Tu mensaje está listo",
      text: "Abrimos WhatsApp con los datos de tu proyecto. Solo falta que presiones enviar.",
      retry: "¿No se abrió? Abrir WhatsApp",
      reset: "Enviar otro mensaje",
    },
    /** Encabezado del mensaje que llega por WhatsApp. */
    messageIntro: "Hola VÉRTICE, quiero una consultoría.",
  },

  footer: {
    tagline: "Arquitectura residencial de autor, diseñada y construida en Colombia.",
    navTitle: "Navegación",
    socialTitle: "Síguenos",
    contactTitle: "Contacto",
    legal: [
      { label: "Política de privacidad", href: "#" },
      { label: "Términos y condiciones", href: "#" },
    ],
    rights: "Todos los derechos reservados.",
    backToTop: "Volver arriba",
  },
};

export const whatsappUrl = (text: string = site.contact.whatsapp.message) =>
  `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
