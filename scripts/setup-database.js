import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de Supabase
const supabaseUrl = "https://zizvmjozikfxeucnhcqc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InppenZtam96aWtmeGV1Y25oY3FjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0Mjk0MjYsImV4cCI6MjA3NTAwNTQyNn0.e6F9Nk0GnaYPiBzuf5NTwUIRG03aA66CF6gNgx01hL0";

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log("🚀 Configurando base de datos...");

    // Leer el archivo SQL
    const sqlPath = path.join(__dirname, "..", "database", "schema.sql");
    const sqlContent = fs.readFileSync(sqlPath, "utf8");

    // Dividir el SQL en statements individuales
    const statements = sqlContent
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    console.log(`📝 Ejecutando ${statements.length} statements SQL...`);

    // Ejecutar cada statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(
          `   ${i + 1}/${statements.length}: ${statement.substring(0, 50)}...`
        );

        const { error } = await supabase.rpc("exec_sql", { sql: statement });
        if (error) {
          console.warn(`⚠️  Error en statement ${i + 1}:`, error.message);
          // Continuar con el siguiente statement
        }
      }
    }

    console.log("✅ Base de datos configurada correctamente");

    // Crear usuarios de prueba
    await createTestUsers();
  } catch (error) {
    console.error("❌ Error configurando la base de datos:", error);
  }
}

async function createTestUsers() {
  console.log("👥 Creando usuarios de prueba...");

  const testUsers = [
    {
      email: "admin@aorusinc.com",
      password: "admin123",
      name: "Administrador",
      role: "admin",
    },
    {
      email: "profesor@aorusinc.com",
      password: "profesor123",
      name: "Profesor Demo",
      role: "profesor",
    },
    {
      email: "estudiante@aorusinc.com",
      password: "estudiante123",
      name: "Estudiante Demo",
      role: "estudiante",
    },
  ];

  for (const user of testUsers) {
    try {
      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
      });

      if (authError) {
        console.warn(
          `⚠️  Error creando usuario ${user.email}:`,
          authError.message
        );
        continue;
      }

      if (authData.user) {
        // Crear perfil en la tabla users
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        });

        if (profileError) {
          console.warn(
            `⚠️  Error creando perfil para ${user.email}:`,
            profileError.message
          );
        } else {
          console.log(`✅ Usuario ${user.email} creado correctamente`);
        }
      }
    } catch (error) {
      console.warn(
        `⚠️  Error procesando usuario ${user.email}:`,
        error.message
      );
    }
  }

  console.log("✅ Usuarios de prueba creados");
}

// Ejecutar la configuración
setupDatabase();

