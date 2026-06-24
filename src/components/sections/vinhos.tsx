"use client";

import { motion } from "framer-motion";
import { ArrowRight, Grape, Thermometer, UtensilsCrossed } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { wineCategories, getFeaturedWines } from "@/data/wines";
import { formatEUR } from "@/lib/utils";

const featured = getFeaturedWines();

export function Vinhos() {
  return (
    <section id="vinhos" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Vinhos em destaque"
          title="Vinhos escolhidos com critério, servidos com proximidade."
          subtitle="Navegue por tipo ou por região. Esta é apenas uma amostra da nossa garrafeira — venha descobrir o resto."
        />

        {/* Grelha de categorias */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {wineCategories.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 0.05}>
              <a
                href="#contactos"
                className="group block h-full rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all hover:border-gold/30 hover:bg-white/[0.04]"
              >
                <span className="text-xs uppercase tracking-wider text-gold/70">
                  {cat.kind === "type" ? "Tipo" : "Região"}
                </span>
                <h3 className="mt-1 font-serif text-lg text-cream">{cat.label}</h3>
                <p className="mt-1 text-xs leading-relaxed text-cream/55">
                  {cat.blurb}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs text-gold opacity-0 transition-opacity group-hover:opacity-100">
                  Saber mais <ArrowRight className="h-3 w-3" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Cartões de vinhos em destaque */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((wine, i) => (
            <Reveal key={wine.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent"
              >
                {/* Visual placeholder — substituir por imagem real do vinho */}
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-wine-700 to-wine-900">
                  <div className="texture-paper absolute inset-0 opacity-30" />
                  <div className="relative h-28 w-9 rounded-t-full rounded-b bg-gradient-to-b from-wine-400 to-wine-800 shadow-xl">
                    <div className="mx-auto mt-10 h-10 w-7 bg-cream/90" />
                  </div>
                  <Badge variant="default" className="absolute right-3 top-3">
                    {wine.type}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-wider text-gold/70">
                    {wine.region} · {wine.producer}
                  </p>
                  <h3 className="mt-1 font-serif text-lg text-cream">{wine.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-cream/60">
                    {wine.description}
                  </p>

                  <div className="mt-3 space-y-1 text-xs text-cream/55">
                    <span className="flex items-center gap-1.5">
                      <Grape className="h-3.5 w-3.5 text-gold/60" />
                      {wine.grapes.join(", ")}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Thermometer className="h-3.5 w-3.5 text-gold/60" />
                      {wine.temperature}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <UtensilsCrossed className="h-3.5 w-3.5 text-gold/60" />
                      {wine.pairing}
                    </span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-serif text-lg text-gold">
                      {formatEUR(wine.price)}
                    </span>
                    <Button asChild size="sm" variant="outline">
                      <a href="#contactos">Saber mais</a>
                    </Button>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <p className="text-sm text-cream/50">
            Procura um vinho específico ou quer aconselhamento?{" "}
            <a href="#contactos" className="text-gold hover:underline">
              Fale connosco
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
