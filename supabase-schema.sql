-- ============================================================================
-- Ponto Wine — Esquema da base de dados (Supabase / PostgreSQL)
-- ----------------------------------------------------------------------------
-- Execute este script no SQL Editor do Supabase para criar a estrutura.
-- Inclui tabelas, gatilho de `updated_at` e políticas RLS de base.
--
-- Modelo de segurança (resumo):
--   * INSERT público é permitido nos formulários (reservas, leads B2B), para
--     que o site funcione sem autenticação. NÃO há SELECT público.
--   * A leitura/gestão (SELECT/UPDATE/DELETE) é reservada a administradores
--     (tabela admin_users / utilizadores autenticados).
--   * Ajuste as políticas à sua realidade antes de ir para produção.
-- ============================================================================

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Função utilitária: manter updated_at automaticamente
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- ENUMs de estado
-- ---------------------------------------------------------------------------
do $$ begin
  create type reservation_status as enum ('pendente','confirmada','cancelada','concluida');
exception when duplicate_object then null; end $$;

do $$ begin
  create type b2b_status as enum ('novo','contactado','proposta_enviada','cliente_ativo','perdido');
exception when duplicate_object then null; end $$;

do $$ begin
  create type order_status as enum ('novo','em_preparacao','entregue','cancelado');
exception when duplicate_object then null; end $$;

do $$ begin
  create type business_type as enum ('restaurante','hotel','bar','loja','evento','outro');
exception when duplicate_object then null; end $$;

-- ===========================================================================
-- TABELA: reservations
-- ===========================================================================
create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status reservation_status not null default 'pendente',
  name text not null,
  phone text not null,
  email text not null,
  date date not null,
  time text not null,
  party_size int not null check (party_size > 0),
  kind text not null,
  notes text
);

drop trigger if exists trg_reservations_updated on public.reservations;
create trigger trg_reservations_updated
  before update on public.reservations
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- TABELA: b2b_leads
-- ===========================================================================
create table if not exists public.b2b_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status b2b_status not null default 'novo',
  company_name text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  nif text,
  business_type business_type not null default 'restaurante',
  monthly_volume text,
  wine_types text,
  message text,
  internal_notes text
);

drop trigger if exists trg_b2b_updated on public.b2b_leads;
create trigger trg_b2b_updated
  before update on public.b2b_leads
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- TABELA: wines (catálogo)
-- ===========================================================================
create table if not exists public.wines (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'ativo',
  name text not null,
  region text not null,
  type text not null,
  producer text,
  price numeric(10,2) not null default 0,
  stock int not null default 0,
  description text,
  pairing text,
  temperature text,
  grapes text[] default '{}',
  is_featured boolean not null default false,
  b2b_available boolean not null default false
);

drop trigger if exists trg_wines_updated on public.wines;
create trigger trg_wines_updated
  before update on public.wines
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- TABELA: wine_orders + wine_order_items
-- ===========================================================================
create table if not exists public.wine_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status order_status not null default 'novo',
  customer_name text not null,
  customer_type text not null default 'particular', -- particular | restaurante
  estimated_total numeric(10,2) not null default 0,
  internal_notes text
);

drop trigger if exists trg_orders_updated on public.wine_orders;
create trigger trg_orders_updated
  before update on public.wine_orders
  for each row execute function public.set_updated_at();

create table if not exists public.wine_order_items (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  order_id uuid not null references public.wine_orders(id) on delete cascade,
  wine_id uuid references public.wines(id) on delete set null,
  wine_name text not null,
  quantity int not null check (quantity > 0),
  unit_price numeric(10,2) not null default 0
);

-- ===========================================================================
-- TABELA: admin_notes (notas internas genéricas)
-- ===========================================================================
create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  entity_type text not null, -- 'reservation' | 'b2b_lead' | 'wine_order'
  entity_id uuid not null,
  note text not null,
  author uuid references auth.users(id) on delete set null
);

drop trigger if exists trg_admin_notes_updated on public.admin_notes;
create trigger trg_admin_notes_updated
  before update on public.admin_notes
  for each row execute function public.set_updated_at();

-- ===========================================================================
-- TABELA: admin_users (quem pode gerir o painel)
-- ===========================================================================
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  email text,
  role text not null default 'admin'
);

-- Função auxiliar: o utilizador autenticado é admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (
    select 1 from public.admin_users where id = auth.uid()
  );
$$ language sql security definer stable;

-- ===========================================================================
-- ROW LEVEL SECURITY
-- ===========================================================================
alter table public.reservations    enable row level security;
alter table public.b2b_leads        enable row level security;
alter table public.wines            enable row level security;
alter table public.wine_orders      enable row level security;
alter table public.wine_order_items enable row level security;
alter table public.admin_notes      enable row level security;
alter table public.admin_users      enable row level security;

-- --- Submissões públicas (apenas INSERT, sem leitura) ---
drop policy if exists "public insert reservations" on public.reservations;
create policy "public insert reservations"
  on public.reservations for insert
  to anon, authenticated
  with check (true);

drop policy if exists "public insert b2b" on public.b2b_leads;
create policy "public insert b2b"
  on public.b2b_leads for insert
  to anon, authenticated
  with check (true);

-- --- Catálogo de vinhos: leitura pública, escrita só admin ---
drop policy if exists "public read wines" on public.wines;
create policy "public read wines"
  on public.wines for select
  to anon, authenticated
  using (status = 'ativo');

drop policy if exists "admin manage wines" on public.wines;
create policy "admin manage wines"
  on public.wines for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- --- Gestão reservada a admins (SELECT/UPDATE/DELETE) ---
drop policy if exists "admin manage reservations" on public.reservations;
create policy "admin manage reservations"
  on public.reservations for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin manage b2b" on public.b2b_leads;
create policy "admin manage b2b"
  on public.b2b_leads for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin manage orders" on public.wine_orders;
create policy "admin manage orders"
  on public.wine_orders for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin manage order items" on public.wine_order_items;
create policy "admin manage order items"
  on public.wine_order_items for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin manage notes" on public.admin_notes;
create policy "admin manage notes"
  on public.admin_notes for all
  to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin read admins" on public.admin_users;
create policy "admin read admins"
  on public.admin_users for select
  to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Para tornar um utilizador admin, depois de o criar em Authentication:
--   insert into public.admin_users (id, email) values ('<uuid-do-user>', 'admin@pontowine.pt');
-- ---------------------------------------------------------------------------
