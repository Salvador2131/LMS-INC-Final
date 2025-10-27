-- Migration: Rename assignments table to tareas
-- Date: 2025-01-27
-- Description: Simple migration to rename assignments table to tareas

-- Step 1: Rename the table
ALTER TABLE public.assignments RENAME TO tareas;

-- Step 2: Update the foreign key in submissions table
-- First, drop the existing foreign key constraint
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_assignment_id_fkey;

-- Rename the column
ALTER TABLE public.submissions RENAME COLUMN assignment_id TO tarea_id;

-- Add the new foreign key constraint
ALTER TABLE public.submissions ADD CONSTRAINT submissions_tarea_id_fkey 
FOREIGN KEY (tarea_id) REFERENCES public.tareas(id) ON DELETE CASCADE;

-- Step 3: Update indexes
-- Drop old index
DROP INDEX IF EXISTS idx_assignments_course;
DROP INDEX IF EXISTS idx_submissions_assignment;

-- Create new indexes
CREATE INDEX idx_tareas_course ON public.tareas(course_id);
CREATE INDEX idx_submissions_tarea ON public.submissions(tarea_id);

-- Step 4: Update RLS policies
-- Drop old policies
DROP POLICY IF EXISTS "Anyone can view assignments" ON public.tareas;
DROP POLICY IF EXISTS "Instructors can manage assignments" ON public.tareas;

-- Create new policies
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

-- Step 5: Add comment
COMMENT ON TABLE public.tareas IS 'Tareas y evaluaciones de los cursos - Migrated from assignments on 2025-01-27';
