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

console.log("🚀 Configuración Automática de Supabase para LearnHubPlus\n");

// Función para hacer preguntas
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function setupSupabase() {
  try {
    // Verificar si ya existe .env
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      console.log("✅ Archivo .env ya existe");
      const overwrite = await question(
        "¿Quieres sobrescribir la configuración actual? (y/N): "
      );
      if (
        overwrite.toLowerCase() !== "y" &&
        overwrite.toLowerCase() !== "yes"
      ) {
        console.log("❌ Configuración cancelada");
        process.exit(0);
      }
    }

    console.log("📋 Necesitamos configurar las credenciales de Supabase:");
    console.log("   1. Ve a https://supabase.com/dashboard");
    console.log("   2. Crea un nuevo proyecto o selecciona uno existente");
    console.log("   3. Ve a Settings > API");
    console.log("   4. Copia la URL del proyecto y la clave anónima\n");

    const supabaseUrl = await question("🔗 URL del proyecto Supabase: ");
    const supabaseAnonKey = await question("🔑 Clave anónima de Supabase: ");

    if (!supabaseUrl || !supabaseAnonKey) {
      console.log("❌ Error: Debes proporcionar ambas credenciales");
      process.exit(1);
    }

    // Crear archivo .env
    const envContent = `# Supabase Configuration
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
    }

    // Actualizar configuración por defecto
    const configPath = path.join(
      process.cwd(),
      "src",
      "config",
      "supabase.config.ts"
    );
    if (fs.existsSync(configPath)) {
      let configContent = fs.readFileSync(configPath, "utf8");
      configContent = configContent.replace(
        'url: "https://tu-proyecto-id.supabase.co",',
        `url: "${supabaseUrl}",`
      );
      configContent = configContent.replace(
        'anonKey: "tu_clave_anonima_aqui",',
        `anonKey: "${supabaseAnonKey}",`
      );
      fs.writeFileSync(configPath, configContent);
    }

    console.log("\n✅ ¡Configuración completada!");
    console.log("📁 Archivos actualizados:");
    console.log("   - .env (variables de entorno)");
    console.log("   - backend/LearnHubPlus.API/appsettings.json");
    console.log("   - src/config/supabase.config.ts");
    console.log("\n🔄 Reinicia el servidor de desarrollo:");
    console.log("   npm run dev");
    console.log("   dotnet run (en backend/)");
  } catch (error) {
    console.error("❌ Error durante la configuración:", error.message);
  } finally {
    rl.close();
  }
}

setupSupabase();
