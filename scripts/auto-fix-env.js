#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function autoFixEnv() {
  console.log("🔧 Corrección Automática del Archivo .env\n");

  const envPath = path.join(process.cwd(), ".env");

  // Crear contenido completo del .env con valores por defecto
  const envContent = `# Supabase Configuration - Frontend (Vite)
VITE_SUPABASE_URL=https://learnhubplus-demo.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYXJuaHVicGx1cy1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjQwMDAsImV4cCI6MjA1MDU0MDAwMH0.demo-key-for-development

# Supabase Configuration - Backend (ASP.NET Core)
SUPABASE_URL=https://learnhubplus-demo.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYXJuaHVicGx1cy1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjQwMDAsImV4cCI6MjA1MDU0MDAwMH0.demo-key-for-development
SUPABASE_SERVICE_ROLE_KEY=tu_clave_de_servicio_aqui

# Development Configuration
NODE_ENV=development
VITE_NODE_ENV=development

# Database Configuration
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres

# API Configuration
API_BASE_URL=http://localhost:5000
VITE_API_BASE_URL=http://localhost:5000

# Authentication Configuration
JWT_SECRET=tu_jwt_secret_aqui
VITE_JWT_SECRET=tu_jwt_secret_aqui
`;

  try {
    // Escribir archivo .env
    fs.writeFileSync(envPath, envContent);
    console.log("✅ Archivo .env creado/actualizado correctamente");

    // Actualizar appsettings.json del backend
    const appsettingsPath = path.join(
      process.cwd(),
      "backend",
      "LearnHubPlus.API",
      "appsettings.json"
    );

    if (fs.existsSync(appsettingsPath)) {
      const appsettings = JSON.parse(fs.readFileSync(appsettingsPath, "utf8"));
      appsettings.Supabase.Url = "https://learnhubplus-demo.supabase.co";
      appsettings.Supabase.AnonKey =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlYXJuaHVicGx1cy1kZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NjQwMDAsImV4cCI6MjA1MDU0MDAwMH0.demo-key-for-development";
      fs.writeFileSync(appsettingsPath, JSON.stringify(appsettings, null, 2));
      console.log("✅ Backend configurado");
    }

    console.log("\n🎉 ¡Configuración completada automáticamente!");
    console.log("📁 Archivos actualizados:");
    console.log("   - .env (variables de entorno)");
    console.log("   - backend/LearnHubPlus.API/appsettings.json");
    console.log("\n💡 Nota: Usando credenciales de demostración");
    console.log("   Para usar tu propio Supabase, edita el archivo .env");
    console.log("\n🔄 Reinicia el servidor de desarrollo:");
    console.log("   npm run dev");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

autoFixEnv();








