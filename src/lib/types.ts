/**
 * Tipos partilhados de domínio (reservas, leads B2B, encomendas).
 * Espelham o esquema Supabase em supabase-schema.sql.
 */

export type ReservationStatus =
  | "pendente"
  | "confirmada"
  | "cancelada"
  | "concluida";

export type ReservationKind =
  | "jantar"
  | "tapas"
  | "prova"
  | "evento"
  | "outro";

export interface Reservation {
  id: string;
  created_at: string;
  updated_at: string;
  status: ReservationStatus;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  party_size: number;
  kind: ReservationKind;
  notes?: string;
}

export type B2BStatus =
  | "novo"
  | "contactado"
  | "proposta_enviada"
  | "cliente_ativo"
  | "perdido";

export type BusinessType =
  | "restaurante"
  | "hotel"
  | "bar"
  | "loja"
  | "evento"
  | "outro";

export interface B2BLead {
  id: string;
  created_at: string;
  updated_at: string;
  status: B2BStatus;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string;
  location: string;
  nif?: string;
  business_type: BusinessType;
  monthly_volume?: string;
  wine_types?: string;
  message?: string;
  internal_notes?: string;
}

export type OrderStatus = "novo" | "em_preparacao" | "entregue" | "cancelado";

export interface WineOrderItem {
  wine_id: string;
  wine_name: string;
  quantity: number;
  unit_price: number;
}

export interface WineOrder {
  id: string;
  created_at: string;
  updated_at: string;
  status: OrderStatus;
  customer_name: string;
  customer_type: "particular" | "restaurante";
  items: WineOrderItem[];
  estimated_total: number;
  internal_notes?: string;
}

/** Labels legíveis (pt-PT) para estados, usados no admin. */
export const reservationStatusLabels: Record<ReservationStatus, string> = {
  pendente: "Pendente",
  confirmada: "Confirmada",
  cancelada: "Cancelada",
  concluida: "Concluída",
};

export const b2bStatusLabels: Record<B2BStatus, string> = {
  novo: "Novo",
  contactado: "Contactado",
  proposta_enviada: "Proposta enviada",
  cliente_ativo: "Cliente ativo",
  perdido: "Perdido",
};

export const orderStatusLabels: Record<OrderStatus, string> = {
  novo: "Novo",
  em_preparacao: "Em preparação",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

export const businessTypeLabels: Record<BusinessType, string> = {
  restaurante: "Restaurante",
  hotel: "Hotel",
  bar: "Bar",
  loja: "Loja",
  evento: "Evento",
  outro: "Outro",
};

export const reservationKindLabels: Record<ReservationKind, string> = {
  jantar: "Jantar",
  tapas: "Tapas",
  prova: "Prova de vinhos",
  evento: "Evento",
  outro: "Outro",
};
