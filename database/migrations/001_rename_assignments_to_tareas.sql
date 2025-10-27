-- Migration: Rename assignments table to tareas
-- Date: 2025-01-27
-- Description: Changes the assignments table name to tareas for Spanish consistency

-- Rename the assignments table to tareas
ALTER TABLE public.assignments RENAME TO tareas;

-- Update any references in comments or documentation
COMMENT ON TABLE public.tareas IS 'Tareas y evaluaciones de los cursos';

-- Update the submissions table foreign key reference
-- (This should automatically update due to the foreign key constraint)
-- But let's verify the constraint name and update if needed
DO $$
BEGIN
    -- Check if the foreign key constraint exists and update it
    IF EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name LIKE '%assignments%' 
        AND table_name = 'submissions'
    ) THEN
        -- Drop the old constraint
        ALTER TABLE public.submissions DROP CONSTRAINT IF EXISTS submissions_assignment_id_fkey;
        -- Add the new constraint
        ALTER TABLE public.submissions ADD CONSTRAINT submissions_tarea_id_fkey 
        FOREIGN KEY (assignment_id) REFERENCES public.tareas(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Update any indexes that might reference the old table name
-- (PostgreSQL should handle this automatically, but let's be explicit)
-- No specific indexes to update as they follow the table name

-- Update any RLS policies that might reference assignments
-- Check if there are any policies on the assignments table
DO $$
DECLARE
    policy_record RECORD;
BEGIN
    -- Get all policies on the assignments table (now tareas)
    FOR policy_record IN 
        SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
        FROM pg_policies 
        WHERE tablename = 'tareas'
    LOOP
        -- Drop the old policy
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I', 
                      policy_record.policyname, 
                      policy_record.schemaname, 
                      policy_record.tablename);
        
        -- Recreate the policy with the same settings
        EXECUTE format('CREATE POLICY %I ON %I.%I FOR %s TO %s %s %s %s',
                      policy_record.policyname,
                      policy_record.schemaname,
                      policy_record.tablename,
                      policy_record.cmd,
                      policy_record.roles,
                      CASE WHEN policy_record.permissive THEN 'PERMISSIVE' ELSE 'RESTRICTIVE' END,
                      CASE WHEN policy_record.qual IS NOT NULL THEN 'USING (' || policy_record.qual || ')' ELSE '' END,
                      CASE WHEN policy_record.with_check IS NOT NULL THEN 'WITH CHECK (' || policy_record.with_check || ')' ELSE '' END
        );
    END LOOP;
END $$;

-- Add a comment to track this migration
COMMENT ON TABLE public.tareas IS 'Tareas y evaluaciones de los cursos - Migrated from assignments on 2025-01-27';
