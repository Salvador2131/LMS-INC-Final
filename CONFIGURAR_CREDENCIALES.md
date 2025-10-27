# 🔑 CONFIGURAR CREDENCIALES DE SUPABASE

## 📋 PASOS RÁPIDOS (2 minutos)

### 1. Crear archivo .env

Crea un archivo llamado `.env` en la raíz del proyecto (mismo nivel que `package.json`) con este contenido:

```env
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

### 2. Obtener credenciales de Supabase

1. Ve a [supabase.com/dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto (o crea uno nuevo)
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → reemplaza `https://tu-proyecto-id.supabase.co`
   - **anon public** key → reemplaza `tu_clave_anonima_aqui`

### 3. Verificar configuración

Ejecuta este comando para verificar:

```bash
node scripts/check-supabase-config.js
```

Deberías ver: **✅ Configuración completa detectada**

## 🎯 EJEMPLO COMPLETO

Si tu proyecto de Supabase tiene:

- URL: `https://abcdefghijklmnop.supabase.co`
- Anon Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

Tu archivo `.env` quedaría así:

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ✅ DESPUÉS DE CONFIGURAR

1. **Reinicia el servidor**: `npm run dev`
2. **Prueba la conexión**: Ve a la consola del navegador (F12)
3. **¡Listo!** No tendrás que configurar nada más nunca

## 🚨 SI ALGO FALLA

1. Verifica que el archivo `.env` esté en la raíz del proyecto
2. Verifica que las credenciales sean correctas
3. Reinicia el servidor de desarrollo
4. Ejecuta el script de verificación nuevamente
