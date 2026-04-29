create table if not exists public.assessment_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  version text not null,
  profile text not null,
  final_score int not null,
  raw_score int,
  hard_cap_triggered boolean default false,
  domain_scores jsonb not null default '{}',
  top_blockers jsonb not null default '[]',
  user_role text,
  company_size text,
  user_agent text,
  referrer text
);

create index if not exists idx_ae_created on public.assessment_events(created_at desc);
create index if not exists idx_ae_profile on public.assessment_events(profile);

create table if not exists public.assessment_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now() not null,
  version text not null,
  email text not null,
  name text,
  phone text,
  company text,
  comment text,
  marketing_opt_in boolean default false,
  profile text not null,
  final_score int not null,
  domain_scores jsonb not null default '{}',
  top_blockers jsonb not null default '[]',
  answers jsonb not null default '{}',
  user_role text,
  company_size text,
  result_url text,
  team_notified_at timestamptz,
  autoresponder_sent_at timestamptz
);

create index if not exists idx_al_created on public.assessment_leads(created_at desc);
create index if not exists idx_al_email on public.assessment_leads(email);

alter table public.assessment_events enable row level security;
alter table public.assessment_leads enable row level security;

drop policy if exists "insert_events" on public.assessment_events;
create policy "insert_events" on public.assessment_events
  for insert
  with check (true);

drop policy if exists "insert_leads" on public.assessment_leads;
create policy "insert_leads" on public.assessment_leads
  for insert
  with check (true);
