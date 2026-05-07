
CREATE TABLE public.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  profession text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view agents"
  ON public.agents FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert agents"
  ON public.agents FOR INSERT
  WITH CHECK (
    length(trim(name)) BETWEEN 2 AND 80
    AND length(trim(profession)) BETWEEN 2 AND 80
    AND length(trim(phone)) BETWEEN 6 AND 25
  );

ALTER PUBLICATION supabase_realtime ADD TABLE public.agents;
ALTER TABLE public.agents REPLICA IDENTITY FULL;
