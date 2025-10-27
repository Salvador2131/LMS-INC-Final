import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "../config/supabase.config";

// Crear cliente de Supabase con configuración persistente
export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);

// Tipos de base de datos
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: "estudiante" | "profesor" | "admin";
          avatar_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          role: "estudiante" | "profesor" | "admin";
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          role?: "estudiante" | "profesor" | "admin";
          avatar_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      courses: {
        Row: {
          id: string;
          title: string;
          description: string;
          instructor_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          instructor_id: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          instructor_id?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

