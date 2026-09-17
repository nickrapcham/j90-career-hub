
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  club_name text NOT NULL DEFAULT '',
  game_edition text NOT NULL DEFAULT 'EAFC 27',
  season text NOT NULL DEFAULT '2026/27',
  status text NOT NULL DEFAULT 'ATIVA',
  logo_path text,
  primary_color text DEFAULT '#020b18',
  secondary_color text DEFAULT '#04101f',
  accent_color text DEFAULT '#d8b45c',
  current_funds numeric NOT NULL DEFAULT 0,
  current_era text,
  main_objective text,
  overall_wins int NOT NULL DEFAULT 0,
  overall_draws int NOT NULL DEFAULT 0,
  overall_losses int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  name text NOT NULL,
  short_name text,
  main_position text NOT NULL DEFAULT 'ST',
  alt_positions text[] NOT NULL DEFAULT '{}',
  nationality text,
  initial_ovr int NOT NULL DEFAULT 75,
  current_ovr int NOT NULL DEFAULT 75,
  card_type text NOT NULL DEFAULT 'Ouro',
  club_status text NOT NULL DEFAULT 'ATIVO',
  origin text NOT NULL DEFAULT 'MERCADO',
  narrative_category text NOT NULL DEFAULT 'ATUAL',
  acquisition_value numeric NOT NULL DEFAULT 0,
  market_value numeric NOT NULL DEFAULT 0,
  arrival_date date,
  arrival_era text,
  arrival_episode text,
  la_fabrica boolean NOT NULL DEFAULT false,
  mercado_card_id text,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.player_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  image_path text,
  label text,
  is_current boolean NOT NULL DEFAULT false,
  card_type text,
  ovr int,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.players ADD COLUMN current_card_id uuid REFERENCES public.player_cards(id) ON DELETE SET NULL;

