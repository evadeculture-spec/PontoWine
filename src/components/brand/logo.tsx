import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logótipo da Ponto Wine.
 *
 * 👉 COMO COLOCAR O LOGO ORIGINAL
 * 1. Coloque o ficheiro do logo em `public/brand/` (idealmente SVG; em
 *    alternativa PNG transparente em alta resolução), com o nome
 *    `logo.svg` ou `logo.png`.
 * 2. Mude a constante `HAS_REAL_LOGO` para `true`.
 * 3. Ajuste `LOGO_SRC` se usar outro nome/extensão.
 *
 * Enquanto não existir logo, é mostrado um placeholder elegante (wordmark)
 * que mantém a personalidade vínica da marca, sem inventar um símbolo novo.
 */
const HAS_REAL_LOGO = false;
const LOGO_SRC = "/brand/logo.svg";

interface LogoProps {
  className?: string;
  /** Mostra o wordmark "Ponto Wine" ao lado do símbolo. */
  showWordmark?: boolean;
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
        width={180}
        height={56}
        priority
        // object-contain evita deformação; filtro subtil melhora nitidez de PNG
        className={cn("h-auto w-auto object-contain [filter:contrast(1.04)]", className)}
      />
    );
  }

  // ---- Placeholder elegante (wordmark) ----
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 select-none",
        className
      )}
      aria-label="Ponto Wine Garrafeira"
    >
      <span className="relative flex h-9 w-9 items-center justify-center">
        {/* Símbolo procedural: gota/ponto de vinho sobre anel dourado */}
        <svg viewBox="0 0 40 40" className="h-9 w-9" aria-hidden="true">
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="none"
            stroke="url(#pw-gold)"
            strokeWidth="1.5"
          />
          <path
            d="M20 9 C24 16 27 20 27 24 a7 7 0 0 1 -14 0 C13 20 16 16 20 9 Z"
            fill="url(#pw-wine)"
          />
          <defs>
            <linearGradient id="pw-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#E6C97A" />
              <stop offset="100%" stopColor="#A07E33" />
            </linearGradient>
            <linearGradient id="pw-wine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7B1E2B" />
              <stop offset="100%" stopColor="#3D0A0E" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-serif text-lg font-semibold tracking-wide",
              variant === "light" ? "text-cream" : "text-ink"
            )}
          >
            Ponto Wine
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-gold/80">
            Garrafeira
          </span>
        </span>
      )}
    </span>
  );
}
