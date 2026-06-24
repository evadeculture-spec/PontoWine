"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getReservations,
  getB2BLeads,
  getWineOrders,
  getWines,
} from "@/lib/storage";
import type { B2BLead, Reservation, WineOrder } from "@/lib/types";
import type { Wine } from "@/data/wines";

/**
 * Lê os dados do MVP (localStorage) e atualiza automaticamente quando algo
 * muda — incluindo submissões feitas na landing page (evento "pw-storage")
 * e alterações noutras tabs (evento nativo "storage").
 */
export function useAdminData() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [leads, setLeads] = useState<B2BLead[]>([]);
  const [orders, setOrders] = useState<WineOrder[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);

  const refresh = useCallback(() => {
    setReservations(getReservations());
    setLeads(getB2BLeads());
    setOrders(getWineOrders());
    setWines(getWines());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("pw-storage", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("pw-storage", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  return { reservations, leads, orders, wines, refresh };
}
