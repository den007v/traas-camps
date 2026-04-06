-- Выполните в Supabase → SQL Editor → New query → Run (один раз).
-- Таблица заявок с формы «Связаться» (имя должно совпадать с кодом API).

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  phone text not null,
  email text not null,
  messenger text,
  topic text not null,
  topic_label text not null
);

comment on table public.contact_submissions is 'Заявки с лендинга TraaS & Camps';

alter table public.contact_submissions enable row level security;

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

-- Если раньше случайно создали таблицу с именем "c", удалите её:
-- drop table if exists public.c;
