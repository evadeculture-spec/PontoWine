"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { B2BLead, B2BStatus } from "@/lib/types";
import { b2bStatusLabels, businessTypeLabels } from "@/lib/types";
import { updateB2BLead, downloadCSV } from "@/lib/storage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES: B2BStatus[] = [
  "novo",
  "contactado",
  "proposta_enviada",
  "cliente_ativo",
  "perdido",
];

export function B2BTable({ data }: { data: B2BLead[] }) {
  const [statusFilter, setStatusFilter] = useState("todos");

  const filtered = useMemo(
    () =>
      data.filter((l) => statusFilter === "todos" || l.status === statusFilter),
    [data, statusFilter]
  );

  function exportCSV() {
    downloadCSV(
      "leads-b2b-pontowine.csv",
      filtered.map((l) => ({
        empresa: l.company_name,
        responsavel: l.contact_name,
        email: l.email,
        telefone: l.phone,
        localidade: l.location,
        nif: l.nif ?? "",
        tipo: businessTypeLabels[l.business_type],
        volume: l.monthly_volume ?? "",
        vinhos: l.wine_types ?? "",
        mensagem: l.message ?? "",
        estado: b2bStatusLabels[l.status],
        notas: l.internal_notes ?? "",
        criado: l.created_at,
      }))
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="w-52">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os estados</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {b2bStatusLabels[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm" className="ml-auto" onClick={exportCSV}>
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.length === 0 && (
          <p className="col-span-full rounded-2xl border border-white/10 p-8 text-center text-cream/50">
            Sem pedidos B2B para este filtro. As submissões da landing page aparecem aqui.
          </p>
        )}
        {filtered.map((l) => (
          <div
            key={l.id}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-serif text-lg text-cream">{l.company_name}</h4>
                <p className="text-xs text-cream/50">
                  {businessTypeLabels[l.business_type]} · {l.location}
                </p>
              </div>
              <Badge variant="muted">{b2bStatusLabels[l.status]}</Badge>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-cream/70">
              <div>
                <dt className="text-cream/40">Responsável</dt>
                <dd>{l.contact_name}</dd>
              </div>
              <div>
                <dt className="text-cream/40">Telefone</dt>
                <dd>{l.phone}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-cream/40">Email</dt>
                <dd>{l.email}</dd>
              </div>
              {l.monthly_volume && (
                <div>
                  <dt className="text-cream/40">Volume / mês</dt>
                  <dd>{l.monthly_volume}</dd>
                </div>
              )}
              {l.wine_types && (
                <div>
                  <dt className="text-cream/40">Vinhos</dt>
                  <dd>{l.wine_types}</dd>
                </div>
              )}
            </dl>

            {l.message && (
              <p className="mt-3 rounded-lg bg-white/[0.03] p-3 text-xs text-cream/60">
                {l.message}
              </p>
            )}

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Select
                value={l.status}
                onValueChange={(v) =>
                  updateB2BLead(l.id, { status: v as B2BStatus })
                }
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {b2bStatusLabels[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                defaultValue={l.internal_notes ?? ""}
                placeholder="Notas internas..."
                onBlur={(e) =>
                  updateB2BLead(l.id, { internal_notes: e.target.value })
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
