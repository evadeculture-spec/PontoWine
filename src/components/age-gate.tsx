"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";
import { businessInfo } from "@/data/business-info";

const STORAGE_KEY = "pw_age_verified";

/**
 * Age gate +18. Mostra um modal ao entrar. A resposta é guardada em
 * localStorage. Se o utilizador indicar que é menor, a navegação é bloqueada
 * com uma mensagem educada.
 */
export function AgeGate() {
  const [status, setStatus] = useState<"loading" | "verified" | "ask" | "denied">(
    "loading"
  );

  useEffect(() => {
    const saved =
      typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved === "yes") setStatus("verified");
    else setStatus("ask");
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "yes");
    setStatus("verified");
  }

  function deny() {
    localStorage.setItem(STORAGE_KEY, "no");
    setStatus("denied");
  }

  if (status === "loading" || status === "verified") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
      >
        <motion.div
          initial={{ scale: 0.94, y: 16, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="texture-paper w-full max-w-md rounded-3xl border border-gold/20 bg-wine-800/90 p-8 text-center shadow-2xl"
        >
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          {status === "ask" ? (
            <>
              <h2
                id="age-gate-title"
                className="font-serif text-2xl font-semibold text-cream"
              >
                Bem-vindo à Ponto Wine
              </h2>
              <p className="mt-3 text-sm text-cream/70">
                Para entrar, confirme que tem idade legal para o consumo de
                bebidas alcoólicas.
              </p>
              <p className="mt-6 font-serif text-lg text-gold">Tem 18 anos ou mais?</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button onClick={accept} size="lg" className="flex-1">
                  Sim, tenho 18+
                </Button>
                <Button onClick={deny} variant="outline" size="lg" className="flex-1">
                  Não
                </Button>
              </div>
              <p className="mt-6 text-[11px] leading-relaxed text-cream/50">
                {businessInfo.legal.over18Notice}
              </p>
            </>
          ) : (
            <>
              <h2 className="font-serif text-2xl font-semibold text-cream">
                Até breve
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-cream/70">
                Lamentamos, mas este site destina-se apenas a maiores de 18 anos.
                Obrigado pela sua compreensão e visite-nos quando tiver idade
                legal para apreciar vinho com moderação.
              </p>
              <p className="mt-6 text-[11px] text-cream/50">
                {businessInfo.legal.over18Notice}
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
