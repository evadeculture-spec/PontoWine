import type { Metadata } from "next";
import { businessInfo } from "@/data/business-info";

export const metadata: Metadata = {
  title: "Política de Privacidade",
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Política de Privacidade</h1>
      <p className="text-sm text-cream/50">Última atualização: {new Date().getFullYear()}</p>

      <h2>1. Responsável pelo tratamento</h2>
      <p>
        A {businessInfo.name}, com morada em {businessInfo.address.street},{" "}
        {businessInfo.address.postalCode} {businessInfo.address.city}, é
        responsável pelo tratamento dos dados pessoais recolhidos através deste
        site.
      </p>

      <h2>2. Que dados recolhemos</h2>
      <p>
        Recolhemos apenas os dados que nos fornece voluntariamente nos
        formulários de reserva, pedido de proposta B2B ou contacto: nome,
        telefone, email, e informação relacionada com o seu pedido.
      </p>

      <h2>3. Para que usamos os seus dados</h2>
      <p>
        Os dados são utilizados exclusivamente para responder ao seu pedido —
        confirmar uma reserva, preparar uma proposta ou dar seguimento a um
        contacto. Não são partilhados com terceiros nem utilizados para fins de
        marketing sem o seu consentimento explícito.
      </p>

      <h2>4. Conservação</h2>
      <p>
        Conservamos os seus dados apenas pelo período necessário para a
        finalidade indicada e em cumprimento das obrigações legais aplicáveis.
      </p>

      <h2>5. Os seus direitos</h2>
      <p>
        Tem o direito de aceder, retificar, apagar ou opor-se ao tratamento dos
        seus dados. Para exercer estes direitos, contacte-nos através do
        telefone {businessInfo.phones.reservations} ou do email{" "}
        {businessInfo.email}.
      </p>

      <p className="mt-8 rounded-lg border border-gold/20 bg-gold/5 p-4 text-sm text-gold/80">
        {businessInfo.legal.over18Notice}
      </p>
    </>
  );
}
