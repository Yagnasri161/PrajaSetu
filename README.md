# PrajaSetu (ప్రజాసేతు)

> **"Your Rights. Your Benefits. One Bridge."**  
> **"మీ హక్కులు, మీకు చేరువలో."**

PrajaSetu is a bilingual Telugu + English AI-powered government scheme discovery and eligibility platform for citizens of Telangana.

---

## Quick Start

### 1. Prerequisites
- Node.js 18+ (tested on Node 22)
- npm 9+

### 2. Installation
```bash
npm install
```

### 3. Environment Variables (Optional)
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

> **Note:** PrajaSetu features a zero-crash offline architecture. If Supabase keys or AI API keys are omitted, the application seamlessly runs on an embedded verified Telangana dataset and deterministic bilingual NLP parser out of the box!

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Supabase PostgreSQL Setup (Optional)
If connecting to a live Supabase instance:
1. Run `supabase/schema.sql` in the Supabase SQL editor to create tables and RLS policies.
2. Run `supabase/seed.sql` to populate verified Telangana & Central government schemes.
3. Configure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `.env.local`.

---

## Architecture Highlights
- **Deterministic Eligibility Engine (`src/lib/eligibility.ts`)**: Mathematical evaluation of criteria — no hallucinated eligibility.
- **Bilingual i18n (`src/lib/i18n/`)**: Full coverage of English and authentic Telugu with persistent local storage.
- **Browser Speech Recognition (`src/components/VoiceInput.tsx`)**: Web Speech API supporting `te-IN` and `en-IN`.
- **Document Readiness System**: Live checklist calculating real-time document preparedness before visiting MeeSeva.
- **Jury Demo Mode (`/demo`)**: 5 instant realistic personas for one-click evaluation.
