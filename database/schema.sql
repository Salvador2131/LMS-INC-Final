-- LearnHubPlus Database Schema for Supabase
-- This file contains the SQL schema to set up the database tables

-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('estudiante', 'profesor', 'admin')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create courses table
CREATE TABLE public.courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    instructor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course_enrollments table
CREATE TABLE public.course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(course_id, student_id)
);

-- Create tareas table
CREATE TABLE public.tareas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE,
    max_points INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tarea_id UUID REFERENCES public.tareas(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT,
    file_url TEXT,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    grade INTEGER,
    feedback TEXT,
    UNIQUE(assignment_id, student_id)
);

-- Create forum_posts table
CREATE TABLE public.forum_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_comments table
CREATE TABLE public.forum_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.forum_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create notifications table
CREATE TABLE public.notifications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tareas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

-- Create RLS policies for courses table
CREATE POLICY "Anyone can view courses" ON public.courses
    FOR SELECT USING (true);

CREATE POLICY "Instructors can create courses" ON public.courses
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'profesor'
        )
    );

CREATE POLICY "Course instructors can update their courses" ON public.courses
    FOR UPDATE USING (
        instructor_id = auth.uid() OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create RLS policies for course_enrollments table
CREATE POLICY "Students can view their enrollments" ON public.course_enrollments
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can enroll in courses" ON public.course_enrollments
    FOR INSERT WITH CHECK (student_id = auth.uid());

-- Create RLS policies for tareas table
CREATE POLICY "Anyone can view tareas" ON public.tareas
    FOR SELECT USING (true);

CREATE POLICY "Instructors can manage tareas" ON public.tareas
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.courses 
            WHERE id = course_id AND instructor_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create RLS policies for submissions table
CREATE POLICY "Students can view their submissions" ON public.submissions
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create submissions" ON public.submissions
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update their submissions" ON public.submissions
    FOR UPDATE USING (student_id = auth.uid());

-- Create RLS policies for forum_posts table
CREATE POLICY "Anyone can view forum posts" ON public.forum_posts
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create forum posts" ON public.forum_posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own posts" ON public.forum_posts
    FOR UPDATE USING (author_id = auth.uid());

-- Create RLS policies for forum_comments table
CREATE POLICY "Anyone can view forum comments" ON public.forum_comments
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create comments" ON public.forum_comments
    FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments" ON public.forum_comments
    FOR UPDATE USING (author_id = auth.uid());

-- Create RLS policies for notifications table
CREATE POLICY "Users can view their notifications" ON public.notifications
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true);

-- Create function to automatically create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        'estudiante'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_courses_instructor ON public.courses(instructor_id);
CREATE INDEX idx_course_enrollments_student ON public.course_enrollments(student_id);
CREATE INDEX idx_course_enrollments_course ON public.course_enrollments(course_id);
CREATE INDEX idx_tareas_course ON public.tareas(course_id);
CREATE INDEX idx_submissions_tarea ON public.submissions(tarea_id);
CREATE INDEX idx_submissions_student ON public.submissions(student_id);
CREATE INDEX idx_forum_posts_course ON public.forum_posts(course_id);
CREATE INDEX idx_forum_posts_author ON public.forum_posts(author_id);
CREATE INDEX idx_forum_comments_post ON public.forum_comments(post_id);
CREATE INDEX idx_notifications_user ON public.notifications(user_id);

