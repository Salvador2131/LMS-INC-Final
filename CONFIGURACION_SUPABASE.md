# 🔧 Configuración Persistente de Supabase

## ❌ Problema Común

Cuando cierras y abres el IDE, la configuración de Supabase se pierde y tienes que volver a configurarla.

## ✅ Solución Implementada

He creado un sistema de configuración persistente que mantiene tus credenciales incluso cuando cierras el IDE.

### 📁 Archivos Creados

1. **`src/config/supabase.config.ts`** - Configuración persistente del frontend
2. **`backend/LearnHubPlus.API/Configuration/SupabaseConfig.cs`** - Configuración del backend
3. **Servicios mejorados** con valores por defecto y logging

## 🚀 Cómo Configurar (Una Sola Vez)

### Opción 1: Variables de Entorno (Recomendado)

#### Frontend

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-proyecto-id.supabase.co
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_aqui
```

#### Backend

Actualiza `backend/LearnHubPlus.API/appsettings.json`:

```json
{
  "Supabase": {
    "Url": "https://tu-proyecto-id.supabase.co",
    "AnonKey": "tu_clave_anonima_aqui",
    "ServiceRoleKey": "tu_clave_de_servicio_aqui"
  }
}
```

### Opción 2: Configuración Directa en Código

#### Frontend

Edita `src/config/supabase.config.ts`:

```typescript
const defaultConfig: SupabaseConfig = {
  url: "https://tu-proyecto-id.supabase.co", // ← Reemplaza aquí
  anonKey: "tu_clave_anonima_aqui", // ← Reemplaza aquí
};
```

#### Backend

Los valores por defecto ya están configurados en `SupabaseService.cs`

## 🔍 Verificar Configuración

### Frontend

1. Abre la consola del navegador (F12)
2. Busca mensajes de advertencia sobre configuración
3. Si ves el mensaje de configuración faltante, sigue los pasos arriba

### Backend

1. Ejecuta `dotnet run` en el directorio del backend
2. Revisa los logs para ver si Supabase se inicializa correctamente
3. Visita `https://localhost:7000/api/users/test`

## 🛠️ Ventajas de Esta Solución

1. **Persistencia**: La configuración se mantiene entre sesiones del IDE
2. **Fallback**: Si no hay variables de entorno, usa valores por defecto
3. **Logging**: Te avisa si hay problemas de configuración
4. **Flexibilidad**: Puedes usar variables de entorno O configuración directa
5. **Desarrollo**: Funciona incluso sin configuración (con valores de ejemplo)

## 🔄 Flujo de Configuración

```
1. Configuras UNA VEZ (variables de entorno o código)
2. Cierras el IDE
3. Abres el IDE
4. ¡La configuración sigue ahí! ✅
```

## 🚨 Si Sigue Sin Funcionar

1. **Verifica que los archivos `.env` estén en la raíz del proyecto**
2. **Reinicia el servidor de desarrollo** (`npm run dev` y `dotnet run`)
3. **Limpia la caché del navegador** (Ctrl+Shift+R)
4. **Verifica que las credenciales de Supabase sean correctas**

## 📝 Notas Importantes

- Los archivos `.env` NO se suben a Git (están en `.gitignore`)
- Los valores por defecto son solo para desarrollo
- Para producción, SIEMPRE usa variables de entorno
- Las credenciales se obtienen en [supabase.com/dashboard](https://supabase.com/dashboard)

