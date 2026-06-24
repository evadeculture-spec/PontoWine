import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

type CookieToSet = { name: string; value: string; options?: CookieOptions };

/**
 * Cliente Supabase para Server Components / Route Handlers / Server Actions.
 *
 * Devolve `null` quando o Supabase não está configurado (modo demo).
 * Usa a anon key + cookies para respeitar a sessão e o RLS do utilizador.
 *
 * ⚠️ A SUPABASE_SERVICE_ROLE_KEY (que ignora RLS) só deve ser usada em
 * contextos de servidor de confiança e NUNCA exposta ao browser.
 */
export async function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = await cookies();

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Chamado a partir de um Server Component — pode ser ignorado se
          // existir middleware a refrescar a sessão.
        }
      },
    },
  });
}
