import { Wine, Sandwich, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";

const cards = [
  {
    icon: Wine,
    title: "Garrafeira selecionada",
    text: "Uma seleção viva de vinhos portugueses, com especial carinho pela Beira Interior, Douro, Dão e Alentejo. Escolhidos um a um, por critério e não por catálogo.",
  },
  {
    icon: Sandwich,
    title: "Tapas, queijos e sabores regionais",
    text: "Petiscos pensados para acompanhar cada copo: queijos curados, enchidos da região e pratos que celebram a cozinha da Beira Baixa.",
  },
  {
    icon: Users,
    title: "Ambiente para jantar, brindar e conversar",
    text: "Um espaço quente e acolhedor no centro de Castelo Branco, feito para momentos sem pressa — de um copo ao fim do dia a um jantar memorável.",
  },
];

export function Experiencia() {
  return (
    <section id="experiencia" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="A experiência Ponto Wine"
          title="Para quem procura mais do que uma garrafa: procura uma experiência."
          subtitle="Somos garrafeira, wine bar e restaurante — mas, acima de tudo, um ponto de encontro. Um lugar onde o vinho é desculpa para boas conversas e a mesa é feita para ficar."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold/30 hover:bg-white/[0.04]">
                <div className="texture-paper pointer-events-none absolute inset-0 opacity-40" />
                <div className="relative">
                  <span className="inline-flex rounded-xl bg-gold/10 p-3 text-gold transition-colors group-hover:bg-gold/20">
                    <c.icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-serif text-xl text-cream">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">
                    {c.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
