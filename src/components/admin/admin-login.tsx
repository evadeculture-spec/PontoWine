"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { adminLogin } from "@/lib/admin-auth";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (adminLogin(password)) {
      setError("");
      onSuccess();
    } else {
      setError("Password incorreta.");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="texture-paper w-full max-w-sm rounded-2xl border border-gold/20 bg-wine-800/80 p-8 shadow-2xl">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <div className="mb-6 text-center">
          <span className="inline-flex rounded-full bg-gold/10 p-3 text-gold">
            <Lock className="h-5 w-5" />
          </span>
          <h1 className="mt-3 font-serif text-2xl text-cream">Painel privado</h1>
          <p className="mt-1 text-sm text-cream/60">Acesso reservado à equipa.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-pw">Password</Label>
            <Input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
            />
            {error && <p className="text-xs text-red-300">{error}</p>}
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>

        {!isSupabaseConfigured() && (
          <p className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3 text-[11px] leading-relaxed text-amber-200/80">
            <strong>Modo demo:</strong> sem Supabase configurado. Os dados vivem
            no localStorage deste browser e não são segurança real. Password
            demo no README.
          </p>
        )}
      </div>
    </div>
  );
}
