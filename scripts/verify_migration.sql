-- =============================================
-- VERIFICACIÓN DE MIGRACIÓN: Assignments → Tareas
-- Fecha: 2025-01-27
-- =============================================

-- Verificar que la tabla tareas existe
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'tareas' AND table_schema = 'public')
        THEN '✅ Tabla tareas existe'
        ELSE '❌ Tabla tareas NO existe'
    END as verificacion_tabla;

-- Verificar que la tabla assignments NO existe
SELECT 
    CASE 
        WHEN NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'assignments' AND table_schema = 'public')
        THEN '✅ Tabla assignments eliminada correctamente'
        ELSE '❌ Tabla assignments AÚN existe'
    END as verificacion_tabla_antigua;

-- Verificar columna tarea_id en submissions
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'submissions' AND column_name = 'tarea_id' AND table_schema = 'public')
        THEN '✅ Columna tarea_id existe en submissions'
        ELSE '❌ Columna tarea_id NO existe en submissions'
    END as verificacion_columna;

-- Verificar que assignment_id NO existe en submissions
SELECT 
    CASE 
        WHEN NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'submissions' AND column_name = 'assignment_id' AND table_schema = 'public')
        THEN '✅ Columna assignment_id eliminada correctamente'
        ELSE '❌ Columna assignment_id AÚN existe'
    END as verificacion_columna_antigua;

-- Verificar índices
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_tareas_course')
        THEN '✅ Índice idx_tareas_course existe'
        ELSE '❌ Índice idx_tareas_course NO existe'
    END as verificacion_indice_tareas;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_submissions_tarea')
        THEN '✅ Índice idx_submissions_tarea existe'
        ELSE '❌ Índice idx_submissions_tarea NO existe'
    END as verificacion_indice_submissions;

-- Verificar políticas RLS
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tareas' AND policyname = 'Anyone can view tareas')
        THEN '✅ Política "Anyone can view tareas" existe'
        ELSE '❌ Política "Anyone can view tareas" NO existe'
    END as verificacion_politica_view;

SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'tareas' AND policyname = 'Instructors can manage tareas')
        THEN '✅ Política "Instructors can manage tareas" existe'
        ELSE '❌ Política "Instructors can manage tareas" NO existe'
    END as verificacion_politica_manage;

-- Mostrar estructura de la tabla tareas
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'tareas' AND table_schema = 'public'
ORDER BY ordinal_position;

-- Mostrar estructura de la tabla submissions (solo columnas relevantes)
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'submissions' 
AND table_schema = 'public'
AND column_name IN ('tarea_id', 'assignment_id')
ORDER BY ordinal_position;
