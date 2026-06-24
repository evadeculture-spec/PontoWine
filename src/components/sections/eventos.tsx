"use client";

import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";

export function Eventos() {
  return (
    <section
      id="eventos"
      className="relative overflow-hidden border-y border-white/10 bg-wine-900/30 py-24 md:py-32"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Eventos e provas"
          title="Momentos para celebrar à volta do vinho"
          subtitle="Provas guiadas, jantares vínicos, eventos privados e experiências para empresas. Datas sob consulta — fale connosco para construir o seu momento."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {events.map((ev, i) => (
            <Reveal key={ev.id} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -4 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7"
              >
                <div className="texture-paper pointer-events-none absolute inset-0 opacity-30" />
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <Badge variant="wine">{ev.kind}</Badge>
                    <span className="flex items-center gap-1.5 text-xs text-gold/80">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {ev.date}
                    </span>
                  </div>
                  <h3 className="mt-4 font-serif text-xl text-cream">
                    {ev.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">
                    {ev.description}
                  </p>
                  <div className="mt-auto flex items-center justify-between pt-5">
                    {ev.spots && (
                      <span className="text-xs uppercase tracking-wider text-cream/50">
                        {ev.spots}
                      </span>
                    )}
                    <Button asChild size="sm" variant="ghost">
                      <a href="#contactos">
                        Saber mais <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
