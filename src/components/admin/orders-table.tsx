"use client";

import type { WineOrder, OrderStatus } from "@/lib/types";
import { orderStatusLabels } from "@/lib/types";
import { updateWineOrder } from "@/lib/storage";
import { formatEUR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUSES: OrderStatus[] = ["novo", "em_preparacao", "entregue", "cancelado"];

/**
 * Encomendas de vinho — estrutura preparada para evoluir (Supabase:
 * wine_orders + wine_order_items). No MVP é maioritariamente mock: ainda não
 * existe loja pública a criar encomendas, mas o admin já as consegue gerir.
 */
export function OrdersTable({ data }: { data: WineOrder[] }) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200/80">
        Estrutura de encomendas pronta. Quando a loja/encomenda online estiver
        ativa (Supabase), as encomendas de particulares e restaurantes surgem
        aqui automaticamente.
      </div>

      {data.length === 0 ? (
        <p className="rounded-2xl border border-white/10 p-8 text-center text-cream/50">
          Sem encomendas registadas.
        </p>
      ) : (
        <div className="grid gap-4">
          {data.map((o) => (
            <div
              key={o.id}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-lg text-cream">
                    {o.customer_name}
                  </h4>
                  <p className="text-xs text-cream/50 capitalize">
                    {o.customer_type}
                  </p>
                </div>
                <Badge variant="muted">{orderStatusLabels[o.status]}</Badge>
              </div>

              <ul className="mt-4 space-y-1 text-sm text-cream/70">
                {o.items.map((it, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>
                      {it.quantity}× {it.wine_name}
                    </span>
                    <span>{formatEUR(it.unit_price * it.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-sm text-cream/50">Total estimado</span>
                <span className="font-serif text-lg text-gold">
                  {formatEUR(o.estimated_total)}
                </span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Select
                  value={o.status}
                  onValueChange={(v) =>
                    updateWineOrder(o.id, { status: v as OrderStatus })
                  }
                >
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {orderStatusLabels[s]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  defaultValue={o.internal_notes ?? ""}
                  placeholder="Notas internas..."
                  onBlur={(e) =>
                    updateWineOrder(o.id, { internal_notes: e.target.value })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
