#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function checkEnvironment() {
  const envPath = path.join(process.cwd(), ".env");

  if (!fs.existsSync(envPath)) {
    console.log("🔧 Archivo .env no encontrado");
    console.log("📋 Para configurar Supabase UNA SOLA VEZ:");
    console.log("   npm run configure-once");
    console.log("");
    return false;
  }

  // Verificar si el .env tiene credenciales reales
  const envContent = fs.readFileSync(envPath, "utf8");
  if (
    envContent.includes("tu-proyecto-id.supabase.co") ||
    envContent.includes("tu_clave_anonima_aqui")
  ) {
    console.log("⚠️  Archivo .env tiene credenciales de ejemplo");
    console.log("📋 Para configurar Supabase UNA SOLA VEZ:");
    console.log("   npm run configure-once");
    console.log("");
    return false;
  }

  console.log("✅ Configuración de Supabase lista");
  return true;
}

checkEnvironment();
