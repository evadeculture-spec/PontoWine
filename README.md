# Ponto Wine Garrafeira

Landing page premium e **base de produto digital** para a Ponto Wine — garrafeira,
wine bar e restaurante em Castelo Branco, especialista em vinhos portugueses e
parceira de restaurantes, hotéis e empresas na Beira Baixa.

O projeto começa como landing page pública, mas já está estruturado para evoluir
para **reservas**, **encomendas de vinho**, **pedidos B2B** e um **painel de
administração** privado.

## ✨ Funcionalidades

- **Age gate +18** com persistência em `localStorage`.
- **Hero cinematográfico** com **garrafa 3D interativa** (React Three Fiber,
  geometria procedural — sem `.glb`) que se desmonta em partes com cards
  informativos, fallback 2D e suporte a `prefers-reduced-motion`.
- Secções: Experiência, Vinhos em destaque, **B2B/Restaurantes** (com formulário),
  **Reservas** (com formulário), Eventos e provas, Contactos com mapa.
- **Formulários validados** com Zod + React Hook Form, consentimento RGPD
  obrigatório, e mensagens de sucesso animadas.
- **Painel admin** em `/admin` (privado, fora do menu): dashboard, reservas,
  pedidos B2B, encomendas e CRUD de catálogo, com exportação CSV.
- **Modo demo** (sem backend): tudo persiste em `localStorage`. Pronto para ligar
  ao **Supabase** quando as variáveis de ambiente existirem.
- Design responsivo (mobile-first), animações premium, glassmorphism e textura.

## 🧱 Stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion ·
React Three Fiber + Drei · Zod + React Hook Form · Supabase (preparado) · Vercel.

## 🚀 Instalação e execução local

```bash
# 1. Instalar dependências
npm install

# 2. (Opcional) configurar variáveis de ambiente
cp .env.example .env.local
# preencher as chaves do Supabase se quiser sair do modo demo

# 3. Arrancar em desenvolvimento
npm run dev
# abrir http://localhost:3000

# Build de produção
npm run build && npm run start
```

Sem `.env.local`, a aplicação corre em **modo demo** (dados em `localStorage`).

## 🔐 Aceder ao painel admin

- URL: **`/admin`** (não está no menu público).
- Em **modo demo**, a password é **`pontowine`** (definida em
  `src/lib/admin-auth.ts`). ⚠️ Isto **não é segurança real** — serve apenas para
  evitar acesso acidental no MVP. Troque/remova antes de produção e use Supabase
  Auth.
- As reservas e pedidos B2B submetidos na landing page aparecem automaticamente
  no painel (mesmo browser, modo demo).

## 🗄️ Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute o ficheiro [`supabase-schema.sql`](./supabase-schema.sql)
   (tabelas, triggers e políticas RLS de base).
3. Copie as chaves em *Project Settings → API* para o `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...   # secreta, só servidor
   ```
4. Para tornar um utilizador administrador, crie-o em *Authentication* e depois:
   ```sql
   insert into public.admin_users (id, email) values ('<uuid-do-user>', 'admin@pontowine.pt');
   ```
5. Com as variáveis definidas, os formulários passam a gravar no Supabase em vez
   do `localStorage` (ver `src/lib/storage.ts` e os componentes de formulário).

## ▲ Deploy na Vercel

1. Faça push do repositório para o GitHub.
2. Em [vercel.com](https://vercel.com), importe o projeto (deteta Next.js
   automaticamente).
3. Em *Settings → Environment Variables*, adicione as variáveis do `.env.example`.
4. Deploy. Cada push faz novo deploy.

## ✏️ Onde personalizar

| O quê                         | Ficheiro                                   |
| ----------------------------- | ------------------------------------------ |
| Contactos, morada, horários   | `src/data/business-info.ts`                |
| Catálogo de vinhos            | `src/data/wines.ts`                        |
| Eventos e provas              | `src/data/events.ts`                       |
| Cores, fontes, regras visuais | `tailwind.config.ts`, `src/app/globals.css`, `brand-notes.md` |
| Logótipo                      | `src/components/brand/logo.tsx` + `public/brand/` |
| Textos das secções            | `src/components/sections/*`                |
| Validação de formulários      | `src/lib/validations.ts`                   |
| Esquema da base de dados      | `supabase-schema.sql`                      |

## 🖼️ Logótipo

O repositório não trazia logo, por isso é mostrado um **placeholder elegante**.
Para colocar o logo original, ver as instruções em
[`brand-notes.md`](./brand-notes.md) e em `public/brand/README.md`.

## 🗂️ Estrutura

```
src/
  app/                # rotas (App Router): landing, /admin, legais
  components/
    3d/               # garrafa 3D + fallback
    admin/            # painel de administração
    forms/            # formulários (reservas, B2B)
    sections/         # secções da landing page
    site/             # navbar, footer
    brand/            # logótipo
    ui/               # primitivos shadcn/ui
  data/               # dados editáveis (negócio, vinhos, eventos)
  lib/                # utils, tipos, validações, storage, supabase
public/
  brand/              # logótipos
  images/             # fotografias
supabase-schema.sql   # esquema + RLS
.env.example          # variáveis de ambiente
brand-notes.md        # guia de marca
```

## ⚖️ Legal

Site destinado a **maiores de 18 anos**. *Consuma com moderação. Proibida a venda
de bebidas alcoólicas a menores de 18 anos.* Inclui páginas de Política de
Privacidade e Termos, e consentimento RGPD nos formulários.
