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

console.log("🔄 Cambiar Sistema de Autenticación\n");

// Función para hacer preguntas
const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function switchAuth() {
  try {
    const configPath = path.join(
      process.cwd(),
      "src",
      "config",
      "auth.config.ts"
    );

    if (!fs.existsSync(configPath)) {
      console.log("❌ Archivo de configuración no encontrado");
      process.exit(1);
    }

    let configContent = fs.readFileSync(configPath, "utf8");

    // Detectar configuración actual
    const isCurrentlyReal = configContent.includes("USE_REAL_AUTH = true");
    const currentMode = isCurrentlyReal ? "Supabase REAL" : "MOCK";

    console.log(`📊 Configuración actual: ${currentMode}`);
    console.log("\n¿Qué sistema quieres usar?");
    console.log("1. Supabase REAL (base de datos real)");
    console.log("2. MOCK (datos simulados para desarrollo)");

    const choice = await question("\nSelecciona una opción (1 o 2): ");

    let newValue;
    let newMode;

    if (choice === "1") {
      newValue = "true";
      newMode = "Supabase REAL";
    } else if (choice === "2") {
      newValue = "false";
      newMode = "MOCK";
    } else {
      console.log("❌ Opción inválida");
      process.exit(1);
    }

    // Actualizar configuración
    configContent = configContent.replace(
      /USE_REAL_AUTH = (true|false)/,
      `USE_REAL_AUTH = ${newValue}`
    );

    fs.writeFileSync(configPath, configContent);

    console.log(`\n✅ Configuración cambiada a: ${newMode}`);
    console.log(
      "🔄 Reinicia el servidor de desarrollo para aplicar los cambios:"
    );
    console.log("   npm run dev");

    if (newValue === "true") {
      console.log("\n📋 Para usar Supabase REAL necesitas:");
      console.log(
        "   1. Tener credenciales configuradas (npm run configure-once)"
      );
      console.log("   2. Tener las tablas creadas en Supabase");
      console.log("   3. Reiniciar el servidor");
    }
  } catch (error) {
    console.error("❌ Error cambiando configuración:", error.message);
  } finally {
    rl.close();
  }
}

switchAuth();
