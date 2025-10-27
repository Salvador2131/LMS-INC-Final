-- =============================================
-- MIGRACIÓN: Assignments → Tareas
-- Fecha: 2025-01-27
-- Descripción: Renombra tabla assignments a tareas
-- =============================================

-- Verificar que la tabla assignments existe
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'assignments' AND table_schema = 'public') THEN
        RAISE EXCEPTION 'La tabla assignments no existe. No se puede realizar la migración.';
    END IF;
END $$;

-- Paso 1: Renombrar la tabla
ALTER TABLE public.assignments RENAME TO tareas;

-- Paso 2: Actualizar la columna en submissions
-- Primero, verificar que la columna assignment_id existe
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'submissions' AND column_name = 'assignment_id' AND table_schema = 'public') THEN
        -- Eliminar la restricción de clave foránea existente
        ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_assignment_id_fkey;
        
        -- Renombrar la columna
        ALTER TABLE public.submissions RENAME COLUMN assignment_id TO tarea_id;
        
        -- Crear la nueva restricción de clave foránea
        ALTER TABLE public.submissions ADD CONSTRAINT submissions_tarea_id_fkey 
        FOREIGN KEY (tarea_id) REFERENCES public.tareas(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Paso 3: Actualizar índices
-- Eliminar índices antiguos
DROP INDEX IF EXISTS idx_assignments_course;
DROP INDEX IF EXISTS idx_submissions_assignment;

-- Crear nuevos índices
CREATE INDEX IF NOT EXISTS idx_tareas_course ON public.tareas(course_id);
CREATE INDEX IF NOT EXISTS idx_submissions_tarea ON public.submissions(tarea_id);

-- Paso 4: Actualizar políticas RLS
-- Eliminar políticas antiguas
DROP POLICY IF EXISTS "Anyone can view assignments" ON public.tareas;
DROP POLICY IF EXISTS "Instructors can manage assignments" ON public.tareas;

-- Crear nuevas políticas
CREATE POLICY "Anyone can view tareas" ON public.tareas
    FOR SELECT USING (true);

CREATE POLICY "Instructors can manage tareas" ON public.tareas
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE courses.id = tareas.course_id 
            AND courses.instructor_id = auth.uid()
        ) OR EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Paso 5: Agregar comentarios
COMMENT ON TABLE public.tareas IS 'Tareas y evaluaciones de los cursos - Migrada desde assignments el 2025-01-27';

-- Paso 6: Verificar que la migración fue exitosa
DO $$
DECLARE
    table_exists BOOLEAN;
    column_exists BOOLEAN;
    index_exists BOOLEAN;
BEGIN
    -- Verificar que la tabla tareas existe
    SELECT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'tareas' AND table_schema = 'public'
    ) INTO table_exists;
    
    -- Verificar que la columna tarea_id existe en submissions
    SELECT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'submissions' AND column_name = 'tarea_id' AND table_schema = 'public'
    ) INTO column_exists;
    
    -- Verificar que el índice existe
    SELECT EXISTS (
        SELECT 1 FROM pg_indexes 
        WHERE indexname = 'idx_tareas_course'
    ) INTO index_exists;
    
    IF table_exists AND column_exists AND index_exists THEN
        RAISE NOTICE '✅ MIGRACIÓN EXITOSA: Tabla assignments renombrada a tareas';
        RAISE NOTICE '✅ Columna assignment_id renombrada a tarea_id en submissions';
        RAISE NOTICE '✅ Índices y políticas actualizados correctamente';
    ELSE
        RAISE EXCEPTION '❌ ERROR EN LA MIGRACIÓN: Verificar los pasos anteriores';
    END IF;
END $$;

-- Mostrar resumen final
SELECT 
    'Migración completada exitosamente' as status,
    NOW() as fecha_migracion,
    'assignments → tareas' as cambio_realizado;
