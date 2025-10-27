#!/usr/bin/env node

/**
 * Script para detectar y usar el archivo .env existente
 * Ejecuta: node scripts/auto-detect-env.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🔍 Detectando configuración existente de Supabase...\n");

// Buscar archivo .env
const envPath = path.join(process.cwd(), ".env");
const envExists = fs.existsSync(envPath);

if (envExists) {
  console.log("✅ Archivo .env encontrado");

  try {
    const envContent = fs.readFileSync(envPath, "utf8");
    const lines = envContent.split("\n");

    let url = "";
    let anonKey = "";

    lines.forEach((line) => {
      if (line.startsWith("VITE_SUPABASE_URL=")) {
        url = line.split("=")[1]?.trim();
      }
      if (line.startsWith("VITE_SUPABASE_ANON_KEY=")) {
        anonKey = line.split("=")[1]?.trim();
      }
    });

    if (
      url &&
      anonKey &&
      url !== "your_supabase_project_url" &&
      anonKey !== "your_supabase_anon_key"
    ) {
      console.log("✅ Credenciales válidas encontradas en .env");
      console.log(`   URL: ${url}`);
      console.log(`   Key: ${anonKey.substring(0, 20)}...`);

      // Actualizar configuración persistente con los valores del .env
      const configPath = path.join(
        process.cwd(),
        "src",
        "config",
        "supabase.config.ts"
      );
      let configContent = fs.readFileSync(configPath, "utf8");

      // Reemplazar valores por defecto con los del .env
      configContent = configContent.replace(
        'url: "https://your-project-id.supabase.co"',
        `url: "${url}"`
      );
      configContent = configContent.replace(
        'anonKey: "your-anon-key-here"',
        `anonKey: "${anonKey}"`
      );

      fs.writeFileSync(configPath, configContent);
      console.log(
        "✅ Configuración persistente actualizada con credenciales del .env"
      );

      // Actualizar backend también
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
          ServiceRoleKey: "tu_clave_de_servicio_aqui",
        },
      };

      fs.writeFileSync(
        backendConfigPath,
        JSON.stringify(backendConfig, null, 2)
      );
      fs.writeFileSync(
        backendDevConfigPath,
        JSON.stringify(backendConfig, null, 2)
      );
      console.log("✅ Configuración del backend actualizada");

      console.log("\n🎉 ¡Configuración completada automáticamente!");
      console.log(
        "💡 Ahora tu configuración persistirá entre sesiones del IDE"
      );
    } else {
      console.log(
        "⚠️  Archivo .env encontrado pero con credenciales de ejemplo"
      );
      console.log(
        "💡 Reemplaza los valores en tu archivo .env con tus credenciales reales"
      );
    }
  } catch (error) {
    console.error("❌ Error leyendo archivo .env:", error.message);
  }
} else {
  console.log("❌ Archivo .env no encontrado");
  console.log(
    "💡 Crea un archivo .env en la raíz del proyecto con tus credenciales"
  );
}

console.log("\n🚀 Para probar la configuración:");
console.log("   1. npm run dev");
console.log("   2. node scripts/check-supabase-config.js");
