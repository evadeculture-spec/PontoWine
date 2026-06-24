/**
 * Atmosfera de fundo inspirada no espaço real da Ponto Wine:
 *  - uma "parede de garrafas" subtil (a garrafeira);
 *  - o brilho LED magenta/violeta característico da iluminação;
 *  - pools de luz quente que evocam as lamparinas das mesas.
 *
 * É puramente decorativa (aria-hidden), fixa e fica POR DETRÁS de todo o
 * conteúdo (-z-10), sem prejudicar a legibilidade nem a performance
 * (apenas CSS/SVG, sem imagens pesadas).
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Parede de garrafas — padrão SVG repetido, muito ténue */}
      <svg
        className="absolute inset-0 h-full w-full text-cream/[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="garrafeira"
            width="46"
            height="118"
            patternUnits="userSpaceOnUse"
          >
            {/* rolha */}
            <rect x="20" y="10" width="6" height="5" rx="1.5" fill="currentColor" />
            {/* corpo da garrafa */}
            <path
              d="M20 15 h6 v17 c5 2 6.5 7 6.5 13 v52 a4 4 0 0 1 -4 4 h-11 a4 4 0 0 1 -4 -4 v-52 c0 -6 1.5 -11 6.5 -13 z"
              fill="currentColor"
            />
          </pattern>
          {/* leve madeira: prateleiras horizontais */}
          <linearGradient id="shelf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A9744F" stopOpacity="0" />
            <stop offset="50%" stopColor="#A9744F" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#A9744F" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#garrafeira)" />
      </svg>

      {/* Brilho LED magenta/violeta + lamparina dourada */}
      <div className="absolute -left-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-glow-magenta/20 blur-[130px]" />
      <div className="absolute right-[-12rem] top-1/4 h-[40rem] w-[40rem] rounded-full bg-glow-violet/25 blur-[140px]" />
      <div className="absolute bottom-[-14rem] left-1/3 h-[36rem] w-[36rem] rounded-full bg-gold/[0.08] blur-[130px]" />
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-glow-rose/10 blur-[120px]" />

      {/* Vinheta para manter o conteúdo legível e o ambiente intimista */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(18,10,12,0.85)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/70" />
    </div>
  );
}
