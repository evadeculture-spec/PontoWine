"use client";

import { useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Grape, Wine as WineIcon, Thermometer, UtensilsCrossed } from "lucide-react";
import { Bottle } from "@/components/3d/wine-bottle";
import { wines } from "@/data/wines";
import { cn } from "@/lib/utils";

/** Deteta suporte a WebGL para decidir entre 3D e fallback 2D. */
function hasWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const example = wines.find((w) => w.isFeatured) ?? wines[0];

const infoCards = [
  { icon: MapPin, label: "Região", value: example.region },
  { icon: Grape, label: "Castas", value: example.grapes.join(", ") },
  { icon: WineIcon, label: "Notas de prova", value: example.description.split(".")[0] },
  { icon: Thermometer, label: "Temperatura ideal", value: example.temperature },
  { icon: UtensilsCrossed, label: "Harmonização", value: example.pairing },
];

function InfoCard({
  icon: Icon,
  label,
  value,
  delay,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ duration: 0.35, delay }}
      className="glass rounded-xl p-3 shadow-lg"
    >
      <div className="flex items-center gap-2 text-gold">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="mt-1 text-sm text-cream/90 line-clamp-2">{value}</p>
    </motion.div>
  );
}

/** Fallback 2D elegante quando o WebGL não está disponível. */
function BottleFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-72 w-24 rounded-[40%_40%_18%_18%/12%_12%_8%_8%] bg-gradient-to-b from-wine-400 via-wine-600 to-wine-800 shadow-2xl shadow-wine-900/50">
        <div className="absolute -top-10 left-1/2 h-12 w-7 -translate-x-1/2 rounded-md bg-cork" />
        <div className="absolute -top-3 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full bg-gold/80" />
        <div className="absolute top-28 left-1/2 h-20 w-20 -translate-x-1/2 rounded-md bg-cream/95 shadow-inner">
          <div className="mt-3 h-1.5 w-12 mx-auto rounded bg-wine-500" />
          <div className="mt-2 h-1 w-8 mx-auto rounded bg-stone/50" />
        </div>
      </div>
    </div>
  );
}

export function BottleHero() {
  const [mounted, setMounted] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWebgl(hasWebGL());
  }, []);

  const cardPositions = useMemo(
    () => [
      "left-0 top-4",
      "right-0 top-16",
      "left-2 bottom-24",
      "right-2 bottom-8",
      "left-1/2 -translate-x-1/2 bottom-0",
    ],
    []
  );

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Halo de luz */}
      <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/10 blur-3xl" />

      {/* Canvas 3D ou fallback */}
      <button
        type="button"
        onClick={() => setExploded((v) => !v)}
        aria-pressed={exploded}
        aria-label={
          exploded ? "Montar a garrafa" : "Desmontar a garrafa para ver detalhes"
        }
        className="absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 rounded-full"
      >
        {mounted && webgl ? (
          <Canvas
            camera={{ position: [0, 0.5, 5.2], fov: 38 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            frameloop="always"
          >
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 6, 4]} intensity={1.4} />
            <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#c9a24b" />
            <spotLight position={[0, 6, 2]} intensity={0.8} angle={0.4} penumbra={1} />
            <Bottle exploded={exploded} />
          </Canvas>
        ) : (
          mounted && <BottleFallback />
        )}
      </button>

      {/* Cards informativos (overlay) — desktop posicionados, mobile em lista */}
      <AnimatePresence>
        {exploded && (
          <>
            {/* Desktop / tablet */}
            <div className="pointer-events-none absolute inset-0 hidden sm:block">
              {infoCards.map((c, i) => (
                <div
                  key={c.label}
                  className={cn("absolute w-40", cardPositions[i])}
                >
                  <InfoCard {...c} delay={i * 0.06} />
                </div>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Lista de detalhes (mobile + acessibilidade) */}
      <AnimatePresence>
        {exploded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute left-0 right-0 top-full mt-4 grid grid-cols-1 gap-2 sm:hidden"
          >
            {infoCards.map((c, i) => (
              <InfoCard key={c.label} {...c} delay={i * 0.05} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dica + botão acessível */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center sm:-bottom-10">
        <button
          type="button"
          onClick={() => setExploded((v) => !v)}
          className="text-xs uppercase tracking-[0.2em] text-gold/80 transition-colors hover:text-gold"
        >
          {exploded ? "↻ Montar garrafa" : "Tocar para ver detalhes do vinho"}
        </button>
      </div>
    </div>
  );
}
