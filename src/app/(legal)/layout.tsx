import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { Footer } from "@/components/site/footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-white/10 py-5">
        <div className="container">
          <Link href="/" aria-label="Início">
            <Logo />
          </Link>
        </div>
      </header>
      <main className="container max-w-3xl py-16 md:py-24">
        <article className="prose-invert space-y-4 text-cream/75 [&_h1]:font-serif [&_h1]:text-4xl [&_h1]:text-cream [&_h2]:mt-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-cream">
          {children}
        </article>
      </main>
      <Footer />
    </>
  );
}
