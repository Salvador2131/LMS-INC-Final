// Configuración persistente de Supabase
// Este archivo mantiene la configuración incluso si se cierra el IDE

interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Configuración por defecto - usa un proyecto de desarrollo público
const defaultConfig: SupabaseConfig = {
  url: "https://learnhubplus-demo.supabase.co",
  anonKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYXJuaHVicGx1cy1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjQwMDAsImV4cCI6MjA1MDU0MDAwMH0.demo-key-for-development",
};

// Función para obtener la configuración desde variables de entorno o valores por defecto
export const getSupabaseConfig = (): SupabaseConfig => {
  const url = import.meta.env.VITE_SUPABASE_URL || defaultConfig.url;
  const anonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY || defaultConfig.anonKey;

  // Verificar si las variables de entorno están configuradas correctamente
  const isEnvConfigured =
    url !== defaultConfig.url && anonKey !== defaultConfig.anonKey;

  if (isEnvConfigured) {
    console.log("✅ Supabase configurado desde variables de entorno");
  } else {
    console.warn(
      "⚠️  Usando configuración por defecto. Para configurar Supabase:"
    );
    console.warn("   1. Ve a https://supabase.com y crea un nuevo proyecto");
    console.warn("   2. Copia la URL del proyecto y la clave anónima");
    console.warn("   3. Configura tu archivo .env con las credenciales");
    console.warn("   4. Reinicia el servidor de desarrollo");
  }

  return { url, anonKey };
};

// Configuración validada
export const supabaseConfig = getSupabaseConfig();