CREATE TABLE public.player_evos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  name text NOT NULL,
  applied_at date NOT NULL DEFAULT current_date,
  ovr_before int,
  ovr_after int,
  cost numeric NOT NULL DEFAULT 0,
  notes text,
  result_card_id uuid REFERENCES public.player_cards(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'ATIVA',
  reset_at timestamptz,
  chain int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.player_investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  evo_id uuid REFERENCES public.player_evos(id) ON DELETE CASCADE,
  kind text NOT NULL DEFAULT 'EVO',
  amount numeric NOT NULL DEFAULT 0,
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX player_investments_evo_unique ON public.player_investments(evo_id) WHERE evo_id IS NOT NULL;

CREATE OR REPLACE FUNCTION public.sync_evo_investment() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.player_investments (player_id, evo_id, kind, amount, description)
    VALUES (NEW.player_id, NEW.id, 'EVO', NEW.cost, NEW.name);
  ELSE
    UPDATE public.player_investments SET amount = NEW.cost, description = NEW.name WHERE evo_id = NEW.id;
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER trg_evo_investment AFTER INSERT OR UPDATE ON public.player_evos FOR EACH ROW EXECUTE FUNCTION public.sync_evo_investment();

CREATE TABLE public.formations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  game_edition text NOT NULL DEFAULT 'EAFC 27',
  is_active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.tactics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  formation_id uuid REFERENCES public.formations(id) ON DELETE SET NULL,
  name text NOT NULL,
  eafc_code text,
  description text,
  status text NOT NULL DEFAULT 'ATIVA',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.call_ups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  name text NOT NULL,
  competition text,
  played_on date,
  formation text NOT NULL DEFAULT '4-3-3',
  tactic text,
  eafc_code text,
  tactic_id uuid REFERENCES public.tactics(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'ativa',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.call_up_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  call_up_id uuid NOT NULL REFERENCES public.call_ups(id) ON DELETE CASCADE,
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  slot_type text NOT NULL DEFAULT 'TITULAR',
  slot_index int NOT NULL DEFAULT 0,
  player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  position text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL DEFAULT 'LIGA',
  season text,
  status text NOT NULL DEFAULT 'EM_ANDAMENTO',
  started_on date,
  starts_on date,
  ended_on date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.competition_campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  competition_id uuid NOT NULL REFERENCES public.competitions(id) ON DELETE CASCADE,
  played_on date,
  round_number int,
  wins int NOT NULL DEFAULT 0,
  losses int NOT NULL DEFAULT 0,
  draws int NOT NULL DEFAULT 0,
  final_rank text,
  mvp_player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  villain_player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  surprise_player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  fan_favorite_player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  top_scorer_player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  top_assister_player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  top_scorer_goals int,
  top_assister_assists int,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.financial_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  name text NOT NULL,
  target_value numeric NOT NULL DEFAULT 0,
  player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'ATIVO',
  is_primary boolean NOT NULL DEFAULT false,
  notes text,
  target_card_path text,
  acquired_player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  completion_method text,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.eras (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  order_number int NOT NULL DEFAULT 1,
  name text NOT NULL,
  subtitle text,
  description text,
  status text NOT NULL DEFAULT 'FUTURA',
  started_on date,
  ended_on date,
  notes text,
  financial_goal_id uuid REFERENCES public.financial_goals(id) ON DELETE SET NULL,
  financial_goal_required boolean NOT NULL DEFAULT false,
  banner_path text,
  symbol text,
  theme text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.era_requirements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  era_id uuid NOT NULL REFERENCES public.eras(id) ON DELETE CASCADE,
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  kind text NOT NULL DEFAULT 'OUTRO',
  player_category text,
  player_filter text NOT NULL DEFAULT 'QUALQUER',
  target_value numeric NOT NULL DEFAULT 1,
  required boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  description text,
  manual_done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.era_objectives (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  era_id uuid NOT NULL REFERENCES public.eras(id) ON DELETE CASCADE,
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  kind text NOT NULL DEFAULT 'OUTRO',
  status text NOT NULL DEFAULT 'PENDENTE',
  required boolean NOT NULL DEFAULT false,
  progress int,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.era_milestones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  era_id uuid NOT NULL REFERENCES public.eras(id) ON DELETE CASCADE,
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  occurred_on date NOT NULL DEFAULT current_date,
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'OUTRO',
  player_id uuid REFERENCES public.players(id) ON DELETE SET NULL,
  competition_id uuid REFERENCES public.competitions(id) ON DELETE SET NULL,
  financial_goal_id uuid REFERENCES public.financial_goals(id) ON DELETE SET NULL,
  image_path text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.financial_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  career_id uuid NOT NULL REFERENCES public.careers(id) ON DELETE CASCADE,
  occurred_on date NOT NULL DEFAULT current_date,
  description text NOT NULL,
  kind text NOT NULL DEFAULT 'DESPESA',
  category text,
  amount numeric NOT NULL DEFAULT 0,
  source_type text NOT NULL DEFAULT 'MANUAL',
  source_id uuid,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX financial_transactions_source_unique ON public.financial_transactions(source_type, source_id) WHERE source_id IS NOT NULL;

CREATE UNIQUE INDEX careers_one_active ON public.careers((status)) WHERE status = 'ATIVA';
CREATE UNIQUE INDEX eras_one_active ON public.eras(career_id) WHERE status = 'ATIVA';
CREATE UNIQUE INDEX financial_goals_one_primary ON public.financial_goals(career_id) WHERE is_primary;

DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['careers','players','player_cards','player_evos','player_investments','formations','tactics','call_ups','call_up_slots','competitions','competition_campaigns','financial_goals','eras','era_requirements','era_objectives','era_milestones','financial_transactions'] LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR ALL TO anon, authenticated USING (true) WITH CHECK (true)', t||'_all', t);
    EXECUTE format('CREATE TRIGGER %I BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t||'_touch', t);
  END LOOP;
END $$;

INSERT INTO public.formations (name, sort_order) VALUES
 ('4-3-3',1),('4-2-3-1',2),('4-4-2',3),('3-5-2',4),('4-2-2-2',5),('5-2-1-2',6),('4-1-2-1-2',7),('3-4-2-1',8),('4-3-2-1',9),('5-3-2',10);

CREATE POLICY "j90 storage read" ON storage.objects FOR SELECT TO anon, authenticated
  USING (bucket_id IN ('player-cards','career-logos','financial-goal-cards'));
CREATE POLICY "j90 storage insert" ON storage.objects FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id IN ('player-cards','career-logos','financial-goal-cards'));
CREATE POLICY "j90 storage update" ON storage.objects FOR UPDATE TO anon, authenticated
  USING (bucket_id IN ('player-cards','career-logos','financial-goal-cards'));
CREATE POLICY "j90 storage delete" ON storage.objects FOR DELETE TO anon, authenticated
  USING (bucket_id IN ('player-cards','career-logos','financial-goal-cards'));
