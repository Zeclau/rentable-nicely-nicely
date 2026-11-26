import { describe, expect, it } from "vitest";
import { agentWhatsAppUrl, contactWhatsAppUrl, getListingForPath, listings, listingSpecifications } from "@/data/listings";
import module1Plan from "@/assets/module1-floor-plan.jpg";
import module3Plan from "@/assets/local-10.png";
import module3Interior from "@/assets/local-11.jpg";
import module3Exterior from "@/assets/local-12.jpg";
import module3Video from "@/assets/recorrido-local.mp4";

describe("permanent rental listings", () => {
  it.each(["/", "/modulo-1", "/modulo-1/"])("opens Module 1 at %s", (path) => {
    expect(getListingForPath(path)?.id).toBe(1);
  });

  it.each(["/modulo-3", "/modulo-3/"])("preserves Module 3 at %s", (path) => {
    expect(getListingForPath(path)?.id).toBe(3);
  });

  it("does not silently display a listing for an unknown URL", () => {
    expect(getListingForPath("/modulo-2")).toBeUndefined();
  });
});

describe("Module 1 rental terms", () => {
  it("charges the newly requested C$10,000 monthly", () => {
    expect(listings[1].monthlyNio).toBe(10000);
  });

  it("uses the existing US$270 equivalent", () => {
    expect(listings[1].monthlyUsd).toBe(270);
  });

  it.each([
    ["area", 21.5],
    ["width", 4.8],
    ["depth", 4.48],
    ["height", 2.92],
  ] as const)("restores the original %s of %s", (field, expected) => {
    expect(listings[1][field]).toBe(expected);
  });

  it("does not inherit the corner module's December 9 availability", () => {
    expect(listings[1].availability).not.toBe(listings[3].availability);
    expect(listings[1].availability).not.toContain("diciembre");
  });

  it("does not inherit a corner position", () => {
    expect(listings[1].position).toBeUndefined();
    expect(listingSpecifications(listings[1]).find(([key]) => key === "Posición")).toBeUndefined();
  });

  it("keeps its own floor plan, not the corner plan", () => {
    expect(listings[1].gallery.some((item) => item.src === module1Plan)).toBe(true);
    expect(listings[1].gallery.some((item) => item.src === module3Plan)).toBe(false);
  });

  it("excludes Module 3-only media", () => {
    const sources = listings[1].gallery.flatMap((item) => [item.src, item.video]);
    expect(sources).not.toContain(module3Interior);
    expect(sources).not.toContain(module3Exterior);
    expect(sources).not.toContain(module3Video);
  });
});

describe("Module 3 preservation", () => {
  it.each([
    ["area", 21.5],
    ["width", 4.94],
    ["depth", 4.5],
    ["height", 2.92],
    ["monthlyNio", 10000],
    ["monthlyUsd", 270],
  ] as const)("preserves its existing %s of %s", (field, expected) => {
    expect(listings[3][field]).toBe(expected);
  });

  it("preserves December 9 availability", () => {
    expect(listings[3].availability).toBe("9 de diciembre");
  });

  it("preserves the corner floor plan and video", () => {
    expect(listings[3].gallery.some((item) => item.src === module3Plan)).toBe(true);
    expect(listings[3].gallery.some((item) => item.video === module3Video)).toBe(true);
    expect(listings[3].gallery.some((item) => item.src === module1Plan)).toBe(false);
  });
});

describe.each([1, 3] as const)("Module %i inquiries", (id) => {
  it("identifies the selected module and sends the supplied details to the owner", () => {
    const url = new URL(contactWhatsAppUrl(listings[id], {
      name: "Ana Pérez", phone: "+505 8888 1234", business: "Cafetería", message: "Visita el viernes & sábado",
    }));
    expect(url.origin + url.pathname).toBe("https://wa.me/50576514498");
    const text = url.searchParams.get("text");
    expect(text).toContain(`Módulo ${id}`);
    expect(text).not.toContain(`Módulo ${id === 1 ? 3 : 1}`);
    expect(text).toContain("Ana Pérez");
    expect(text).toContain("+505 8888 1234");
    expect(text).toContain("Cafetería");
    expect(text).toContain("Visita el viernes & sábado");
  });

  it("identifies the selected module when contacting an existing agent", () => {
    const url = new URL(agentWhatsAppUrl(listings[id], { name: "Ana", phone: "+505 8888-1234" }));
    expect(url.origin + url.pathname).toBe("https://wa.me/50588881234");
    expect(url.searchParams.get("text")).toContain(`Módulo ${id}`);
    expect(url.searchParams.get("text")).not.toContain(`Módulo ${id === 1 ? 3 : 1}`);
  });
});