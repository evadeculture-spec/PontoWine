"use client";

import {
  ClipboardList,
  Truck,
  Award,
  Target,
  CalendarHeart,
  MessageCircle,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { B2BForm } from "@/components/forms/b2b-form";
import { whatsappLink } from "@/data/business-info";

const benefits = [
  { icon: ClipboardList, title: "Seleção para carta de vinhos" },
  { icon: Truck, title: "Fornecimento regular" },
  { icon: Award, title: "Marcas exclusivas e produtores selecionados" },
  { icon: Target, title: "Apoio na escolha por perfil, margem e harmonização" },
  { icon: CalendarHeart, title: "Eventos, provas e experiências privadas" },
];

const whatsappMsg =
  "Olá Ponto Wine! Tenho um restaurante/negócio e gostaria de saber mais sobre fornecimento de vinhos.";

export function B2B() {
  return (
    <section
      id="b2b"
      className="relative overflow-hidden border-y border-white/10 bg-wine-900/40 py-24 md:py-32"
    >
      <div className="texture-paper pointer-events-none absolute inset-0 opacity-50" />
      <div className="container relative">
        <SectionHeading
          eyebrow="B2B · Profissionais"
          title="Vinhos para restaurantes e profissionais"
          subtitle="A Ponto Wine ajuda restaurantes, bares, hotéis e empresas a construir uma carta de vinhos diferenciadora, com seleção cuidada, acompanhamento próximo e soluções adaptadas ao tipo de cliente."
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Benefícios */}
          <div>
            <p className="font-serif text-xl italic text-gold">
              «Do jantar à carta de vinhos do seu restaurante.»
            </p>
            <ul className="mt-8 space-y-4">
              {benefits.map((b, i) => (
                <Reveal key={b.title} delay={i * 0.07}>
                  <li className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-gold/30">
                    <span className="rounded-lg bg-gold/10 p-2.5 text-gold">
                      <b.icon className="h-5 w-5" />
                    </span>
                    <span className="pt-1.5 text-sm font-medium text-cream/90">
                      {b.title}
                    </span>
                  </li>
                </Reveal>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <a href="#b2b-form">Pedir proposta B2B</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={whatsappLink(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar por WhatsApp
                </a>
              </Button>
            </div>
          </div>

          {/* Formulário */}
          <Reveal id="b2b-form">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h3 className="font-serif text-2xl text-cream">
                Peça a sua proposta
              </h3>
              <p className="mt-2 text-sm text-cream/60">
                Conte-nos sobre o seu negócio. Respondemos com uma proposta à
                medida.
              </p>
              <div className="mt-6">
                <B2BForm />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
