
import CourseCard from "./CourseCard";

interface Course {
  id: string;
  title: string;
  instructor: string;
  coverImage: string;
  category: string;
  progress?: number;
  students?: number;
  startDate?: string;
  schedule?: string;
  pais?: string;
  region?: string;
  ciudad?: string;
  concesionario?: string;
  empresa?: string;
  tipo?: string;
  status?: string;
}

interface CourseGridProps {
  courses: Course[];
  role: "estudiante" | "profesor" | "admin";
}

const CourseGrid = ({ courses, role }: CourseGridProps) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {role === "estudiante" 
            ? "No estás inscrito en ningún curso todavía." 
            : "No tienes cursos creados todavía."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} role={role} />
      ))}
    </div>
  );
};

export default CourseGrid;
