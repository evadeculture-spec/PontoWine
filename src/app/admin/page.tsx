"use client";

import { useEffect, useState } from "react";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminLogin } from "@/components/admin/admin-login";
import { AdminShell } from "@/components/admin/admin-shell";

/**
 * Rota /admin — não aparece no menu público.
 *
 * No MVP o acesso é controlado por uma password demo (ver src/lib/admin-auth.ts).
 * Em produção, substituir por Supabase Auth. O painel funciona em modo demo
 * (dados em localStorage) enquanto o Supabase não estiver configurado.
 */
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setAuthed(isAdminAuthenticated());
    setReady(true);
  }, []);

  if (!ready) return null;

  return authed ? (
    <AdminShell onLogout={() => setAuthed(false)} />
  ) : (
    <AdminLogin onSuccess={() => setAuthed(true)} />
  );
}
