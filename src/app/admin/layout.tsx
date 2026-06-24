import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Administração",
  // O painel é privado — nunca deve ser indexado.
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
