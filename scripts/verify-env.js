#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function verifyEnvironment() {
  console.log("🔍 Verificación Completa de Variables de Entorno\n");

  const envPath = path.join(process.cwd(), ".env");
  let envExists = false;
  let envContent = "";

  // Verificar archivo .env
  if (fs.existsSync(envPath)) {
    envExists = true;
    envContent = fs.readFileSync(envPath, "utf8");
    console.log("✅ Archivo .env encontrado");
  } else {
    console.log("❌ Archivo .env no encontrado");
  }

  // Verificar variables necesarias
  const requiredVars = [
    "VITE_SUPABASE_URL",
    "VITE_SUPABASE_ANON_KEY",
    "SUPABASE_URL",
    "SUPABASE_ANON_KEY",
  ];

  const missingVars = [];
  const exampleVars = [];

  requiredVars.forEach((varName) => {
    if (envContent.includes(varName)) {
      const value = envContent.match(new RegExp(`${varName}=(.+)`));
      if (
        value &&
        value[1] &&
        !value[1].includes("tu-") &&
        !value[1].includes("tu_clave")
      ) {
        console.log(`✅ ${varName}: Configurado`);
      } else {
        console.log(`⚠️  ${varName}: Valor de ejemplo`);
        exampleVars.push(varName);
      }
    } else {
      console.log(`❌ ${varName}: No encontrado`);
      missingVars.push(varName);
    }
  });

  // Verificar configuración de Vite
  const viteConfigPath = path.join(process.cwd(), "vite.config.ts");
  if (fs.existsSync(viteConfigPath)) {
    const viteConfig = fs.readFileSync(viteConfigPath, "utf8");
    if (viteConfig.includes("loadEnv") && viteConfig.includes("envPrefix")) {
      console.log("✅ Vite configurado para cargar variables de entorno");
    } else {
      console.log("⚠️  Vite no configurado completamente");
    }
  }

  // Verificar configuración de ASP.NET Core
  const programPath = path.join(
    process.cwd(),
    "backend",
    "LearnHubPlus.API",
    "Program.cs"
  );
  if (fs.existsSync(programPath)) {
    const programContent = fs.readFileSync(programPath, "utf8");
    if (
      programContent.includes("DotNetEnv") &&
      programContent.includes("Env.Load()")
    ) {
      console.log(
        "✅ ASP.NET Core configurado para cargar variables de entorno"
      );
    } else {
      console.log("⚠️  ASP.NET Core no configurado completamente");
    }
  }

  // Resumen
  console.log("\n📊 Resumen:");
  if (missingVars.length === 0 && exampleVars.length === 0) {
    console.log(
      "🎉 ¡Configuración completa! Todas las variables están configuradas correctamente."
    );
  } else {
    if (missingVars.length > 0) {
      console.log(`❌ Variables faltantes: ${missingVars.join(", ")}`);
    }
    if (exampleVars.length > 0) {
      console.log(
        `⚠️  Variables con valores de ejemplo: ${exampleVars.join(", ")}`
      );
    }
    console.log("\n🔧 Para configurar:");
    console.log("   npm run configure-once");
  }

  return missingVars.length === 0 && exampleVars.length === 0;
}

verifyEnvironment();

