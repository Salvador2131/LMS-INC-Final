// Sistema de autenticación real con Supabase
// Este archivo conecta con Supabase real

import { supabase } from "./supabase";
import { UserRole } from "./auth-mock";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Función de login real con Supabase
export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error de login:", error.message);
      return null;
    }

    if (!data.user) {
      console.log("No se pudo obtener el usuario");
      return null;
    }

    // Obtener información adicional del usuario desde la tabla users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (userError) {
      console.error("Error obteniendo datos del usuario:", userError.message);
      // Crear usuario básico si no existe en la tabla users
      const basicUser: User = {
        id: data.user.id,
        name:
          data.user.user_metadata?.name ||
          data.user.email?.split("@")[0] ||
          "Usuario",
        email: data.user.email || "",
        role: "estudiante", // Rol por defecto
        avatar: data.user.user_metadata?.avatar_url,
      };

      // Almacenar en localStorage para compatibilidad
      localStorage.setItem("currentUser", JSON.stringify(basicUser));

      return basicUser;
    }

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      avatar: userData.avatar_url,
    };

    // Almacenar en localStorage para compatibilidad
    localStorage.setItem("currentUser", JSON.stringify(user));

    console.log("Login exitoso con Supabase:", { email, role: user.role });
    return user;
  } catch (error) {
    console.error("Error inesperado en login:", error);
    return null;
  }
};

// Función de registro real con Supabase
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: UserRole = "estudiante"
): Promise<User | null> => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (error) {
      console.error("Error de registro:", error.message);
      return null;
    }

    if (!data.user) {
      console.log("No se pudo crear el usuario");
      return null;
    }

    // Crear entrada en la tabla users
    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id,
      email,
      name,
      role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Error creando usuario en tabla:", insertError.message);
    }

    const user: User = {
      id: data.user.id,
      name,
      email,
      role,
      avatar: data.user.user_metadata?.avatar_url,
    };

    // Almacenar en localStorage para compatibilidad
    localStorage.setItem("currentUser", JSON.stringify(user));

    console.log("Registro exitoso con Supabase:", { email, role });
    return user;
  } catch (error) {
    console.error("Error inesperado en registro:", error);
    return null;
  }
};

// Obtener usuario actual
export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem("currentUser");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

// Cerrar sesión
export const logoutUser = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    localStorage.removeItem("currentUser");
    console.log("Logout exitoso con Supabase");
  } catch (error) {
    console.error("Error en logout:", error);
    localStorage.removeItem("currentUser");
  }
};

// Hook personalizado para autenticación (se define en auth-mock.ts)
// Este archivo solo contiene las funciones de autenticación real
