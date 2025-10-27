# Configuración de Supabase para LearnHubPlus

Este documento explica cómo configurar Supabase para el proyecto LearnHubPlus.

## 1. Crear un proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto
3. Anota la URL del proyecto y las claves API

## 2. Configurar variables de entorno

### Frontend (React)

Crea un archivo `.env` en la raíz del proyecto con:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
```

### Backend (.NET)

Actualiza los archivos `appsettings.json` y `appsettings.Development.json` con:

```json
{
  "Supabase": {
    "Url": "tu_url_de_supabase",
    "AnonKey": "tu_clave_anonima_de_supabase",
    "ServiceRoleKey": "tu_clave_de_servicio_de_supabase"
  }
}
```

## 3. Configurar la base de datos

1. Ve al SQL Editor en tu dashboard de Supabase
2. Ejecuta el script `database/schema.sql` para crear las tablas y políticas RLS
3. Verifica que las tablas se hayan creado correctamente

## 4. Configurar autenticación

1. Ve a Authentication > Settings en tu dashboard de Supabase
2. Configura las URLs de redirección:
   - Site URL: `http://localhost:5173`
   - Redirect URLs: `http://localhost:5173/**`
3. Habilita el proveedor de email si es necesario

## 5. Configurar políticas RLS

El script `database/schema.sql` incluye todas las políticas de Row Level Security necesarias:

- Los usuarios solo pueden ver y editar su propio perfil
- Los estudiantes pueden ver los cursos y inscribirse
- Los profesores pueden crear y gestionar cursos
- Los administradores tienen acceso completo

## 6. Probar la conexión

### Frontend

1. Ejecuta `npm run dev`
2. Intenta registrarte o iniciar sesión
3. Verifica que los datos se guarden en Supabase

### Backend

1. Ejecuta `dotnet run` en el directorio `backend/LearnHubPlus.API`
2. Visita `https://localhost:7000/api/users/test` para probar la conexión

## 7. Estructura de la base de datos

### Tablas principales:

- `users`: Perfiles de usuario (extiende auth.users)
- `courses`: Cursos del sistema
- `course_enrollments`: Inscripciones de estudiantes
- `assignments`: Tareas y evaluaciones
- `submissions`: Entregas de estudiantes
- `forum_posts`: Posts del foro
- `forum_comments`: Comentarios en posts
- `notifications`: Notificaciones del sistema

### Roles de usuario:

- `estudiante`: Puede ver cursos, inscribirse, entregar tareas
- `profesor`: Puede crear cursos, gestionar tareas, calificar
- `admin`: Acceso completo al sistema

## 8. Solución de problemas

### Error de conexión

- Verifica que las URLs y claves sean correctas
- Asegúrate de que el proyecto de Supabase esté activo

### Error de autenticación

- Verifica las políticas RLS
- Asegúrate de que el usuario esté autenticado correctamente

### Error de CORS

- Verifica la configuración de CORS en el backend
- Asegúrate de que las URLs estén permitidas

## 9. Próximos pasos

1. Configura el almacenamiento de archivos si es necesario
2. Implementa funciones de Supabase para lógica compleja
3. Configura webhooks para notificaciones en tiempo real
4. Implementa backup y recuperación de datos

