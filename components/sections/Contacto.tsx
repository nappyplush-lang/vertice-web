"use client";

import { useRef, useState, type FormEvent } from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { site, whatsappUrl, type IconName } from "@/content/site";
import { cn } from "@/lib/cn";

const { cta, form, contact } = site;
const f = form.fields;

type Field = keyof typeof f;
type Values = Record<Field, string>;
const empty: Values = { nombre: "", email: "", telefono: "", tipo: "", presupuesto: "", mensaje: "" };
const order = Object.keys(empty) as Field[];

const rules: Record<Field, (v: string) => boolean> = {
  nombre: (v) => v.trim().length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  telefono: (v) => v.replace(/\D/g, "").length >= 7,
  tipo: (v) => v !== "",
  presupuesto: (v) => v !== "",
  mensaje: (v) => v.trim().length >= 10,
};

const inputCls =
  "h-14 w-full rounded-2xl border border-carbon/15 bg-hueso px-4 text-base text-carbon placeholder:text-piedra transition-colors duration-300 hover:border-carbon/40 focus:border-carbon focus:outline-none focus-visible:outline-none focus:ring-2 focus:ring-arena/60 aria-[invalid=true]:border-[#B3261E]";

const info: { icon: IconName; data: { label: string; value: string; note: string; href?: string } }[] = [
  { icon: "telefono", data: contact.phone },
  { icon: "email", data: contact.email },
  { icon: "ubicacion", data: contact.address },
  { icon: "horario", data: contact.hours },
];

export default function Contacto() {
  const [values, setValues] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const [url, setUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const invalid = (k: Field) => !!touched[k] && !rules[k](values[k]);
  const set = (k: Field) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const blur = (k: Field) => () => setTouched((t) => ({ ...t, [k]: true }));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const bad = order.filter((k) => !rules[k](values[k]));
    if (bad.length) {
      setTouched(Object.fromEntries(order.map((k) => [k, true])));
      setStatus("error");
      formRef.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }
    const text = [
      form.messageIntro,
      "",
      ...order.map((k) => `${f[k].label}: ${values[k].trim()}`),
    ].join("\n");
    const link = whatsappUrl(text);
    setUrl(link);
    setStatus("success");
    window.open(link, "_blank", "noopener,noreferrer"); // síncrono: evita el bloqueo de pop-ups
  };

  const field = (k: Field) => ({
    id: `campo-${k}`,
    name: k,
    value: values[k],
    onChange: set(k),
    onBlur: blur(k),
    required: true,
    "aria-invalid": invalid(k),
    "aria-describedby": invalid(k) ? `error-${k}` : undefined,
  });

  const wrap = (k: Field, control: React.ReactNode, className?: string) => (
    <div className={className}>
      <label htmlFor={`campo-${k}`} className="mb-2 block text-[0.9375rem] font-medium">
        {f[k].label}
      </label>
      {control}
      <p id={`error-${k}`} role="alert" className={cn("mt-1.5 text-sm text-[#B3261E]", !invalid(k) && "hidden")}>
        {f[k].error}
      </p>
    </div>
  );

  const select = (k: "tipo" | "presupuesto") => (
    <div className="relative">
      <select {...field(k)} className={cn(inputCls, "appearance-none pr-12", values[k] === "" && "text-piedra-texto")}>
        <option value="" disabled>
          {f[k].placeholder}
        </option>
        {f[k].options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <Icon name="arrowDown" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-piedra-texto" />
    </div>
  );

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="section pt-0">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-8">
            <p data-fade className="eyebrow">{cta.eyebrow}</p>
            <h2 id="contacto-titulo" data-split className="mt-5 max-w-[13ch] font-display font-light leading-[0.98] tracking-[-0.04em] [font-size:clamp(2.75rem,8.4vw,7.5rem)]">
              {cta.title}
            </h2>
          </div>
          <p data-fade className="lead lg:col-span-4 lg:pb-3">{cta.text}</p>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          {/* Formulario */}
          <div data-fade className="min-w-0 rounded-panel bg-white p-6 shadow-suave sm:p-10 lg:col-span-7 lg:p-12">
            {status === "success" ? (
              <div role="status" className="flex min-h-[28rem] flex-col items-start justify-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-carbon text-hueso">
                  <Icon name="check" className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-3xl font-light tracking-[-0.03em]">{form.success.title}</h3>
                <p className="mt-3 max-w-[40ch] text-piedra-texto">{form.success.text}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button href={url} external>{form.success.retry}</Button>
                  <button
                    type="button"
                    onClick={() => {
                      setValues(empty);
                      setTouched({});
                      setStatus("idle");
                    }}
                    className="min-h-11 px-4 underline underline-offset-4"
                  >
                    {form.success.reset}
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="form-titulo">
                <h3 id="form-titulo" className="font-display text-2xl tracking-[-0.02em]">{form.title}</h3>
                <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {wrap("nombre", <input {...field("nombre")} type="text" autoComplete="name" autoCapitalize="words" placeholder={f.nombre.placeholder} className={inputCls} />, "sm:col-span-2")}
                  {wrap("email", <input {...field("email")} type="email" inputMode="email" autoComplete="email" autoCapitalize="none" spellCheck={false} placeholder={f.email.placeholder} className={inputCls} />)}
                  {wrap("telefono", <input {...field("telefono")} type="tel" inputMode="tel" autoComplete="tel" placeholder={f.telefono.placeholder} className={inputCls} />)}
                  {wrap("tipo", select("tipo"))}
                  {wrap("presupuesto", select("presupuesto"))}
                  {wrap("mensaje", <textarea {...field("mensaje")} rows={4} placeholder={f.mensaje.placeholder} className={cn(inputCls, "h-auto min-h-[8.5rem] resize-y py-4 leading-relaxed")} />, "sm:col-span-2")}
                </div>

                <p role="alert" className={cn("mt-5 rounded-2xl bg-[#B3261E]/10 px-4 py-3 text-[0.9375rem] text-[#8C1D18]", status !== "error" && "hidden")}>
                  {form.errorSummary}
                </p>

                <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <Button type="submit" className="w-full sm:w-auto">{form.submit}</Button>
                  <p className="max-w-[36ch] text-sm text-piedra-texto">{form.privacy}</p>
                </div>
              </form>
            )}
          </div>

          {/* Datos de contacto */}
          <address data-fade className="flex min-w-0 flex-col rounded-panel bg-white p-6 not-italic shadow-suave sm:p-10 lg:col-span-5 lg:p-12">
            <ul className="divide-y divide-carbon/10">
              {info.map(({ icon, data }) => {
                const body = (
                  <>
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-hueso">
                      <Icon name={icon} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-piedra-texto">{data.label}</span>
                      <span className="block break-words font-display text-lg tracking-[-0.01em] sm:text-xl">{data.value}</span>
                      <span className="block text-[0.9375rem] text-piedra-texto">{data.note}</span>
                    </span>
                  </>
                );
                return (
                  <li key={data.label}>
                    {data.href ? (
                      <a
                        href={data.href}
                        {...(data.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="flex items-center gap-4 py-5 transition-opacity hover:opacity-70"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 py-5">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <div className="mt-auto pt-6">
              <Button href={whatsappUrl()} external variant="outline" className="w-full">
                {contact.whatsapp.label}
              </Button>
            </div>
          </address>
        </div>
      </div>
    </section>
  );
}
