import { Clock, CalendarCheck, Phone } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { ReservationForm } from "@/components/forms/reservation-form";
import { businessInfo } from "@/data/business-info";

export function Reservas() {
  return (
    <section id="reservas" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Reservas"
          title="Reserve o seu momento na Ponto Wine"
          subtitle="Um jantar, uma prova ou apenas um copo bem servido. Escolha o seu momento — nós tratamos do resto."
        />

        <div className="mt-16 grid gap-10 lg:grid-cols-5">
          {/* Coluna informativa */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-wine-700/30 to-transparent p-8">
              <div>
                <h3 className="font-serif text-2xl text-cream">
                  Bem-vindo à mesa
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/65">
                  Garantimos o seu lugar e preparamos tudo para que só tenha de
                  chegar e apreciar. Para grupos grandes ou pedidos especiais,
                  ligue-nos diretamente.
                </p>
              </div>

              <ul className="mt-8 space-y-4 text-sm text-cream/75">
                <li className="flex items-center gap-3">
                  <CalendarCheck className="h-5 w-5 text-gold/70" />
                  Confirmação por contacto direto
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold/70" />
                  <a
                    href={`tel:${businessInfo.phones.reservations.replace(/\s/g, "")}`}
                    className="hover:text-gold"
                  >
                    {businessInfo.phones.reservations}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold/70" />
                  <span>
                    {businessInfo.hours
                      .filter((h) => h.close)
                      .map((h) => h.day)
                      .slice(0, 1)}{" "}
                    a Domingo · ver horário completo em contactos
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          {/* Formulário */}
          <Reveal className="lg:col-span-3" delay={0.1}>
            <div className="glass rounded-2xl p-6 sm:p-8">
              <ReservationForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
