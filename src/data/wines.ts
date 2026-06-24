/**
 * Catálogo de vinhos da Ponto Wine.
 *
 * Esta é a fonte de dados editável do catálogo público e do painel admin
 * (modo demo). A estrutura está preparada para futura migração para Supabase
 * (tabela `wines`) — ver supabase-schema.sql.
 *
 * Para adicionar/editar vinhos: basta alterar o array `wines` abaixo.
 */

export type WineType =
  | "Tinto"
  | "Branco"
  | "Rosé"
  | "Espumante";

export type WineRegion =
  | "Beira Interior"
  | "Douro"
  | "Dão"
  | "Alentejo"
  | "Vinho Verde"
  | "Bairrada";

export interface Wine {
  id: string;
  name: string;
  region: WineRegion;
  type: WineType;
  producer: string;
  /** Preço de referência em euros. */
  price: number;
  /** Stock indicativo (modo demo). */
  stock: number;
  description: string;
  /** Sugestão de harmonização. */
  pairing: string;
  /** Temperatura de serviço ideal. */
  temperature: string;
  /** Castas principais. */
  grapes: string[];
  isFeatured: boolean;
  /** Disponível para fornecimento B2B a profissionais. */
  b2bAvailable: boolean;
}

/** Categorias usadas na grelha "Vinhos em destaque". */
export const wineCategories: {
  key: string;
  label: string;
  kind: "type" | "region";
  blurb: string;
}[] = [
  { key: "Tinto", label: "Tintos", kind: "type", blurb: "Estrutura, fruto e taninos com carácter." },
  { key: "Branco", label: "Brancos", kind: "type", blurb: "Frescura e mineralidade da Beira." },
  { key: "Rosé", label: "Rosés", kind: "type", blurb: "Leveza e cor para qualquer momento." },
  { key: "Espumante", label: "Espumantes", kind: "type", blurb: "Bolha fina para brindar e celebrar." },
  { key: "Beira Interior", label: "Beira Interior", kind: "region", blurb: "O terroir de granito da nossa terra." },
  { key: "Douro", label: "Douro", kind: "region", blurb: "A monumentalidade do vale do Douro." },
  { key: "Dão", label: "Dão", kind: "region", blurb: "Elegância e finura de altitude." },
  { key: "Alentejo", label: "Alentejo", kind: "region", blurb: "Generosidade e calor do sul." },
];

export const wines: Wine[] = [
  {
    id: "bi-granito-tinto",
    name: "Granito Cru Reserva",
    region: "Beira Interior",
    type: "Tinto",
    producer: "Quinta dos Termos",
    price: 18.5,
    stock: 42,
    description:
      "Um tinto de altitude, nascido em solos de granito. Profundo, fresco e com uma assinatura mineral inconfundível da Beira Interior.",
    pairing: "Cabrito assado, queijos curados da Beira",
    temperature: "16–18 °C",
    grapes: ["Touriga Nacional", "Rufete"],
    isFeatured: true,
    b2bAvailable: true,
  },
  {
    id: "douro-reserva-tinto",
    name: "Vale Sagrado Reserva",
    region: "Douro",
    type: "Tinto",
    producer: "Casa do Vale",
    price: 24.0,
    stock: 30,
    description:
      "A força do Douro num copo. Notas de fruta preta madura, especiaria e um final longo e elegante.",
    pairing: "Posta de vitela, caça",
    temperature: "16–18 °C",
    grapes: ["Touriga Nacional", "Touriga Franca", "Tinta Roriz"],
    isFeatured: true,
    b2bAvailable: true,
  },
  {
    id: "dao-branco-encruzado",
    name: "Encruzado de Altitude",
    region: "Dão",
    type: "Branco",
    producer: "Adega da Serra",
    price: 16.0,
    stock: 38,
    description:
      "Encruzado na sua expressão mais elegante: corpo, frescura e uma textura sedosa que pede mesa.",
    pairing: "Peixe grelhado, risoto de cogumelos",
    temperature: "10–12 °C",
    grapes: ["Encruzado"],
    isFeatured: true,
    b2bAvailable: true,
  },
  {
    id: "bi-branco-fonte",
    name: "Fonte Fria Branco",
    region: "Beira Interior",
    type: "Branco",
    producer: "Quinta dos Termos",
    price: 12.5,
    stock: 56,
    description:
      "Fresco e citrino, com a mineralidade do granito. Um branco de prazer imediato, perfeito para tapas.",
    pairing: "Queijo fresco, petiscos do mar",
    temperature: "8–10 °C",
    grapes: ["Síria", "Fonte Cal"],
    isFeatured: false,
    b2bAvailable: true,
  },
  {
    id: "alentejo-tinto-talha",
    name: "Talha de Barro",
    region: "Alentejo",
    type: "Tinto",
    producer: "Herdade do Sobreiro",
    price: 14.0,
    stock: 48,
    description:
      "Vinho de talha, fiel à tradição alentejana. Macio, generoso e profundamente gastronómico.",
    pairing: "Carnes de porco preto, ensopados",
    temperature: "15–17 °C",
    grapes: ["Aragonez", "Trincadeira"],
    isFeatured: false,
    b2bAvailable: true,
  },
  {
    id: "rose-beira",
    name: "Rubor Rosé",
    region: "Beira Interior",
    type: "Rosé",
    producer: "Adega da Serra",
    price: 11.0,
    stock: 60,
    description:
      "Cor de pétala, aroma de frutos vermelhos e uma acidez vibrante. Leveza para qualquer ocasião.",
    pairing: "Saladas, cozinha asiática, aperitivos",
    temperature: "8–10 °C",
    grapes: ["Touriga Nacional"],
    isFeatured: false,
    b2bAvailable: true,
  },
  {
    id: "espumante-bairrada",
    name: "Bruto Reserva",
    region: "Bairrada",
    type: "Espumante",
    producer: "Caves do Atlântico",
    price: 19.5,
    stock: 24,
    description:
      "Método clássico, bolha fina e persistente. Brioche, maçã verde e uma frescura que pede um brinde.",
    pairing: "Ostras, fritos, aperitivos festivos",
    temperature: "6–8 °C",
    grapes: ["Baga", "Maria Gomes"],
    isFeatured: true,
    b2bAvailable: false,
  },
  {
    id: "douro-branco-rabigato",
    name: "Rabigato das Encostas",
    region: "Douro",
    type: "Branco",
    producer: "Casa do Vale",
    price: 17.0,
    stock: 28,
    description:
      "Branco do Douro de grande tensão e frescura. Flores brancas, citrinos e um final salino.",
    pairing: "Marisco, bacalhau, queijos suaves",
    temperature: "9–11 °C",
    grapes: ["Rabigato", "Viosinho"],
    isFeatured: false,
    b2bAvailable: true,
  },
];

export function getFeaturedWines(): Wine[] {
  return wines.filter((w) => w.isFeatured);
}
