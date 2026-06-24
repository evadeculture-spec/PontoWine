import { Instagram, Phone, MapPin } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { businessInfo, whatsappLink } from "@/data/business-info";

const quickLinks = [
  { href: "#experiencia", label: "Experiência" },
  { href: "#vinhos", label: "Vinhos em destaque" },
  { href: "#b2b", label: "Restaurantes / B2B" },
  { href: "#reservas", label: "Reservas" },
  { href: "#eventos", label: "Eventos e provas" },
  { href: "#contactos", label: "Contactos" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-ink/60">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              Garrafeira, wine bar e restaurante no centro de {businessInfo.city}.
              Vinhos escolhidos com critério, servidos com proximidade.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">Navegação</h3>
            <ul className="mt-4 space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-cream/60 transition-colors hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">Contactos</h3>
            <ul className="mt-4 space-y-3 text-sm text-cream/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 text-gold/70" />
                <span>
                  {businessInfo.address.street}
                  <br />
                  {businessInfo.address.postalCode} {businessInfo.address.city}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold/70" />
                <a href={`tel:${businessInfo.phones.reservations.replace(/\s/g, "")}`} className="hover:text-gold">
                  {businessInfo.phones.reservations}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold/70" />
                <a href={`tel:${businessInfo.phones.secondary.replace(/\s/g, "")}`} className="hover:text-gold">
                  {businessInfo.phones.secondary}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-2 text-cream/70 transition-colors hover:border-gold/40 hover:text-gold"
                aria-label="WhatsApp"
              >
                <Phone className="h-4 w-4" />
              </a>
              <a
                href={businessInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/10 p-2 text-cream/70 transition-colors hover:border-gold/40 hover:text-gold"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-lg text-cream">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/60">
              <li>
                <a href="/politica-de-privacidade" className="hover:text-gold">
                  Política de privacidade
                </a>
              </li>
              <li>
                <a href="/termos" className="hover:text-gold">
                  Termos e condições
                </a>
              </li>
            </ul>
            <p className="mt-4 rounded-lg border border-gold/20 bg-gold/5 p-3 text-[11px] leading-relaxed text-gold/80">
              {businessInfo.legal.over18Notice}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-cream/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Ponto Wine Garrafeira. Todos os direitos reservados.</p>
          <p>Beba com moderação. Apenas para maiores de 18 anos.</p>
        </div>
      </div>
    </footer>
  );
}
