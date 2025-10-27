#!/usr/bin/env node

/**
 * Script para configurar Supabase automáticamente
 * Ejecuta: node scripts/setup-supabase.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("🚀 Configuración Automática de Supabase\n");

console.log("📋 Necesitarás estas credenciales de Supabase:");
console.log("   1. Ve a https://supabase.com/dashboard");
console.log("   2. Selecciona tu proyecto");
console.log("   3. Ve a Settings → API");
console.log("   4. Copia la Project URL y la anon public key\n");

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function setupSupabase() {
  try {
    // Obtener credenciales del usuario
    const url = await question("🔗 Project URL (https://xxx.supabase.co): ");
    const anonKey = await question("🔑 Anon Key (eyJhbGciOiJIUzI1NiIs...): ");
    const serviceKey = await question(
      "🔐 Service Role Key (opcional, presiona Enter para omitir): "
    );

    // Validar URL
    if (!url.includes("supabase.co")) {
      console.log("❌ La URL debe contener 'supabase.co'");
      process.exit(1);
    }

    // Crear archivo .env
    const envContent = `# Supabase Configuration
VITE_SUPABASE_URL=${url}
VITE_SUPABASE_ANON_KEY=${anonKey}
`;

    const envPath = path.join(process.cwd(), ".env");
    fs.writeFileSync(envPath, envContent);
    console.log("✅ Archivo .env creado");

    // Actualizar configuración del backend
    const backendConfigPath = path.join(
      process.cwd(),
      "backend",
      "LearnHubPlus.API",
      "appsettings.json"
    );
    const backendDevConfigPath = path.join(
      process.cwd(),
      "backend",
      "LearnHubPlus.API",
      "appsettings.Development.json"
    );

    const backendConfig = {
      Logging: {
        LogLevel: {
          Default: "Information",
          "Microsoft.AspNetCore": "Warning",
        },
      },
      AllowedHosts: "*",
      Supabase: {
        Url: url,
        AnonKey: anonKey,
        ServiceRoleKey: serviceKey || "tu_clave_de_servicio_aqui",
      },
    };

    fs.writeFileSync(backendConfigPath, JSON.stringify(backendConfig, null, 2));
    fs.writeFileSync(
      backendDevConfigPath,
      JSON.stringify(backendConfig, null, 2)
    );
    console.log("✅ Configuración del backend actualizada");

    console.log("\n🎉 ¡Configuración completada!");
    console.log("\n📋 Próximos pasos:");
    console.log("   1. Ejecuta: npm run dev");
    console.log("   2. Ejecuta: cd backend/LearnHubPlus.API && dotnet run");
    console.log("   3. Verifica: node scripts/check-supabase-config.js");
  } catch (error) {
    console.error("❌ Error:", error.message);
  } finally {
    rl.close();
  }
}

setupSupabase();
