
// Sistema de autenticación simulado (temporal)
// En el futuro, esto se reemplazará con una implementación MySQL

export type UserRole = "estudiante" | "profesor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Usuarios de demostración para desarrollo
export const demoUsers = [
  {
    id: "1",
    name: "Admin Sistema",
    email: "admin@aorusinc.com",
    password: "admin123",
    role: "admin" as UserRole
  },
  {
    id: "2",
    name: "Profesor Demo",
    email: "profesor@aorusinc.com",
    password: "profesor123",
    role: "profesor" as UserRole
  },
  {
    id: "3", 
    name: "Estudiante Demo",
    email: "estudiante@aorusinc.com",
    password: "estudiante123",
    role: "estudiante" as UserRole
  }
];

// Simula el almacenamiento del usuario en localStorage
export const loginUser = (email: string, password: string): User | null => {
  const user = demoUsers.find(
    (u) => u.email === email && u.password === password
  );
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    // Almacena el usuario en localStorage (sin la contraseña)
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  }
  
  return null;
};

export const getCurrentUser = (): User | null => {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};

// Hook personalizado para usar en componentes que necesitan acceso al usuario actual
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(getCurrentUser());
  
  useEffect(() => {
    // Verifica si hay un usuario almacenado al cargar el componente
    setCurrentUser(getCurrentUser());
    
    // Escucha cambios en el localStorage
    const handleStorageChange = () => {
      setCurrentUser(getCurrentUser());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  return {
    user: currentUser,
    isAuthenticated: !!currentUser,
    role: currentUser?.role || null,
    login: loginUser,
    logout: logoutUser
  };
};

// Importación faltante
import { useState, useEffect } from 'react';
