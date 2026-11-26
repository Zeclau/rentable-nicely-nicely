import module1Front from "@/assets/module1-interior-front.jpg";
import module1Side from "@/assets/module1-interior-side.jpg";
import module1Bathroom from "@/assets/module1-interior-bathroom.jpg";
import module1Plan from "@/assets/module1-floor-plan.jpg";
import module3Hero from "@/assets/hero-module3-night.jpg";
import exteriorNight from "@/assets/local-1.jpg";
import electricalPanel from "@/assets/local-2.jpg";
import bathroomSink from "@/assets/local-4.jpg";
import ventilation from "@/assets/local-5.jpg";
import bathroom from "@/assets/local-9.jpg";
import module3Plan from "@/assets/local-10.png";
import module3Interior from "@/assets/local-11.jpg";
import module3Exterior from "@/assets/local-12.jpg";
import videoPoster from "@/assets/recorrido-poster.jpg";
import video from "@/assets/recorrido-local.mp4";

export type ModuleId = 1 | 3;
export type GalleryItem = { src: string; label: string; video?: string };
export type Listing = {
  id: ModuleId;
  name: string;
  path: string;
  numberLabel: string;
  area: number;
  width: number;
  depth: number;
  height: number;
  monthlyUsd: number;
  monthlyNio: number;
  availability: string;
  position?: string;
  hero: string;
  heroAlt: string;
  detailsImage: string;
  detailsImageAlt: string;
  introduction: string;
  locationBenefit: string;
  neighboringBusinesses: string;
  galleryDescription: string;
  gallery: GalleryItem[];
};

export const listings: Record<ModuleId, Listing> = {
  1: {
    id: 1,
    name: "Módulo 1",
    path: "/modulo-1",
    numberLabel: "Número UNO (1)",
    area: 21.5,
    width: 4.8,
    depth: 4.48,
    height: 2.92,
    monthlyUsd: 270,
    monthlyNio: 10000,
    availability: "Disponible para alquiler",
    hero: module1Front,
    heroAlt: "Módulo 1 con cortina abierta e interior diáfano en Praderas de Sandino V Etapa",
    detailsImage: module1Bathroom,
    detailsImageAlt: "Interior del Módulo 1 con acceso al baño y panel eléctrico privado",
    introduction: "Módulo comercial en alquiler en Praderas de Sandino V Etapa, contiguo a un Super Express y rodeado de comercios consolidados.",
    locationBenefit: "Alto tráfico de vehículos y peatones todo el día. Contiguo a un Super Express con flujo constante de clientes.",
    neighboringBusinesses: "Entorno comercial consolidado, con un Super Express y negocios de comida que atraen clientes a la zona.",
    galleryDescription: "Un espacio diáfano para adaptar a tu visión: cafetería, oficina, boutique, consultorio o tienda.",
    gallery: [
      { src: module1Front, label: "Módulo 1 · interior amplio, vista frontal" },
      { src: exteriorNight, label: "Conjunto comercial · fachada exterior nocturna" },
      { src: module1Bathroom, label: "Módulo 1 · interior con acceso a baño" },
      { src: module1Side, label: "Módulo 1 · vista lateral del interior" },
      { src: bathroom, label: "Baño completo con lavandería" },
      { src: bathroomSink, label: "Lavamanos del baño" },
      { src: ventilation, label: "Ventilación natural" },
      { src: electricalPanel, label: "Panel eléctrico privado" },
      { src: module1Plan, label: "Plano arquitectónico · Módulo 1" },
    ],
  },
  3: {
    id: 3,
    name: "Módulo 3 · La Esquina",
    path: "/modulo-3",
    numberLabel: "Número TRES (3)",
    area: 21.5,
    width: 4.94,
    depth: 4.5,
    height: 2.92,
    monthlyUsd: 270,
    monthlyNio: 10000,
    availability: "9 de diciembre",
    position: "Local de esquina",
    hero: module3Hero,
    heroAlt: "Módulo comercial de esquina en Praderas de Sandino V Etapa, iluminado de noche",
    detailsImage: module3Hero,
    detailsImageAlt: "Módulo comercial de esquina en Praderas de Sandino V Etapa, iluminado de noche",
    introduction: "Módulo comercial de esquina con alto tráfico garantizado. Ubicado en Praderas de Sandino V Etapa, contiguo a un Super Express y rodeado de comercios consolidados.",
    locationBenefit: "Alto tráfico de vehículos y peatones todo el día, con visibilidad desde la esquina. Contiguo a un Super Express con flujo constante de clientes.",
    neighboringBusinesses: "Flanqueado por negocios ancla: local de comida rápida y batidos y waffles que atraen tu público objetivo.",
    galleryDescription: "Actualmente acondicionado como carnicería, ideal para adaptarse a tu visión: cafetería, oficina, boutique, consultorio o tienda.",
    gallery: [
      { src: module3Exterior, label: "Fachada en esquina · vista diurna" },
      { src: videoPoster, label: "Recorrido en video", video },
      { src: module3Interior, label: "Interior acondicionado · mostrador central" },
      { src: bathroom, label: "Baño completo con lavandería" },
      { src: bathroomSink, label: "Lavamanos del baño" },
      { src: ventilation, label: "Ventilación natural" },
      { src: electricalPanel, label: "Panel eléctrico privado" },
      { src: module3Plan, label: "Plano del módulo comercial" },
      { src: exteriorNight, label: "Fachada exterior nocturna" },
    ],
  },
};

export function getListingForPath(pathname: string): Listing | undefined {
  const path = pathname.replace(/\/+$/, "") || "/";
  if (path === "/" || path === "/modulo-1") return listings[1];
  if (path === "/modulo-3") return listings[3];
  return undefined;
}

export function listingSpecifications(listing: Listing): [string, string][] {
  return [
    ["Módulo", listing.numberLabel],
    ...(listing.position ? [["Posición", listing.position] as [string, string]] : []),
    ["Área aproximada", `${listing.area.toFixed(2)} m²`],
    ["Ancho", `${listing.width.toFixed(2)} m`],
    ["Fondo", `${listing.depth.toFixed(2)} m`],
    ["Altura interior", `${listing.height.toFixed(2)} m`],
    ["Disponibilidad", listing.availability],
  ];
}

export function listingMetadata(listing: Listing) {
  return {
    title: `${listing.name} en alquiler · Praderas de Sandino, Managua`,
    description: `Alquila el ${listing.name} en Praderas de Sandino V Etapa, Managua: ${listing.area} m², C$ ${listing.monthlyNio.toLocaleString("en-US")} / U$ ${listing.monthlyUsd} mensuales. Consulta los detalles y agenda tu visita.`,
  };
}

export type Inquiry = { name: string; phone: string; business: string; message: string };

export function contactWhatsAppUrl(listing: Listing, inquiry: Inquiry): string {
  const text = `Hola Yasser, me interesa el ${listing.name} en alquiler en Praderas de Sandino V Etapa. Soy ${inquiry.name}. Tel: ${inquiry.phone}. Negocio: ${inquiry.business}. ${inquiry.message}`;
  return `https://wa.me/50576514498?text=${encodeURIComponent(text)}`;
}

export function agentWhatsAppUrl(listing: Listing, agent: { name: string; phone: string }): string {
  const text = `Hola ${agent.name}, te contacto por el ${listing.name} en alquiler en Praderas de Sandino V Etapa. Me interesa más información.`;
  return `https://wa.me/${agent.phone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(text)}`;
}