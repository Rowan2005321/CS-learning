create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale text not null default 'zh' check (locale in ('zh', 'en')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'Users can read their own profile'
  ) then
    execute 'create policy "Users can read their own profile"
      on public.profiles
      for select
      to authenticated
      using ((select auth.uid()) = id)';
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'profiles'
      and policyname = 'Users can upsert their own profile'
  ) then
    execute 'create policy "Users can upsert their own profile"
      on public.profiles
      for all
      to authenticated
      using ((select auth.uid()) = id)
      with check ((select auth.uid()) = id)';
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'profiles_set_updated_at'
  ) then
    create trigger profiles_set_updated_at
      before update on public.profiles
      for each row execute function public.set_updated_at();
  end if;
end $$;

create table if not exists public.user_course_states (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  saved boolean not null default false,
  completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create index if not exists user_course_states_user_id_idx
  on public.user_course_states (user_id);

alter table public.user_course_states enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'user_course_states'
      and policyname = 'Users can manage their own course states'
  ) then
    execute 'create policy "Users can manage their own course states"
      on public.user_course_states
      for all
      to authenticated
      using ((select auth.uid()) = user_id)
      with check ((select auth.uid()) = user_id)';
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'user_course_states_set_updated_at'
  ) then
    create trigger user_course_states_set_updated_at
      before update on public.user_course_states
      for each row execute function public.set_updated_at();
  end if;
end $$;

create table if not exists public.study_logs (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  date date not null,
  hours numeric(4, 1) not null check (hours > 0 and hours <= 24),
  topic text not null,
  note text not null default '',
  next_step text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists study_logs_user_date_idx
  on public.study_logs (user_id, date desc);

alter table public.study_logs enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'study_logs'
      and policyname = 'Users can manage their own study logs'
  ) then
    execute 'create policy "Users can manage their own study logs"
      on public.study_logs
      for all
      to authenticated
      using ((select auth.uid()) = user_id)
      with check ((select auth.uid()) = user_id)';
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'study_logs_set_updated_at'
  ) then
    create trigger study_logs_set_updated_at
      before update on public.study_logs
      for each row execute function public.set_updated_at();
  end if;
end $$;

create table if not exists public.study_plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  weekly_hours numeric(4, 1) not null default 8 check (weekly_hours > 0 and weekly_hours <= 80),
  active_track text not null default 'all',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.study_plans enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'study_plans'
      and policyname = 'Users can manage their own study plan'
  ) then
    execute 'create policy "Users can manage their own study plan"
      on public.study_plans
      for all
      to authenticated
      using ((select auth.uid()) = user_id)
      with check ((select auth.uid()) = user_id)';
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_trigger
    where tgname = 'study_plans_set_updated_at'
  ) then
    create trigger study_plans_set_updated_at
      before update on public.study_plans
      for each row execute function public.set_updated_at();
  end if;
end $$;
