// Sistema de autenticación mock para pruebas
// Este archivo simula la autenticación sin necesidad de Supabase

import { useState, useEffect } from "react";

export type UserRole = "estudiante" | "profesor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Usuarios de prueba predefinidos
const mockUsers: User[] = [
  {
    id: "1",
    name: "Administrador",
    email: "admin@aorusinc.com",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "2",
    name: "Profesor Juan",
    email: "profesor@aorusinc.com",
    role: "profesor",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
  },
  {
    id: "3",
    name: "Estudiante María",
    email: "estudiante@aorusinc.com",
    role: "estudiante",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
  },
];

// Simular delay de red
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Función de login mock
export const loginUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  await delay(1000); // Simular delay de red

  // Verificar credenciales
  const user = mockUsers.find((u) => u.email === email);

  if (!user) {
    console.log("Usuario no encontrado:", email);
    return null;
  }

  // Verificar contraseña (en este caso, cualquier contraseña funciona)
  if (password.length < 3) {
    console.log("Contraseña muy corta");
    return null;
  }

  console.log("Login exitoso:", { email, role: user.role });

  // Almacenar en localStorage
  localStorage.setItem("currentUser", JSON.stringify(user));

  // Disparar evento personalizado para notificar cambios
  window.dispatchEvent(new CustomEvent("auth-change"));

  return user;
};

// Función de registro mock
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: UserRole = "estudiante"
): Promise<User | null> => {
  await delay(1000); // Simular delay de red

  // Verificar si el email ya existe
  const existingUser = mockUsers.find((u) => u.email === email);
  if (existingUser) {
    console.log("Usuario ya existe:", email);
    return null;
  }

  // Crear nuevo usuario
  const newUser: User = {
    id: (mockUsers.length + 1).toString(),
    name,
    email,
    role,
    avatar: `https://images.unsplash.com/photo-${
      1500000000000 + Math.random() * 1000000000
    }?w=32&h=32&fit=crop&crop=face`,
  };

  mockUsers.push(newUser);

  console.log("Registro exitoso:", { email, role: newUser.role });

  // Almacenar en localStorage
  localStorage.setItem("currentUser", JSON.stringify(newUser));

  // Disparar evento personalizado para notificar cambios
  window.dispatchEvent(new CustomEvent("auth-change"));

  return newUser;
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
  await delay(500); // Simular delay de red
  localStorage.removeItem("currentUser");

  // Disparar evento personalizado para notificar cambios
  window.dispatchEvent(new CustomEvent("auth-change"));

  console.log("Logout exitoso");
};

// Hook personalizado para autenticación
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(false);

  // Escuchar cambios en localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };

    // Escuchar cambios en storage (entre tabs)
    window.addEventListener("storage", handleStorageChange);

    // Escuchar cambios en el mismo tab (custom event)
    window.addEventListener("auth-change", handleStorageChange);

    // También verificar al montar el componente
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-change", handleStorageChange);
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ) => {
    setLoading(true);
    try {
      const user = await registerUser(email, password, name, role);
      setCurrentUser(user);
      return user;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    role: currentUser?.role || null,
    loading,
    login,
    register,
    logout,
  };
};
