"use client";

import { CalendarClock, Building2, Package, Mail } from "lucide-react";
import type { B2BLead, Reservation, WineOrder } from "@/lib/types";
import {
  reservationStatusLabels,
  b2bStatusLabels,
  reservationKindLabels,
} from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface Props {
  reservations: Reservation[];
  leads: B2BLead[];
  orders: WineOrder[];
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof CalendarClock;
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
      <div className="flex items-center justify-between">
        <span className="rounded-xl bg-gold/10 p-2.5 text-gold">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-serif text-3xl text-cream">{value}</span>
      </div>
      <p className="mt-3 text-sm font-medium text-cream/80">{label}</p>
      <p className="text-xs text-cream/50">{hint}</p>
    </div>
  );
}

export function Dashboard({ reservations, leads, orders }: Props) {
  const pendingReservations = reservations.filter((r) => r.status === "pendente");
  const newLeads = leads.filter((l) => l.status === "novo");

  const upcoming = [...reservations]
    .filter((r) => r.status !== "cancelada")
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    .slice(0, 5);

  const latestContacts = [...leads]
    .sort((a, b) => b.created_at.localeCompare(a.created_at))
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={CalendarClock}
          label="Reservas pendentes"
          value={pendingReservations.length}
          hint={`${reservations.length} no total`}
        />
        <StatCard
          icon={Building2}
          label="Pedidos B2B"
          value={newLeads.length}
          hint={`${leads.length} no total`}
        />
        <StatCard
          icon={Package}
          label="Encomendas"
          value={orders.length}
          hint="estrutura preparada"
        />
        <StatCard
          icon={Mail}
          label="Contactos recentes"
          value={latestContacts.length}
          hint="últimos leads"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Próximas reservas */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="font-serif text-lg text-cream">Próximas reservas</h3>
          <div className="mt-4 divide-y divide-white/5">
            {upcoming.length === 0 && (
              <p className="py-6 text-sm text-cream/50">
                Sem reservas registadas. As submissões da landing page aparecem aqui.
              </p>
            )}
            {upcoming.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-cream">{r.name}</p>
                  <p className="text-xs text-cream/50">
                    {r.date} · {r.time} · {r.party_size} pax ·{" "}
                    {reservationKindLabels[r.kind]}
                  </p>
                </div>
                <Badge variant={r.status === "pendente" ? "warning" : "success"}>
                  {reservationStatusLabels[r.status]}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Últimos contactos */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h3 className="font-serif text-lg text-cream">Últimos contactos B2B</h3>
          <div className="mt-4 divide-y divide-white/5">
            {latestContacts.length === 0 && (
              <p className="py-6 text-sm text-cream/50">
                Sem pedidos B2B registados.
              </p>
            )}
            {latestContacts.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium text-cream">{l.company_name}</p>
                  <p className="text-xs text-cream/50">
                    {l.contact_name} · {l.location}
                  </p>
                </div>
                <Badge variant="muted">{b2bStatusLabels[l.status]}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
