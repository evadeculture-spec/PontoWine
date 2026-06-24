/**
 * Informação de negócio da Ponto Wine.
 * Edite este ficheiro para alterar contactos, morada, horários e redes sociais.
 * É a única fonte de verdade para estes dados em toda a aplicação.
 */

export const businessInfo = {
  name: "Ponto Wine Garrafeira",
  shortName: "Ponto Wine",
  tagline: "Garrafeira · Wine Bar · Restaurante",
  city: "Castelo Branco",
  region: "Beira Baixa",

  address: {
    street: "Rua Rei Dom Dinis, 1",
    city: "Castelo Branco",
    postalCode: "6000",
    country: "Portugal",
    // Usado no embed/placeholder do mapa
    mapsQuery: "Rua Rei Dom Dinis 1, Castelo Branco, Portugal",
  },

  phones: {
    reservations: "915 026 512",
    secondary: "272 347 279",
  },

  // Número internacional só com dígitos (para WhatsApp e tel:)
  whatsapp: "351915026512",

  email: "geral@pontowine.pt", // placeholder — substituir pelo email real

  social: {
    instagram: "https://www.instagram.com/pontowine",
    facebook: "https://www.facebook.com/pontowine",
  },

  /** Horário semanal — facilmente editável. `null` = encerrado. */
  hours: [
    { day: "Segunda", open: "Encerrado", close: null as string | null },
    { day: "Terça", open: "12:00", close: "23:00" },
    { day: "Quarta", open: "12:00", close: "23:00" },
    { day: "Quinta", open: "12:00", close: "23:00" },
    { day: "Sexta", open: "12:00", close: "00:00" },
    { day: "Sábado", open: "12:00", close: "00:00" },
    { day: "Domingo", open: "12:00", close: "18:00" },
  ],

  legal: {
    over18Notice:
      "Consuma com moderação. Proibida a venda de bebidas alcoólicas a menores de 18 anos.",
    gdprNotice:
      "Os dados fornecidos serão utilizados exclusivamente para responder ao seu pedido de reserva, encomenda ou proposta. Não são partilhados com terceiros.",
  },
} as const;

/** Link pronto a usar para abrir uma conversa de WhatsApp com mensagem opcional. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${businessInfo.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
