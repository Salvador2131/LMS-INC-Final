-- Script completo para configurar Supabase
-- Ejecuta este script en el SQL Editor de Supabase

-- 1. Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Crear tabla de usuarios (extiende auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('estudiante', 'profesor', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Crear tabla de cursos
CREATE TABLE public.courses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    instructor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    category TEXT NOT NULL,
    status TEXT DEFAULT 'Disponible' CHECK (status IN ('Disponible', 'Activo', 'En Revisión', 'Pausado')),
    cover_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Crear tabla de inscripciones
CREATE TABLE public.course_enrollments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(course_id, student_id)
);

-- 5. Crear tabla de asistencia
CREATE TABLE public.attendance (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    class_date DATE NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late')),
    marked_by UUID REFERENCES public.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Crear tabla de tareas
CREATE TABLE public.assignments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    max_points INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Crear tabla de calificaciones
CREATE TABLE public.grades (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    points INTEGER NOT NULL,
    feedback TEXT,
    graded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(assignment_id, student_id)
);

-- 8. Configurar Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

-- 9. Políticas de RLS para usuarios
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- 10. Políticas de RLS para cursos
CREATE POLICY "Anyone can view courses" ON public.courses
    FOR SELECT USING (true);

CREATE POLICY "Instructors can manage their courses" ON public.courses
    FOR ALL USING (auth.uid() = instructor_id);

CREATE POLICY "Admins can manage all courses" ON public.courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- 11. Políticas de RLS para inscripciones
CREATE POLICY "Students can view their enrollments" ON public.course_enrollments
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Instructors can view course enrollments" ON public.course_enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = course_id AND instructor_id = auth.uid()
        )
    );

-- 12. Políticas de RLS para asistencia
CREATE POLICY "Students can view their attendance" ON public.attendance
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Instructors can manage attendance" ON public.attendance
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = course_id AND instructor_id = auth.uid()
        )
    );

-- 13. Insertar datos de prueba
INSERT INTO public.users (id, email, name, role) VALUES
    ('00000000-0000-0000-0000-000000000001', 'admin@aorusinc.com', 'Administrador', 'admin'),
    ('00000000-0000-0000-0000-000000000002', 'profesor@aorusinc.com', 'Profesor Juan', 'profesor'),
    ('00000000-0000-0000-0000-000000000003', 'estudiante@aorusinc.com', 'Estudiante María', 'estudiante');

-- 14. Insertar cursos de prueba
INSERT INTO public.courses (id, title, description, instructor_id, category, status) VALUES
    ('10000000-0000-0000-0000-000000000001', 'Matemáticas Avanzadas', 'Curso de matemáticas para nivel avanzado', '00000000-0000-0000-0000-000000000002', 'Matemáticas', 'Activo'),
    ('10000000-0000-0000-0000-000000000002', 'Historia Universal', 'Historia del mundo desde la antigüedad', '00000000-0000-0000-0000-000000000002', 'Historia', 'Activo'),
    ('10000000-0000-0000-0000-000000000003', 'Programación Python', 'Aprende Python desde cero', '00000000-0000-0000-0000-000000000002', 'Tecnología', 'Activo');

-- 15. Crear índices para mejor rendimiento
CREATE INDEX idx_courses_instructor ON public.courses(instructor_id);
CREATE INDEX idx_course_enrollments_student ON public.course_enrollments(student_id);
CREATE INDEX idx_course_enrollments_course ON public.course_enrollments(course_id);
CREATE INDEX idx_attendance_course_date ON public.attendance(course_id, class_date);
CREATE INDEX idx_attendance_student ON public.attendance(student_id);
CREATE INDEX idx_grades_student ON public.grades(student_id);
CREATE INDEX idx_grades_assignment ON public.grades(assignment_id);








