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
  locale text not null default 'zh',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles add column if not exists display_name text;
alter table public.profiles add column if not exists locale text not null default 'zh';
alter table public.profiles add column if not exists onboarding_completed boolean not null default false;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
alter table public.profiles add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_locale_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_locale_check check (locale in ('zh', 'en'));
  end if;
end $$;

create table if not exists public.user_course_states (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  saved boolean not null default false,
  completed boolean not null default false,
  status text not null default 'not_started',
  rating smallint,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

alter table public.user_course_states add column if not exists saved boolean not null default false;
alter table public.user_course_states add column if not exists completed boolean not null default false;
alter table public.user_course_states add column if not exists status text not null default 'not_started';
alter table public.user_course_states add column if not exists rating smallint;
alter table public.user_course_states add column if not exists notes text not null default '';
alter table public.user_course_states add column if not exists created_at timestamptz not null default now();
alter table public.user_course_states add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'user_course_states_status_check'
      and conrelid = 'public.user_course_states'::regclass
  ) then
    alter table public.user_course_states
      add constraint user_course_states_status_check
      check (status in ('not_started', 'planned', 'saved', 'in_progress', 'completed', 'skipped'));
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'user_course_states_rating_check'
      and conrelid = 'public.user_course_states'::regclass
  ) then
    alter table public.user_course_states
      add constraint user_course_states_rating_check
      check (rating is null or rating between 1 and 5);
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
  course_id text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

alter table public.study_logs add column if not exists course_id text;
alter table public.study_logs add column if not exists tags text[] not null default '{}';
alter table public.study_logs add column if not exists created_at timestamptz not null default now();
alter table public.study_logs add column if not exists updated_at timestamptz not null default now();

create table if not exists public.study_plans (
  user_id uuid primary key references auth.users(id) on delete cascade,
  weekly_hours numeric(4, 1) not null default 8 check (weekly_hours > 0 and weekly_hours <= 80),
  active_track text not null default 'all',
  id uuid default gen_random_uuid(),
  title text not null default 'Default study plan',
  target_track text not null default 'all',
  target_completion_date date,
  is_active boolean not null default true,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.study_plans add column if not exists id uuid default gen_random_uuid();
update public.study_plans set id = gen_random_uuid() where id is null;
alter table public.study_plans alter column id set not null;
alter table public.study_plans add column if not exists title text not null default 'Default study plan';
alter table public.study_plans add column if not exists target_track text not null default 'all';
alter table public.study_plans add column if not exists target_completion_date date;
alter table public.study_plans add column if not exists is_active boolean not null default true;
alter table public.study_plans add column if not exists notes text not null default '';
alter table public.study_plans add column if not exists created_at timestamptz not null default now();
alter table public.study_plans add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'study_plans_id_key'
      and conrelid = 'public.study_plans'::regclass
  ) then
    alter table public.study_plans add constraint study_plans_id_key unique (id);
  end if;
end $$;

create table if not exists public.study_plan_items (
  id uuid primary key default gen_random_uuid(),
  plan_id uuid not null references public.study_plans(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  order_index integer not null default 0,
  status text not null default 'planned',
  target_week integer,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (plan_id, course_id)
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'study_plan_items_status_check'
      and conrelid = 'public.study_plan_items'::regclass
  ) then
    alter table public.study_plan_items
      add constraint study_plan_items_status_check
      check (status in ('planned', 'in_progress', 'completed', 'skipped'));
  end if;
end $$;

create table if not exists public.project_templates (
  id text primary key,
  title jsonb not null default '{}',
  description jsonb not null default '{}',
  target_audience jsonb not null default '{}',
  difficulty text not null default 'foundation',
  estimated_weeks integer not null default 1,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.project_milestones (
  id text primary key,
  project_template_id text references public.project_templates(id) on delete cascade,
  title jsonb not null default '{}',
  description jsonb not null default '{}',
  target_audience jsonb not null default '{}',
  difficulty text not null default 'foundation',
  estimated_weeks integer not null default 1,
  deliverables jsonb not null default '[]',
  recommended_courses text[] not null default '{}',
  evaluation_checklist jsonb not null default '[]',
  portfolio_value jsonb not null default '{}',
  github_repo_suggestion text not null default '',
  ai_assisted_tips jsonb not null default '[]',
  next_milestone_id text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_tracks (
  id text primary key,
  title jsonb not null default '{}',
  description jsonb not null default '{}',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_track_states (
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id text not null,
  status text not null default 'active',
  target_completion_date date,
  notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, track_id)
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'user_track_states_status_check'
      and conrelid = 'public.user_track_states'::regclass
  ) then
    alter table public.user_track_states
      add constraint user_track_states_status_check
      check (status in ('active', 'paused', 'completed', 'archived'));
  end if;
end $$;

create table if not exists public.user_project_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  project_id text not null,
  milestone_id text not null default '',
  status text not null default 'not_started',
  completed boolean not null default false,
  current_step text not null default '',
  reflection text not null default '',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, project_id)
);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'user_project_progress_status_check'
      and conrelid = 'public.user_project_progress'::regclass
  ) then
    alter table public.user_project_progress
      add constraint user_project_progress_status_check
      check (status in ('not_started', 'in_progress', 'completed', 'paused', 'skipped'));
  end if;
