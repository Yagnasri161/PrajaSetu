-- ============================================================
-- PrajaSetu Database Schema
-- Supabase PostgreSQL with Row Level Security & Performance Indexes
-- ============================================================

-- 1. Schemes Table
CREATE TABLE IF NOT EXISTS public.schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE,
    name_en TEXT NOT NULL,
    name_te TEXT NOT NULL,
    short_description_en TEXT,
    short_description_te TEXT,
    category TEXT NOT NULL,
    department TEXT NOT NULL,
    benefit_en TEXT NOT NULL,
    benefit_te TEXT NOT NULL,
    eligibility_summary_en TEXT NOT NULL,
    eligibility_summary_te TEXT NOT NULL,
    application_process_en TEXT NOT NULL,
    application_process_te TEXT NOT NULL,
    official_source_url TEXT NOT NULL,
    official_application_url TEXT NOT NULL,
    last_verified DATE DEFAULT CURRENT_DATE,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Eligibility Rules Table
CREATE TABLE IF NOT EXISTS public.eligibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    field TEXT NOT NULL,
    operator TEXT NOT NULL,
    value_text TEXT,
    value_number NUMERIC,
    value_boolean BOOLEAN,
    description_en TEXT NOT NULL,
    description_te TEXT NOT NULL,
    required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Scheme Documents Table
CREATE TABLE IF NOT EXISTS public.scheme_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID NOT NULL REFERENCES public.schemes(id) ON DELETE CASCADE,
    document_name_en TEXT NOT NULL,
    document_name_te TEXT NOT NULL,
    required BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Search Sessions Table
CREATE TABLE IF NOT EXISTS public.search_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    query_text TEXT,
    language TEXT DEFAULT 'en',
    profile_json JSONB,
    results_json JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Citizen Feedback Table
CREATE TABLE IF NOT EXISTS public.feedback (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scheme_id UUID REFERENCES public.schemes(id) ON DELETE SET NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ============================================================
-- Performance Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_schemes_active ON public.schemes(active);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.schemes(category);
CREATE INDEX IF NOT EXISTS idx_eligibility_rules_scheme_id ON public.eligibility_rules(scheme_id);
CREATE INDEX IF NOT EXISTS idx_scheme_documents_scheme_id ON public.scheme_documents(scheme_id);
CREATE INDEX IF NOT EXISTS idx_search_sessions_created ON public.search_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_scheme_id ON public.feedback(scheme_id);

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eligibility_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scheme_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public can read active schemes
CREATE POLICY "Public schemes read policy" 
ON public.schemes FOR SELECT 
USING (active = true);

-- Public can read eligibility rules for schemes
CREATE POLICY "Public eligibility rules read policy" 
ON public.eligibility_rules FOR SELECT 
USING (true);

-- Public can read documents
CREATE POLICY "Public scheme documents read policy" 
ON public.scheme_documents FOR SELECT 
USING (true);

-- Anyone can insert anonymous search session metadata (no personal documents or numbers)
CREATE POLICY "Public search session insert policy" 
ON public.search_sessions FOR INSERT 
WITH CHECK (true);

-- Anyone can submit feedback
CREATE POLICY "Public feedback insert policy" 
ON public.feedback FOR INSERT 
WITH CHECK (true);
