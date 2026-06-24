import { MapPin, Phone, Clock, MessageCircle, Instagram } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/sections/section-heading";
import { Button } from "@/components/ui/button";
import { businessInfo, whatsappLink } from "@/data/business-info";

export function Contactos() {
  const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    businessInfo.address.mapsQuery
  )}&z=16&output=embed`;

  return (
    <section id="contactos" className="relative py-24 md:py-32">
      <div className="container">
        <SectionHeading
          eyebrow="Contactos"
          title="Venha ter connosco"
          subtitle="No coração de Castelo Branco. Passe por cá, ligue ou escreva — teremos todo o gosto em recebê-lo."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Informação */}
          <Reveal>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-start gap-4">
                  <span className="rounded-xl bg-gold/10 p-3 text-gold">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-cream">Morada</h3>
                    <p className="mt-1 text-sm text-cream/65">
                      {businessInfo.address.street}
                      <br />
                      {businessInfo.address.postalCode} {businessInfo.address.city}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-start gap-4">
                  <span className="rounded-xl bg-gold/10 p-3 text-gold">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-serif text-lg text-cream">Telefones</h3>
                    <p className="mt-1 text-sm text-cream/65">
                      Reservas:{" "}
                      <a
                        href={`tel:${businessInfo.phones.reservations.replace(/\s/g, "")}`}
                        className="text-gold hover:underline"
                      >
                        {businessInfo.phones.reservations}
                      </a>
                      <br />
                      <a
                        href={`tel:${businessInfo.phones.secondary.replace(/\s/g, "")}`}
                        className="text-gold hover:underline"
                      >
                        {businessInfo.phones.secondary}
                      </a>
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Button asChild variant="wine" size="sm">
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={businessInfo.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="flex items-start gap-4">
                  <span className="rounded-xl bg-gold/10 p-3 text-gold">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-cream">Horário</h3>
                    <ul className="mt-2 space-y-1 text-sm text-cream/65">
                      {businessInfo.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-4">
                          <span>{h.day}</span>
                          <span className={h.close ? "text-cream/80" : "text-cream/40"}>
                            {h.close ? `${h.open} – ${h.close}` : h.open}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Mapa */}
          <Reveal delay={0.1}>
            <div className="h-full min-h-[400px] overflow-hidden rounded-2xl border border-white/10">
              <iframe
                title="Mapa Ponto Wine"
                src={mapsSrc}
                className="h-full min-h-[400px] w-full grayscale-[30%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
