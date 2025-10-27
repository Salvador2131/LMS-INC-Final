// Configuración de autenticación
// Cambia USE_REAL_AUTH a true para usar Supabase real, false para usar mock

export const USE_REAL_AUTH = false; // Cambiar a true para usar Supabase real

// Exportar la configuración de autenticación apropiada
export const authConfig = {
  useRealAuth: USE_REAL_AUTH,
  realAuthPath: "@/lib/auth-real",
  mockAuthPath: "@/lib/auth-mock",
};
