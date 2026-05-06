import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Rocket, Store, ShieldCheck, Zap, Phone, MessageCircle,
  Maximize2, X, Calendar, Building2, CheckCircle2, ArrowRight, Menu, UserPlus, Briefcase
} from "lucide-react";
import { z } from "zod";

type Agent = { name: string; profession: string; phone: string; addedAt: number };
const AGENTS_KEY = "praderas_agents_v1";
const agentSchema = z.object({
  name: z.string().trim().min(2, "Nombre muy corto").max(80),
  profession: z.string().trim().min(2, "Profesión requerida").max(80),
  phone: z.string().trim().min(7, "Teléfono inválido").max(25).regex(/^[+\d\s().-]+$/, "Solo números y símbolos"),
});
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import hero from "@/assets/hero-local.jpg";
import g1 from "@/assets/local-1.jpg";
import g2 from "@/assets/local-2.jpg";
import g3 from "@/assets/local-3.jpg";
import g4 from "@/assets/local-4.jpg";
import g5 from "@/assets/local-5.jpg";
import g6 from "@/assets/local-6.jpg";
import g7 from "@/assets/local-7.jpg";
import g8 from "@/assets/local-8.jpg";
import g9 from "@/assets/local-9.jpg";

const WHATSAPP = "https://wa.me/50576514498?text=Hola%20Yasser%2C%20me%20interesa%20el%20m%C3%B3dulo%20comercial%20en%20Praderas%20de%20Sandino%20V%20Etapa.";

const gallery = [
  { src: g3, label: "Interior amplio · vista frontal" },
  { src: g1, label: "Fachada exterior nocturna" },
  { src: g7, label: "Interior con acceso a baño" },
  { src: g6, label: "Vista lateral del módulo" },
  { src: g9, label: "Baño completo con lavandería" },
  { src: g4, label: "Lavamanos del baño" },
  { src: g5, label: "Ventilación natural" },
  { src: g2, label: "Panel eléctrico privado" },
  { src: g8, label: "Plano arquitectónico" },
];

