-- Rollback Migration: Rename tareas table back to assignments
-- Date: 2025-01-27
-- Description: Rollback script to revert tareas back to assignments

-- Step 1: Update RLS policies
DROP POLICY IF EXISTS "Anyone can view tareas" ON public.tareas;
DROP POLICY IF EXISTS "Instructors can manage tareas" ON public.tareas;

-- Step 2: Update indexes
DROP INDEX IF EXISTS idx_tareas_course;
DROP INDEX IF EXISTS idx_submissions_tarea;

-- Step 3: Update foreign key in submissions table
ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_tarea_id_fkey;
ALTER TABLE public.submissions RENAME COLUMN tarea_id TO assignment_id;
ALTER TABLE public.submissions ADD CONSTRAINT submissions_assignment_id_fkey 
FOREIGN KEY (assignment_id) REFERENCES public.tareas(id) ON DELETE CASCADE;

-- Step 4: Rename the table back
ALTER TABLE public.tareas RENAME TO assignments;

-- Step 5: Recreate original indexes
CREATE INDEX idx_assignments_course ON public.assignments(course_id);
CREATE INDEX idx_submissions_assignment ON public.submissions(assignment_id);

-- Step 6: Recreate original policies
CREATE POLICY "Anyone can view assignments" ON public.assignments
    FOR SELECT USING (true);

CREATE POLICY "Instructors can manage assignments" ON public.assignments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE courses.id = assignments.course_id 
            AND courses.instructor_id = auth.uid()
        ) OR EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Step 7: Update comment
COMMENT ON TABLE public.assignments IS 'Assignments and evaluations for courses';
