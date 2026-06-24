import type { Metadata } from "next";
import { businessInfo } from "@/data/business-info";

export const metadata: Metadata = {
  title: "Termos e Condições",
};

export default function TermsPage() {
  return (
    <>
      <h1>Termos e Condições</h1>
      <p className="text-sm text-cream/50">Última atualização: {new Date().getFullYear()}</p>

      <h2>1. Idade mínima</h2>
      <p>
        Este site destina-se exclusivamente a maiores de 18 anos. A venda de
        bebidas alcoólicas a menores de 18 anos é proibida por lei.
      </p>

      <h2>2. Reservas</h2>
      <p>
        Os pedidos de reserva efetuados através do site estão sujeitos a
        confirmação por parte da {businessInfo.shortName}. Uma reserva só é
        considerada válida após contacto de confirmação.
      </p>

      <h2>3. Propostas B2B e encomendas</h2>
      <p>
        Os pedidos de proposta comercial não constituem um contrato de
        fornecimento. As condições, preços e disponibilidade são confirmados
        caso a caso pela nossa equipa.
      </p>

      <h2>4. Consumo responsável</h2>
      <p>{businessInfo.legal.over18Notice}</p>

      <h2>5. Contacto</h2>
      <p>
        Para qualquer questão sobre estes termos, contacte-nos através do
        telefone {businessInfo.phones.reservations}.
      </p>
    </>
  );
}
