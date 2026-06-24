/**
 * Eventos e provas da Ponto Wine. Edite livremente.
 * Datas podem ser concretas ou "Sob consulta".
 */

export interface WineEvent {
  id: string;
  title: string;
  date: string; // texto livre: "12 Julho" ou "Sob consulta"
  kind: "Prova" | "Jantar" | "Evento privado" | "Empresas" | "Menu especial";
  description: string;
  spots?: string;
}

export const events: WineEvent[] = [
  {
    id: "prova-beira-interior",
    title: "Prova: Os granitos da Beira Interior",
    date: "Sob consulta",
    kind: "Prova",
    description:
      "Uma viagem guiada pelos vinhos de altitude da nossa região, com harmonização de queijos e enchidos.",
    spots: "Lugares limitados",
  },
  {
    id: "jantar-vinico-douro",
    title: "Jantar vínico — Douro a copo",
    date: "Sob consulta",
    kind: "Jantar",
    description:
      "Cinco momentos à mesa, cinco vinhos do Douro escolhidos a dedo. Uma noite para recordar.",
    spots: "Por marcação",
  },
  {
    id: "evento-empresas",
    title: "Experiências para empresas",
    date: "Sob consulta",
    kind: "Empresas",
    description:
      "Provas e jantares à medida para equipas e clientes. Um espaço para criar laços à volta do vinho.",
    spots: "Programa personalizado",
  },
  {
    id: "menu-especial",
    title: "Menu de degustação sazonal",
    date: "Sob consulta",
    kind: "Menu especial",
    description:
      "Sabores regionais e produtos de época, pensados para acompanhar a nossa garrafeira.",
    spots: "Reserva recomendada",
  },
];
