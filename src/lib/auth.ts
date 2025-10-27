// Archivo principal de autenticación
// Exporta la autenticación correcta según la configuración

import { authConfig } from "@/config/auth.config";

// Log del sistema en uso
if (authConfig.useRealAuth) {
  console.log("🔗 Usando autenticación REAL con Supabase");
} else {
  console.log("🎭 Usando autenticación MOCK para desarrollo");
}

// Importar ambos módulos
import * as authReal from "./auth-real";
import * as authMock from "./auth-mock";

// Re-exportar la autenticación correcta
const authModule = authConfig.useRealAuth ? authReal : authMock;

// Exportar funciones comunes
export const { getCurrentUser, loginUser, registerUser, logoutUser } =
  authModule;

// Exportar hook específico del mock
export const { useAuth } = authMock;
