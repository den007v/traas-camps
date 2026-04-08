-- Выполнить один раз в Supabase SQL Editor.
-- Анонимная аналитика прохождения теста AI Readiness.

create table if not exists public.assessment_ai_readiness_sessions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  role text,
  company_size text,
  industry text,
  primary_challenge text,
  total_score int not null,
  level_id text not null,
  answers jsonb not null
);

comment on table public.assessment_ai_readiness_sessions is 'Анонимные сессии теста AI Readiness';

alter table public.assessment_ai_readiness_sessions enable row level security;

create index if not exists assessment_ai_readiness_sessions_created_at_idx
  on public.assessment_ai_readiness_sessions (created_at desc);
