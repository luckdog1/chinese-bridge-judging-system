create table if not exists public.judging_state (
  id text primary key,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.judging_state enable row level security;

drop policy if exists "Allow public read judging state" on public.judging_state;
create policy "Allow public read judging state"
on public.judging_state
for select
to anon, authenticated
using (true);

drop policy if exists "Allow public write judging state" on public.judging_state;
create policy "Allow public write judging state"
on public.judging_state
for insert
to anon, authenticated
with check (true);

drop policy if exists "Allow public update judging state" on public.judging_state;
create policy "Allow public update judging state"
on public.judging_state
for update
to anon, authenticated
using (true)
with check (true);

