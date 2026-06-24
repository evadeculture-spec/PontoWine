"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Wine, Building2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

// O 3D é carregado dinamicamente (sem SSR) para não bloquear o load inicial.
const BottleHero = dynamic(
  () => import("@/components/3d/bottle-hero").then((m) => m.BottleHero),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto aspect-square w-full max-w-[460px] animate-pulse rounded-full bg-white/[0.03]" />
    ),
  }
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-28"
    >
      <div className="container grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Garrafeira · Wine Bar · Restaurante
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="heading-balance mt-6 font-serif text-4xl font-semibold leading-[1.05] text-cream sm:text-5xl md:text-6xl"
          >
            O ponto de encontro entre{" "}
            <span className="text-gold-sheen">vinhos</span>, sabores e boas
            conversas.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream/70"
          >
            Garrafeira, wine bar, restaurante e parceiro de confiança para
            restaurantes na Beira Baixa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg">
              <a href="#reservas">
                <Wine className="h-4 w-4" />
                Reservar mesa
              </a>
            </Button>
            <Button asChild size="lg" variant="wine">
              <a href="#b2b">
                <Building2 className="h-4 w-4" />
                Pedir proposta para restaurante
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#vinhos">Explorar vinhos</a>
            </Button>
          </motion.div>

          <p className="mt-8 max-w-md font-serif text-sm italic text-cream/50">
            «Cada garrafa tem uma história. Nós ajudamos a escolher a certa.»
          </p>
        </div>

        <div className="relative flex items-center justify-center pb-16 lg:pb-0">
          <BottleHero />
        </div>
      </div>

      {/* Linha decorativa inferior */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  );
}
