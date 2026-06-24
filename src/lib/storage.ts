"use client";

/**
 * Camada de persistência em MODO DEMO (localStorage).
 *
 * ⚠️ AVISO DE SEGURANÇA
 * localStorage NÃO é segurança real: os dados ficam no browser do utilizador,
 * são legíveis/editáveis por qualquer pessoa com acesso ao dispositivo e não
 * substituem uma base de dados protegida por RLS.
 *
 * Esta camada existe apenas para o MVP funcionar sem backend. Quando o
 * Supabase estiver configurado (ver isSupabaseConfigured), estas funções devem
 * ser substituídas por chamadas ao Supabase. A assinatura foi pensada para
 * tornar essa migração simples.
 */

import { demoId } from "@/lib/utils";
import type { B2BLead, Reservation, WineOrder } from "@/lib/types";
import { wines as seedWines } from "@/data/wines";
import type { Wine as CatalogWine } from "@/data/wines";

const KEYS = {
  reservations: "pw_reservations",
  b2b: "pw_b2b_leads",
  orders: "pw_wine_orders",
  wines: "pw_wines",
} as const;

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    // Notifica componentes (ex.: admin) de que os dados mudaram.
    window.dispatchEvent(new CustomEvent("pw-storage", { detail: { key } }));
  } catch {
    /* quota / privado — ignora silenciosamente no MVP */
  }
}

function nowISO() {
  return new Date().toISOString();
}

/* ----------------------------- Reservas ----------------------------- */

export function getReservations(): Reservation[] {
  return read<Reservation[]>(KEYS.reservations, []);
}

export function addReservation(
  input: Omit<Reservation, "id" | "created_at" | "updated_at" | "status">
): Reservation {
  const record: Reservation = {
    ...input,
    id: demoId(),
    status: "pendente",
    created_at: nowISO(),
    updated_at: nowISO(),
  };
  write(KEYS.reservations, [record, ...getReservations()]);
  return record;
}

export function updateReservation(id: string, patch: Partial<Reservation>): void {
  write(
    KEYS.reservations,
    getReservations().map((r) =>
      r.id === id ? { ...r, ...patch, updated_at: nowISO() } : r
    )
  );
}

/* ----------------------------- Leads B2B ----------------------------- */

export function getB2BLeads(): B2BLead[] {
  return read<B2BLead[]>(KEYS.b2b, []);
}

export function addB2BLead(
  input: Omit<B2BLead, "id" | "created_at" | "updated_at" | "status">
): B2BLead {
  const record: B2BLead = {
    ...input,
    id: demoId(),
    status: "novo",
    created_at: nowISO(),
    updated_at: nowISO(),
  };
  write(KEYS.b2b, [record, ...getB2BLeads()]);
  return record;
}

export function updateB2BLead(id: string, patch: Partial<B2BLead>): void {
  write(
    KEYS.b2b,
    getB2BLeads().map((l) =>
      l.id === id ? { ...l, ...patch, updated_at: nowISO() } : l
    )
  );
}

/* --------------------------- Encomendas --------------------------- */

export function getWineOrders(): WineOrder[] {
  return read<WineOrder[]>(KEYS.orders, []);
}

export function updateWineOrder(id: string, patch: Partial<WineOrder>): void {
  write(
    KEYS.orders,
    getWineOrders().map((o) =>
      o.id === id ? { ...o, ...patch, updated_at: nowISO() } : o
    )
  );
}

/* ----------------------- Catálogo (CRUD demo) ----------------------- */

export function getWines(): CatalogWine[] {
  const stored = read<CatalogWine[] | null>(KEYS.wines, null);
  if (stored && stored.length) return stored;
  // Primeira utilização: semeia a partir de src/data/wines.ts
  write(KEYS.wines, seedWines);
  return seedWines;
}

export function saveWines(list: CatalogWine[]): void {
  write(KEYS.wines, list);
}

export function upsertWine(wine: CatalogWine): void {
  const list = getWines();
  const idx = list.findIndex((w) => w.id === wine.id);
  if (idx >= 0) {
    list[idx] = wine;
  } else {
    list.unshift(wine);
  }
  saveWines([...list]);
}

export function deleteWine(id: string): void {
  saveWines(getWines().filter((w) => w.id !== id));
}

export function resetWines(): void {
  saveWines(seedWines);
}

// Re-export para conveniência de tipos no admin.
export type { CatalogWine as Wine };

/** Converte registos em CSV (admin export). */
export function toCSV(rows: Record<string, unknown>[]): string {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    const s = v == null ? "" : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const lines = [
    headers.join(","),
    ...rows.map((r) => headers.map((h) => escape(r[h])).join(",")),
  ];
  return lines.join("\n");
}

export function downloadCSV(filename: string, rows: Record<string, unknown>[]): void {
  const csv = toCSV(rows);
  const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
