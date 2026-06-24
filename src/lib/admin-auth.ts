"use client";

/**
 * Autenticação do painel admin.
 *
 * ⚠️ MODO DEMO: a verificação abaixo é apenas uma porta simbólica para o MVP.
 * NÃO é segurança real — a "password" está no cliente e qualquer pessoa com
 * acesso ao código a pode ler. Serve apenas para impedir acesso acidental.
 *
 * Em produção, substituir por Supabase Auth (ver isSupabaseConfigured) com
 * RLS e uma tabela `admin_users`. O guard deve então validar a sessão real.
 */

const SESSION_KEY = "pw_admin_session";

// Password demo — documentada no README. Trocar/remover em produção.
const DEMO_PASSWORD = "pontowine";

export function isAdminAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_KEY) === "1";
}

export function adminLogin(password: string): boolean {
  if (password === DEMO_PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, "1");
    return true;
  }
  return false;
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY);
}
