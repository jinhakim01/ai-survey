-- 1) 테이블
create table if not exists public.responses (
  id         uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  major      text not null check (major in ('engineering','humanities','business','science','arts')),
  q1 smallint not null check (q1 between 1 and 5),
  q2 smallint not null check (q2 between 1 and 5),
  q3 smallint not null check (q3 between 1 and 5),
  q4 smallint not null check (q4 between 1 and 5),
  q5 smallint not null check (q5 between 1 and 5),
  q6 smallint not null check (q6 between 1 and 5),
  is_dummy   boolean not null default false
);

-- 2) RLS: anon은 insert + select만
alter table public.responses enable row level security;

drop policy if exists "anon can insert" on public.responses;
create policy "anon can insert" on public.responses
  for insert to anon with check (true);

drop policy if exists "anon can read" on public.responses;
create policy "anon can read" on public.responses
  for select to anon using (true);

-- update/delete 정책은 만들지 않음 → 거부됨. 권한 자체도 회수(이중 잠금)
revoke update, delete, truncate on public.responses from anon, authenticated;
grant select, insert on public.responses to anon;

-- 3) Realtime 켜기
alter publication supabase_realtime add table public.responses;
