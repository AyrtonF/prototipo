create extension if not exists "pgcrypto";

create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  price numeric(12,2) not null,
  category text not null check (category in ('perfumes', 'joias')),
  description text not null,
  images text[] not null default '{}',
  stock integer not null default 0 check (stock >= 0),
  details text[] not null default '{}',
  tags text[] not null default '{}',
  olfactory_notes jsonb,
  intensity text,
  fixation text,
  concentration text,
  occasion text[] not null default '{}',
  style text[] not null default '{}',
  material text,
  finish text,
  weight numeric(10,2),
  dimensions text,
  featured boolean not null default false,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_active_idx on public.products (active);
create index if not exists products_sort_order_idx on public.products (sort_order);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_products_updated_at on public.products;

create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
on public.products
for select
using (active = true);

drop policy if exists "Authenticated insert products" on public.products;
create policy "Authenticated insert products"
on public.products
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated update products" on public.products;
create policy "Authenticated update products"
on public.products
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated delete products" on public.products;
create policy "Authenticated delete products"
on public.products
for delete
to authenticated
using (true);
