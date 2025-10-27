import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear archivo .env si no existe
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  const envContent = `# Configuración de Supabase
# Reemplaza estos valores con tus credenciales reales de Supabase
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui

# Para obtener estas credenciales:
# 1. Ve a https://supabase.com
# 2. Crea un nuevo proyecto o selecciona uno existente
# 3. Ve a Settings > API
# 4. Copia la URL del proyecto y la clave anónima`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Archivo .env creado');
} else {
  console.log('ℹ️  El archivo .env ya existe');
}

if (!fs.existsSync(envExamplePath)) {
  const envExampleContent = `# Configuración de Supabase
# Reemplaza estos valores con tus credenciales reales de Supabase
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui

# Para obtener estas credenciales:
# 1. Ve a https://supabase.com
# 2. Crea un nuevo proyecto o selecciona uno existente
# 3. Ve a Settings > API
# 4. Copia la URL del proyecto y la clave anónima`;

  fs.writeFileSync(envExamplePath, envExampleContent);
  console.log('✅ Archivo .env.example creado');
} else {
  console.log('ℹ️  El archivo .env.example ya existe');
}
