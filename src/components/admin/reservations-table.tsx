"use client";

import { useMemo, useState } from "react";
import { Download } from "lucide-react";
import type { Reservation, ReservationStatus } from "@/lib/types";
import { reservationStatusLabels, reservationKindLabels } from "@/lib/types";
import { updateReservation, downloadCSV } from "@/lib/storage";
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

const STATUSES: ReservationStatus[] = [
  "pendente",
  "confirmada",
  "cancelada",
  "concluida",
];

const statusVariant: Record<ReservationStatus, "warning" | "success" | "muted" | "wine"> = {
  pendente: "warning",
  confirmada: "success",
  cancelada: "wine",
  concluida: "muted",
};

export function ReservationsTable({ data }: { data: Reservation[] }) {
  const [statusFilter, setStatusFilter] = useState<string>("todas");
  const [dateFilter, setDateFilter] = useState<string>("");

  const filtered = useMemo(
    () =>
      data.filter(
        (r) =>
          (statusFilter === "todas" || r.status === statusFilter) &&
          (!dateFilter || r.date === dateFilter)
      ),
    [data, statusFilter, dateFilter]
  );

  function exportCSV() {
    downloadCSV(
      "reservas-pontowine.csv",
      filtered.map((r) => ({
        data: r.date,
        hora: r.time,
        nome: r.name,
        telefone: r.phone,
        email: r.email,
        pessoas: r.party_size,
        tipo: reservationKindLabels[r.kind],
        estado: reservationStatusLabels[r.status],
        observacoes: r.notes ?? "",
        criado: r.created_at,
      }))
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="w-44">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todos os estados</SelectItem>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {reservationStatusLabels[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-44">
          <Input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        {dateFilter && (
          <Button variant="ghost" size="sm" onClick={() => setDateFilter("")}>
            Limpar data
          </Button>
        )}
        <Button variant="outline" size="sm" className="ml-auto" onClick={exportCSV}>
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full min-w-[760px] text-sm">
          <thead className="bg-white/[0.03] text-left text-xs uppercase tracking-wider text-cream/50">
            <tr>
              <th className="p-3">Data / Hora</th>
              <th className="p-3">Cliente</th>
              <th className="p-3">Pax</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-cream/50">
                  Sem reservas para os filtros selecionados.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className="hover:bg-white/[0.02]">
                <td className="p-3 text-cream/80">
                  {r.date}
                  <span className="block text-xs text-cream/50">{r.time}</span>
                </td>
                <td className="p-3">
                  <span className="text-cream">{r.name}</span>
                  <span className="block text-xs text-cream/50">{r.phone}</span>
                  <span className="block text-xs text-cream/50">{r.email}</span>
                </td>
                <td className="p-3 text-cream/80">{r.party_size}</td>
                <td className="p-3 text-cream/80">{reservationKindLabels[r.kind]}</td>
                <td className="p-3">
                  <Badge variant={statusVariant[r.status]}>
                    {reservationStatusLabels[r.status]}
                  </Badge>
                </td>
                <td className="p-3">
                  <Select
                    value={r.status}
                    onValueChange={(v) =>
                      updateReservation(r.id, { status: v as ReservationStatus })
                    }
                  >
                    <SelectTrigger className="h-9 w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {reservationStatusLabels[s]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