const navLinks = [
  { href: "#ventajas", label: "Ventajas" },
  { href: "#detalles", label: "Detalles" },
  { href: "#inversion", label: "Inversión" },
  { href: "#galeria", label: "Galería" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-20 md:py-28 px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

const Index = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [agentErrors, setAgentErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const agentFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(AGENTS_KEY);
      if (raw) setAgents(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nombre = fd.get("nombre") as string;
    const tel = fd.get("telefono") as string;
    const tipo = fd.get("tipo") as string;
    const msg = fd.get("mensaje") as string;
    const text = `Hola Yasser, soy ${nombre}. Tel: ${tel}. Negocio: ${tipo}. ${msg}`;
    window.open(`https://wa.me/50576514498?text=${encodeURIComponent(text)}`, "_blank");
    toast.success("¡Mensaje enviado! Te redirigimos a WhatsApp.");
    formRef.current?.reset();
  };

  const handleAgentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("agentName") ?? ""),
      profession: String(fd.get("agentProfession") ?? ""),
      phone: String(fd.get("agentPhone") ?? ""),
    };
    const parsed = agentSchema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach(i => { errs[i.path[0] as string] = i.message; });
      setAgentErrors(errs);
      toast.error("Revisa los datos del formulario.");
      return;
    }
    setAgentErrors({});
    const entry: Agent = { name: parsed.data.name, profession: parsed.data.profession, phone: parsed.data.phone, addedAt: Date.now() };
    const next: Agent[] = [entry, ...agents].slice(0, 100);
    setAgents(next);
    try { localStorage.setItem(AGENTS_KEY, JSON.stringify(next)); } catch { /* noop */ }
    toast.success("¡Listo! Tus datos se agregaron a la lista de agentes.");
    agentFormRef.current?.reset();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-smooth ${
          scrolled ? "bg-background/90 backdrop-blur-lg shadow-soft" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-2 font-bold">
            <span className={`w-9 h-9 rounded-lg gradient-accent grid place-items-center text-accent-foreground`}>
              <Building2 className="w-5 h-5" />
            </span>
            <span className={scrolled ? "text-primary" : "text-white drop-shadow"}>Módulo 1 · Praderas</span>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-smooth hover:text-accent ${
                  scrolled ? "text-foreground/80" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" className="hidden md:inline-flex bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-smooth">
              <a href="#contacto">Agendar Visita</a>
            </Button>
            <button
              onClick={() => setMenuOpen(v => !v)}
              className={`md:hidden p-2 rounded-lg ${scrolled ? "text-foreground" : "text-white"}`}
              aria-label="Menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-background/95 backdrop-blur-lg border-t border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-3">
                {navLinks.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-foreground/80 hover:text-accent py-2 text-sm font-medium">
                    {l.label}
                  </a>
                ))}
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <a href="#contacto" onClick={() => setMenuOpen(false)}>Agendar Visita</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <img
          src={hero}
          alt="Módulo comercial moderno disponible para alquiler en Managua"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 gradient-hero" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--navy-deep))] via-transparent to-transparent" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 mb-6 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-[hsl(var(--emerald))] animate-pulse" />
            Disponible de inmediato · Praderas de Sandino V Etapa
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05] mb-6"
          >
            Tu Próximo Negocio en la <span className="text-[hsl(var(--emerald-glow))]">Zona de Mayor Crecimiento</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10"
          >
            Módulo comercial estratégico con alto tráfico garantizado. Ubicado en
            Praderas de Sandino V Etapa, contiguo a un Super Express y rodeado de comercios consolidados.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-6 rounded-xl shadow-glow hover:scale-105 transition-smooth">
              <a href="#contacto"><Calendar className="w-5 h-5 mr-2" /> Agendar Visita</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base px-8 py-6 rounded-xl bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur transition-smooth">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Directo</a>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {[
              { v: "21.5", l: "m² útiles" },
              { v: "U$250", l: "Mensual" },
              { v: "100%", l: "Independiente" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[hsl(var(--emerald-glow))]">{s.v}</div>
                <div className="text-xs md:text-sm text-white/70 uppercase tracking-wider">{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Propuesta de valor */}
      <Section id="ventajas" className="bg-secondary/40">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-accent font-semibold uppercase text-sm tracking-widest">Propuesta de valor</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-primary">Por qué este local impulsará tu negocio</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Cuatro razones decisivas que convierten este módulo en una oportunidad única para emprendedores con visión.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Rocket, title: "Ubicación Estratégica", desc: "Alto tráfico de vehículos y peatones todo el día. Contiguo a un Super Express con flujo constante de clientes." },
            { icon: Store, title: "Entorno Sinérgico", desc: "Flanqueado por negocios ancla: local de comida rápida y carnicería que atraen tu público objetivo." },
            { icon: ShieldCheck, title: "Máxima Seguridad", desc: "Residencial seguro y de confianza. Iluminación nocturna y comunidad activa que protege tu inversión." },
            { icon: Zap, title: "Independencia Total", desc: "Medidores privados de agua y energía. Tú controlas tus consumos sin sorpresas en tus facturas." },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-card border border-border rounded-2xl p-7 h-full shadow-card hover:shadow-glow transition-smooth group"
              >
                <div className="w-12 h-12 rounded-xl gradient-accent grid place-items-center text-accent-foreground mb-5 group-hover:scale-110 transition-smooth">
                  <c.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Especificaciones */}
      <Section id="detalles">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-accent font-semibold uppercase text-sm tracking-widest">Especificaciones</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-primary mb-6">Detalles técnicos del módulo</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Información transparente para que evalúes con confianza si este espacio se ajusta a las dimensiones que tu operación necesita.
            </p>

            <div className="space-y-4">
              {[
                ["Módulo", "Número UNO (1)"],
                ["Área aproximada", "21.50 m²"],
                ["Ancho", "4.80 m"],
                ["Fondo", "4.48 m"],
                ["Altura interior", "2.92 m"],
                ["Disponibilidad", "Inmediata"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-border pb-3">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-semibold text-primary">{v}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-xl bg-secondary/60 border border-border">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-primary mb-1">Ubicación exacta</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Km 11 carretera nueva a León, de la intersección de la Cuesta El Plomo 800 m al oeste,
                    Residencial Praderas de Sandino V etapa, Lote 2D 12 (extremo sureste).
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative">
              <motion.div whileHover={{ scale: 1.02 }} className="rounded-3xl overflow-hidden shadow-card">
                <img src={g3} alt="Interior del módulo comercial" className="w-full h-[480px] object-cover" loading="lazy" />
              </motion.div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-card border border-border hidden md:block">
                <div className="flex items-center gap-3">
                  <Maximize2 className="w-8 h-8 text-accent" />
                  <div>
                    <div className="text-2xl font-bold text-primary">21.5 m²</div>
                    <div className="text-xs text-muted-foreground">Espacio diáfano</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Inversión */}
      <Section id="inversion" className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, hsl(var(--emerald)) 0%, transparent 50%), radial-gradient(circle at 80% 80%, hsl(var(--emerald)) 0%, transparent 50%)" }} />
        <div className="relative">
          <Reveal>
            <div className="text-center mb-14">
              <span className="text-[hsl(var(--emerald-glow))] font-semibold uppercase text-sm tracking-widest">Transparencia total</span>
              <h2 className="text-3xl md:text-5xl font-bold mt-3">Inversión y Condiciones</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-smooth h-full">
                <p className="text-white/60 text-sm uppercase tracking-wider mb-2">Canon mensual</p>
                <div className="flex items-baseline gap-3 mb-3">
                  <span className="text-5xl md:text-6xl font-extrabold text-[hsl(var(--emerald-glow))]">U$ 250</span>
                  <span className="text-white/70">/ mes</span>
                </div>
                <p className="text-white/70">Equivalente a <span className="font-semibold text-white">C$ 9,250.00</span> mensuales.</p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-sm text-white/60 mb-2">Requisitos al firmar</p>
                  <p className="font-semibold">1 mes de anticipo + 1 mes de depósito en garantía</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="bg-white/5 backdrop-blur border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-smooth h-full">
                <p className="text-white/60 text-sm uppercase tracking-wider mb-4">Condiciones</p>
                <ul className="space-y-4">
                  {[
                    "Energía: el inquilino paga el 100% de su factura.",
                    "Agua: incluye consumo hasta 10 m³ al mes.",
                    "Excedente de agua: C$ 15 / U$ 0.41 por m³.",
                    "Contrato mínimo de 12 meses.",
                    "Penalidad por terminación anticipada: 1 mes de renta.",
                    "El depósito cubre daños o facturas pendientes.",
                  ].map((t, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[hsl(var(--emerald-glow))] shrink-0 mt-0.5" />
                      <span className="text-white/85 text-sm leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8 py-6 rounded-xl shadow-glow hover:scale-105 transition-smooth">
                <a href="#contacto">Reservar este módulo <ArrowRight className="w-5 h-5 ml-2" /></a>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Galería */}
      <Section id="galeria">
        <Reveal>
          <div className="text-center mb-12">
            <span className="text-accent font-semibold uppercase text-sm tracking-widest">Galería</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-primary">Conoce el espacio por dentro</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Actualmente acondicionado como barbería, ideal para adaptarse a tu visión: cafetería, oficina, boutique, consultorio o tienda.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {gallery.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={() => setLightbox(i)}
                className={`relative w-full overflow-hidden rounded-2xl group block ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
              >
                <img
                  src={g.src}
                  alt={g.label}
                  loading="lazy"
                  className={`w-full object-cover transition-smooth group-hover:scale-110 ${
                    i === 0 ? "h-64 md:h-[520px]" : "h-40 md:h-64"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-smooth">
                  <Maximize2 className="w-4 h-4 inline mr-2" />
                  {g.label}
                </div>
              </motion.button>
            </Reveal>
          ))}
        </div>

        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm grid place-items-center p-4"
            >
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 grid place-items-center text-white transition-smooth"
              >
                <X className="w-6 h-6" />
              </button>
              <motion.img
                key={lightbox}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={gallery[lightbox].src}
                alt={gallery[lightbox].label}
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="absolute bottom-6 left-0 right-0 text-center text-white/90 text-sm">{gallery[lightbox].label}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      {/* Mapa */}
      <Section id="ubicacion" className="bg-secondary/40">
        <Reveal>
          <div className="text-center mb-10">
            <span className="text-accent font-semibold uppercase text-sm tracking-widest">Ubicación</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-primary">Encuéntranos en el mapa</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Coordenadas exactas: 12.1557839, -86.3450681
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-3xl overflow-hidden shadow-card border border-border">
            <iframe
              title="Ubicación del módulo comercial"
              src="https://www.google.com/maps?q=12.1557839,-86.3450681&hl=es&z=17&output=embed"
              className="w-full h-[480px] md:h-[560px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="text-center mt-6">
            <Button asChild variant="outline" className="rounded-xl hover:scale-105 transition-smooth">
              <a href="https://www.google.com/maps/dir/?api=1&destination=12.1557839,-86.3450681" target="_blank" rel="noopener noreferrer">
                <MapPin className="w-4 h-4 mr-2" /> Cómo llegar
              </a>
            </Button>
          </div>
        </Reveal>
      </Section>

      {/* Contacto */}
      <Section id="contacto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <Reveal>
            <span className="text-accent font-semibold uppercase text-sm tracking-widest">Contacto</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 text-primary mb-5">Hablemos de tu próximo negocio</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Déjanos tus datos y te contactamos hoy mismo para coordinar una visita o resolver todas tus dudas.
            </p>

            <div className="bg-card border border-border rounded-3xl p-6 md:p-7 shadow-card mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-11 h-11 rounded-xl gradient-accent grid place-items-center text-accent-foreground">
                  <UserPlus className="w-5 h-5" />
                </span>
                <div>
                  <div className="font-bold text-primary">¿Eres agente de bienes raíces?</div>
                  <div className="text-xs text-muted-foreground">Regístrate libremente y aparece en la lista pública.</div>
                </div>
              </div>

              <form ref={agentFormRef} onSubmit={handleAgentSubmit} className="grid sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <Input name="agentName" maxLength={80} placeholder="Nombre" className="h-11 rounded-xl" />
                  {agentErrors.name && <p className="text-xs text-destructive mt-1">{agentErrors.name}</p>}
                </div>
                <div className="sm:col-span-1">
                  <Input name="agentProfession" maxLength={80} placeholder="Profesión" className="h-11 rounded-xl" />
                  {agentErrors.profession && <p className="text-xs text-destructive mt-1">{agentErrors.profession}</p>}
                </div>
                <div className="sm:col-span-1">
                  <Input name="agentPhone" maxLength={25} placeholder="Teléfono" className="h-11 rounded-xl" />
                  {agentErrors.phone && <p className="text-xs text-destructive mt-1">{agentErrors.phone}</p>}
                </div>
                <Button type="submit" className="sm:col-span-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 hover:scale-[1.01] transition-smooth">
                  Agregar mis datos <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {agents.length > 0 && (
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Agentes registrados ({agents.length})
                  </div>
                  <ul className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    <AnimatePresence initial={false}>
                      {agents.map((a) => (
                        <motion.li
                          key={a.addedAt}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-secondary/60 border border-border"
                        >
                          <div className="min-w-0">
                            <div className="font-semibold text-primary truncate">{a.name}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-1.5 truncate">
                              <Briefcase className="w-3 h-3 shrink-0" /> {a.profession}
                            </div>
                          </div>
                          <a
                            href={`tel:${a.phone.replace(/[^+\d]/g, "")}`}
                            className="flex items-center gap-2 text-sm font-medium text-accent hover:underline shrink-0"
                          >
                            <Phone className="w-4 h-4" /> {a.phone}
                          </a>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                </div>
              )}
            </div>

          </Reveal>

          <Reveal delay={0.15}>
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="bg-card border border-border rounded-3xl p-7 md:p-9 shadow-card space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Nombre completo</label>
                <Input name="nombre" required placeholder="Tu nombre" className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Teléfono / WhatsApp</label>
                <Input name="telefono" required type="tel" placeholder="+505 0000 0000" className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Tipo de negocio</label>
                <Input name="tipo" required placeholder="Cafetería, oficina, tienda, etc." className="h-12 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Mensaje</label>
                <Textarea name="mensaje" rows={4} placeholder="Cuéntanos cuándo te gustaría visitar el local…" className="rounded-xl" />
              </div>
              <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl h-12 text-base hover:scale-[1.02] transition-smooth shadow-glow">
                Enviar y abrir WhatsApp <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground text-center">Al enviar, te redirigimos a WhatsApp con tu mensaje listo.</p>
            </form>
          </Reveal>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2 font-semibold">
            <Building2 className="w-5 h-5 text-[hsl(var(--emerald-glow))]" />
            Módulo 1 · Praderas de Sandino V Etapa
          </div>
          <div className="text-white/60">© {new Date().getFullYear()} Yasser Santana Cruz · Asistente administrativo · +505 7651 4498</div>
        </div>
      </footer>

      {/* WhatsApp flotante */}
      <motion.a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full gradient-accent grid place-items-center text-accent-foreground shadow-glow"
        aria-label="Contactar por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute inset-0 rounded-full gradient-accent animate-ping opacity-40" />
      </motion.a>
    </div>
  );
};

export default Index;
