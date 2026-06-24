import { createBrowserClient } from "@supabase/ssr";

/**
 * Cliente Supabase para o browser.
 *
 * Devolve `null` quando as variáveis de ambiente não estão definidas — nesse
 * caso a aplicação corre em MODO DEMO (persistência em localStorage).
 * Ver src/lib/storage.ts.
 */
export function getSupabaseBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createBrowserClient(url, key);
}

/** True se o Supabase estiver configurado (ambiente de produção). */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
