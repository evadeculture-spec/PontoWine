import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <h1 className="font-serif text-4xl text-cream">Página não encontrada</h1>
      <p className="max-w-md text-cream/60">
        Parece que esta garrafa ficou na cave. Voltemos ao início.
      </p>
      <Button asChild>
        <Link href="/">Voltar à página inicial</Link>
      </Button>
    </main>
  );
}
