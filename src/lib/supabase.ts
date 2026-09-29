import { createClient } from "@supabase/supabase-js";
import { INITIAL_SCHEMES } from "./data/initial-schemes";
import { Scheme } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "your_supabase_project_url" &&
  !supabaseUrl.includes("placeholder")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// In-memory / fallback repository for schemes and feedback
let localSchemes: Scheme[] = [...INITIAL_SCHEMES];
let localFeedback: any[] = [];
let localSearchSessions: any[] = [];

export async function getSchemes(): Promise<Scheme[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("schemes")
        .select(`
          *,
          rules:eligibility_rules(*),
          documents:scheme_documents(*)
        `)
        .eq("active", true);

      if (!error && data && data.length > 0) {
        return data as Scheme[];
      }
    } catch (err) {
      console.warn("Supabase fetch error, falling back to verified local dataset:", err);
    }
  }
  return localSchemes.filter((s) => s.active);
}

export async function getAllSchemesAdmin(): Promise<Scheme[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("schemes")
        .select(`
          *,
          rules:eligibility_rules(*),
          documents:scheme_documents(*)
        `);

      if (!error && data && data.length > 0) {
        return data as Scheme[];
      }
    } catch (err) {
      console.warn("Supabase admin fetch error, falling back to local dataset:", err);
    }
  }
  return localSchemes;
}

export async function getSchemeById(id: string): Promise<Scheme | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("schemes")
        .select(`
          *,
          rules:eligibility_rules(*),
          documents:scheme_documents(*)
        `)
        .eq("id", id)
        .single();

      if (!error && data) {
        return data as Scheme;
      }
    } catch (err) {
      console.warn("Supabase scheme by id error, falling back to local dataset:", err);
    }
  }
  const found = localSchemes.find((s) => s.id === id);
  return found || null;
}

export async function saveSearchSession(query: string, language: string, profile: any, results: any) {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("search_sessions").insert({
        query_text: query,
        language,
        profile_json: profile,
        results_json: results,
      });
      return;
    } catch (err) {
      console.warn("Error logging search session:", err);
    }
  }
  localSearchSessions.push({
    id: `local-session-${Date.now()}`,
    query,
    language,
    profile,
    results,
    created_at: new Date().toISOString(),
  });
}

export async function submitFeedback(schemeId: string | null, rating: number, comment: string) {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("feedback").insert({
        scheme_id: schemeId,
        rating,
        comment,
      });
      if (!error) return { success: true };
    } catch (err) {
      console.warn("Error submitting feedback to Supabase:", err);
    }
  }
  localFeedback.push({
    id: `fb-${Date.now()}`,
    scheme_id: schemeId,
    rating,
    comment,
    created_at: new Date().toISOString(),
  });
  return { success: true, local: true };
}

export async function updateSchemeAdmin(updatedScheme: Partial<Scheme> & { id: string }) {
  const index = localSchemes.findIndex((s) => s.id === updatedScheme.id);
  if (index !== -1) {
    localSchemes[index] = { ...localSchemes[index], ...updatedScheme, updated_at: new Date().toISOString() };
  }
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("schemes").update(updatedScheme).eq("id", updatedScheme.id);
    } catch (err) {
      console.warn("Admin update Supabase error:", err);
    }
  }
  return localSchemes[index];
}

export async function addSchemeAdmin(newScheme: Scheme) {
  localSchemes.unshift(newScheme);
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from("schemes").insert(newScheme);
    } catch (err) {
      console.warn("Admin insert Supabase error:", err);
    }
  }
  return newScheme;
}