end $$;

create table if not exists public.user_milestone_logs (
  user_id uuid not null references auth.users(id) on delete cascade,
  id text not null,
  project_id text not null,
  milestone_id text not null,
  log_date date not null default current_date,
  note text not null default '',
  blockers text not null default '',
  next_step text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);

create index if not exists user_course_states_user_id_idx
  on public.user_course_states (user_id);
create index if not exists user_course_states_user_course_idx
  on public.user_course_states (user_id, course_id);
create index if not exists study_logs_user_date_idx
  on public.study_logs (user_id, date desc);
create index if not exists study_logs_user_course_idx
  on public.study_logs (user_id, course_id);
create index if not exists study_plans_user_active_idx
  on public.study_plans (user_id, is_active);
create index if not exists study_plan_items_plan_order_idx
  on public.study_plan_items (plan_id, order_index);
create index if not exists study_plan_items_user_id_idx
  on public.study_plan_items (user_id);
create index if not exists user_track_states_user_id_idx
  on public.user_track_states (user_id);
create index if not exists user_project_progress_user_project_idx
  on public.user_project_progress (user_id, project_id);
create index if not exists user_milestone_logs_user_project_created_idx
  on public.user_milestone_logs (user_id, project_id, created_at desc);
create index if not exists project_milestones_template_order_idx
  on public.project_milestones (project_template_id, sort_order);
create index if not exists learning_tracks_sort_order_idx
  on public.learning_tracks (sort_order);

alter table public.profiles enable row level security;
alter table public.user_course_states enable row level security;
alter table public.study_logs enable row level security;
alter table public.study_plans enable row level security;
alter table public.study_plan_items enable row level security;
alter table public.user_track_states enable row level security;
alter table public.user_project_progress enable row level security;
alter table public.user_milestone_logs enable row level security;
alter table public.project_templates enable row level security;
alter table public.project_milestones enable row level security;
alter table public.learning_tracks enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'Users can read their own profile') then
    execute 'create policy "Users can read their own profile" on public.profiles for select to authenticated using ((select auth.uid()) = id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'profiles' and policyname = 'Users can upsert their own profile') then
    execute 'create policy "Users can upsert their own profile" on public.profiles for all to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_course_states' and policyname = 'Users can manage their own course states') then
    execute 'create policy "Users can manage their own course states" on public.user_course_states for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'study_logs' and policyname = 'Users can manage their own study logs') then
    execute 'create policy "Users can manage their own study logs" on public.study_logs for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'study_plans' and policyname = 'Users can manage their own study plan') then
    execute 'create policy "Users can manage their own study plan" on public.study_plans for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'study_plan_items' and policyname = 'Users can manage their own study plan items') then
    execute 'create policy "Users can manage their own study plan items" on public.study_plan_items for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_track_states' and policyname = 'Users can manage their own track states') then
    execute 'create policy "Users can manage their own track states" on public.user_track_states for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_project_progress' and policyname = 'Users can manage their own project progress') then
    execute 'create policy "Users can manage their own project progress" on public.user_project_progress for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'user_milestone_logs' and policyname = 'Users can manage their own milestone logs') then
    execute 'create policy "Users can manage their own milestone logs" on public.user_milestone_logs for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)';
  end if;
end $$;

do $$
begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'project_templates' and policyname = 'Public can read project templates') then
    execute 'create policy "Public can read project templates" on public.project_templates for select to anon, authenticated using (true)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'project_milestones' and policyname = 'Public can read project milestones') then
    execute 'create policy "Public can read project milestones" on public.project_milestones for select to anon, authenticated using (true)';
  end if;
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'learning_tracks' and policyname = 'Public can read learning tracks') then
    execute 'create policy "Public can read learning tracks" on public.learning_tracks for select to anon, authenticated using (true)';
  end if;
end $$;

do $$
declare
  table_name text;
begin
  foreach table_name in array array[
    'profiles',
    'user_course_states',
    'study_logs',
    'study_plans',
    'study_plan_items',
    'user_track_states',
    'user_project_progress',
    'user_milestone_logs',
    'project_templates',
    'project_milestones',
    'learning_tracks'
  ]
  loop
    if not exists (
      select 1 from pg_trigger
      where tgname = table_name || '_set_updated_at'
    ) then
      execute format(
        'create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
        table_name || '_set_updated_at',
        table_name
      );
    end if;
  end loop;
end $$;
