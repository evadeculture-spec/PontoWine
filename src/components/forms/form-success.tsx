"use client";

import { motion } from "framer-motion";
import { CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormSuccessProps {
  title: string;
  message: string;
  onReset: () => void;
  resetLabel?: string;
}

/** Mensagem de sucesso premium com microanimação "cork pop". */
export function FormSuccess({
  title,
  message,
  onReset,
  resetLabel = "Enviar outro pedido",
}: FormSuccessProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center rounded-2xl border border-gold/20 bg-gold/5 p-10 text-center"
    >
      <motion.div
        initial={{ y: 0, rotate: 0 }}
        animate={{ y: [-2, -14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-4 rounded-full bg-gold/15 p-4 text-gold"
      >
        <CheckCircle2 className="h-9 w-9" />
      </motion.div>
      <h3 className="font-serif text-2xl text-cream">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-cream/70">{message}</p>
      <Button onClick={onReset} variant="outline" className="mt-6">
        <PartyPopper className="h-4 w-4" />
        {resetLabel}
      </Button>
    </motion.div>
  );
}
