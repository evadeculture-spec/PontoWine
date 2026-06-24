import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logótipo da Ponto Wine — recriação fiel do wordmark original.
 *
 * O logótipo da marca é um wordmark art-deco fino que diz "PONTO WINE" com
 * "GARRAFEIRA" em maiúsculas espaçadas por baixo (ver fotografias da marca).
 * Esta versão reproduz esse espírito com a tipografia Poiret One, sem inventar
 * um símbolo novo.
 *
 * 👉 PARA USAR O FICHEIRO OFICIAL (ex.: export vetorial do logótipo):
 * 1. Coloque-o em `public/brand/` como `logo.svg` (ou `logo.png` em alta
 *    resolução, transparente).
 * 2. Mude `HAS_REAL_LOGO` para `true` (ajuste `LOGO_SRC` se necessário).
 */
const HAS_REAL_LOGO = false;
const LOGO_SRC = "/brand/logo.svg";

interface LogoProps {
  className?: string;
  /** Mostra o wordmark completo; se false, mostra um monograma compacto. */
  showWordmark?: boolean;
  /** light = lettering claro (fundos escuros) · dark = bordô (fundos claros). */
  variant?: "light" | "dark";
}

export function Logo({
  className,
  showWordmark = true,
  variant = "light",
}: LogoProps) {
  if (HAS_REAL_LOGO) {
    return (
      <Image
        src={LOGO_SRC}
        alt="Ponto Wine Garrafeira"
        width={200}
        height={64}
        priority
        // object-contain evita deformação; filtro subtil melhora nitidez de PNG
        className={cn("h-auto w-auto object-contain [filter:contrast(1.04)]", className)}
      />
    );
  }

  const primary = variant === "light" ? "text-cream" : "text-wine-600";

  // Monograma compacto (ex.: cabeçalho do admin)
  if (!showWordmark) {
    return (
      <span
        className={cn(
          "font-display text-2xl tracking-[0.15em] leading-none",
          primary,
          className
        )}
        aria-label="Ponto Wine Garrafeira"
      >
        P<span className="text-gold">W</span>
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex select-none flex-col items-start leading-none", className)}
      aria-label="Ponto Wine Garrafeira"
    >
      <span className="font-display text-xl tracking-[0.22em] sm:text-2xl">
        <span className={primary}>PONTO</span>
        <span className="text-gold-sheen ml-[0.3em]">WINE</span>
      </span>
      <span className="mt-1 self-end pr-[0.1em] text-[8px] font-medium uppercase tracking-[0.5em] text-gold/80 sm:text-[9px]">
        Garrafeira
      </span>
    </span>
  );
}
