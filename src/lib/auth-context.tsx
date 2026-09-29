"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { isSupabaseConfigured, supabase } from "./supabase";
import { CitizenProfile } from "./types";

export interface UserSession {
  id: string;
  email: string;
  profile?: CitizenProfile;
  savedSchemes?: string[];
}

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (profile: CitizenProfile) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
  updateProfile: async () => ({}),
});

const LOCAL_STORAGE_USER_KEY = "prajasetu_auth_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            setUser({
              id: session.user.id,
              email: session.user.email || "",
              profile: (session.user.user_metadata as any)?.profile || null,
              savedSchemes: (session.user.user_metadata as any)?.savedSchemes || [],
            });
          }

          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
              setUser({
                id: session.user.id,
                email: session.user.email || "",
                profile: (session.user.user_metadata as any)?.profile || null,
                savedSchemes: (session.user.user_metadata as any)?.savedSchemes || [],
              });
            } else {
              setUser(null);
            }
          });

          setLoading(false);
          return () => subscription.unsubscribe();
        } catch (err) {
          console.warn("Supabase auth init error:", err);
        }
      }

      // Fallback local session for offline/demo resilience
      try {
        const local = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (local) {
          setUser(JSON.parse(local));
        }
      } catch (e) {}
      setLoading(false);
    }

    initAuth();
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        return { error: error.message };
      }
      if (data.user) {
        const u: UserSession = {
          id: data.user.id,
          email: data.user.email || email,
          profile: (data.user.user_metadata as any)?.profile || null,
          savedSchemes: (data.user.user_metadata as any)?.savedSchemes || [],
        };
        setUser(u);
      }
      return {};
    }

    // Local fallback signin
    try {
      const u: UserSession = {
        id: `local-user-${Date.now()}`,
        email,
        profile: {
          state: "Telangana",
          annual_income: 150000,
          occupation: "citizen",
          has_ration_card: true,
        },
        savedSchemes: ["ts-gruha-jyothi", "ts-rythu-bharosa"],
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(u));
      setUser(u);
      return {};
    } catch (e: any) {
      return { error: e.message };
    }
  };

  const signUp = async (email: string, password: string): Promise<{ error?: string }> => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        return { error: error.message };
      }
      if (data.user) {
        const u: UserSession = {
          id: data.user.id,
          email: data.user.email || email,
          profile: { state: "Telangana" },
          savedSchemes: [],
        };
        setUser(u);
      }
      return {};
    }

    // Local fallback signup
    try {
      const u: UserSession = {
        id: `local-user-${Date.now()}`,
        email,
        profile: {
          state: "Telangana",
        },
        savedSchemes: [],
      };
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(u));
      setUser(u);
      return {};
    } catch (e: any) {
      return { error: e.message };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    setUser(null);
  };

  const updateProfile = async (newProfile: CitizenProfile): Promise<{ error?: string }> => {
    if (!user) return { error: "User not logged in" };

    const updatedUser: UserSession = {
      ...user,
      profile: newProfile,
    };

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.updateUser({
        data: { profile: newProfile },
      });
      if (error) return { error: error.message };
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));
    setUser(updatedUser);
    return {};
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
