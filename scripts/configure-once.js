#!/usr/bin/env node

import fs from "fs";
import path from "path";
import readline from "readline";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🔧 Configuración Permanente de Supabase para LearnHubPlus\n");

// Función para hacer preguntas
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function configureOnce() {
  try {
    const envPath = path.join(process.cwd(), ".env");

    // Verificar si ya existe .env con credenciales reales
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      if (
        !envContent.includes("tu-proyecto-id.supabase.co") &&
        !envContent.includes("tu_clave_anonima_aqui")
      ) {
        console.log("✅ Archivo .env ya existe con credenciales reales");
        console.log(
          "📋 Si quieres cambiar las credenciales, edita el archivo .env manualmente"
        );
        process.exit(0);
      }
    }

    console.log(
      "📋 Necesitamos configurar las credenciales de Supabase UNA SOLA VEZ:"
    );
    console.log("   1. Ve a https://supabase.com/dashboard");
    console.log("   2. Selecciona tu proyecto existente");
    console.log("   3. Ve a Settings > API");
    console.log("   4. Copia la URL del proyecto y la clave anónima\n");

    const supabaseUrl = await question("🔗 URL del proyecto Supabase: ");
    const supabaseAnonKey = await question("🔑 Clave anónima de Supabase: ");

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log("❌ Error: Debes proporcionar ambas credenciales");
      process.exit(1);
    }

    // Crear archivo .env
    const envContent = `# Supabase Configuration - Configurado el ${new Date().toLocaleDateString()}
VITE_SUPABASE_URL=${supabaseUrl}
VITE_SUPABASE_ANON_KEY=${supabaseAnonKey}

# Backend Configuration (opcional)
SUPABASE_URL=${supabaseUrl}
SUPABASE_ANON_KEY=${supabaseAnonKey}
`;

    fs.writeFileSync(envPath, envContent);

    // Actualizar appsettings.json del backend
    const appsettingsPath = path.join(
      process.cwd(),
      "backend",
      "LearnHubPlus.API",
      "appsettings.json"
    );

    if (fs.existsSync(appsettingsPath)) {
      const appsettings = JSON.parse(fs.readFileSync(appsettingsPath, "utf8"));
      appsettings.Supabase.Url = supabaseUrl;
      appsettings.Supabase.AnonKey = supabaseAnonKey;
      fs.writeFileSync(appsettingsPath, JSON.stringify(appsettings, null, 2));
      console.log("✅ Backend configurado");
    }

    // Actualizar configuración por defecto para que use las credenciales reales
    const configPath = path.join(
      process.cwd(),
      "src",
      "config",
      "supabase.config.ts"
    );

    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, "utf8");

      // Reemplazar la configuración por defecto
      configContent = configContent.replace(
        'url: "https://learnhubplus-demo.supabase.co",',
        `url: "${supabaseUrl}",`
      );
      configContent = configContent.replace(
        'anonKey:\n    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYXJuaHVicGx1cy1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjQwMDAsImV4cCI6MjA1MDU0MDAwMH0.demo-key-for-development",',
        `anonKey: "${supabaseAnonKey}",`
      );

      fs.writeFileSync(configPath, configContent);
      console.log("✅ Configuración por defecto actualizada");
    }

    console.log("\n🎉 ¡Configuración completada PERMANENTEMENTE!");
    console.log("📁 Archivos actualizados:");
    console.log("   - .env (variables de entorno)");
    console.log("   - backend/LearnHubPlus.API/appsettings.json");
    console.log("   - src/config/supabase.config.ts");
    console.log("\n✨ Ya NO necesitarás configurar Supabase nuevamente");
    console.log("🔄 Reinicia el servidor de desarrollo:");
    console.log("   npm run dev");
  } catch (error) {
    console.error("❌ Error durante la configuración:", error.message);
  } finally {
    rl.close();
  }
}

configureOnce();
