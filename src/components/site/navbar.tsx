"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#experiencia", label: "Experiência" },
  { href: "#vinhos", label: "Vinhos" },
  { href: "#b2b", label: "Restaurantes" },
  { href: "#eventos", label: "Eventos" },
  { href: "#contactos", label: "Contactos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-lg py-3"
          : "py-5"
      )}
    >
      <nav className="container flex items-center justify-between">
        <a href="#top" aria-label="Início" className="shrink-0">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-cream/80 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button asChild variant="ghost" size="sm">
            <a href="#reservas">Reservar mesa</a>
          </Button>
          <Button asChild size="sm">
            <a href="#b2b">Proposta B2B</a>
          </Button>
        </div>

        <button
          className="lg:hidden text-cream"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="lg:hidden">
          <div className="container mt-3 flex flex-col gap-1 rounded-2xl border border-white/10 bg-wine-800/95 p-4 backdrop-blur-lg">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base text-cream/90 transition-colors hover:bg-white/5 hover:text-gold"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button asChild variant="outline" onClick={() => setOpen(false)}>
                <a href="#reservas">Reservar mesa</a>
              </Button>
              <Button asChild onClick={() => setOpen(false)}>
                <a href="#b2b">Pedir proposta B2B</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
