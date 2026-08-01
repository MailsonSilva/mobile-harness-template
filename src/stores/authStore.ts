import { create } from 'zustand';
import { supabase } from '../config/supabase';
import { Profile, UserRole } from '../types/supabase';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  setSession: (session: Session | null) => void;
  setProfile: (profile: Profile | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role?: UserRole) => Promise<void>;
  signOut: () => Promise<void>;
  loadSession: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  profile: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  setSession: (session) => set({
    session,
    isAuthenticated: !!session,
  }),

  setProfile: (profile) => set({ profile }),

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      set({ session: data.session, isAuthenticated: !!data.session });
      
      if (data.user) {
        // Fetch profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profileData) {
          set({ profile: profileData as Profile });
        }
      }
    } catch (err: any) {
      set({ error: err.message || 'Erro ao realizar login' });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (email, password, fullName, role = 'passenger') => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role,
          },
        },
      });
      if (error) throw error;

      set({ session: data.session, isAuthenticated: !!data.session });

      if (data.user) {
        const newProfile: Profile = {
          id: data.user.id,
          email,
          full_name: fullName,
          role,
          created_at: new Date().toISOString(),
        };
        // Insert profile record if not auto-created by trigger
        await supabase.from('profiles').upsert(newProfile as any);
        set({ profile: newProfile });
      }
    } catch (err: any) {
      set({ error: err.message || 'Erro ao criar conta' });
      throw err;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await supabase.auth.signOut();
      set({ session: null, profile: null, isAuthenticated: false });
    } catch (err: any) {
      set({ error: err.message || 'Erro ao sair' });
    } finally {
      set({ isLoading: false });
    }
  },

  loadSession: async () => {
    set({ isLoading: true });
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        set({ session: data.session, isAuthenticated: true });
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();
        if (profileData) {
          set({ profile: profileData as Profile });
        }
      }
    } catch (err: any) {
      set({ error: err.message });
    } finally {
      set({ isLoading: false });
    }
  },

  reset: () => set({
    session: null,
    profile: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
  }),
}));
