
import MainLayout from "@/components/layout/MainLayout";
import CreateCourseForm from "@/components/courses/CreateCourseForm";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

const CreateCourse = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/courses">
          <Button variant="ghost" size="sm" className="mb-2">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Volver a Cursos
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Crear Nuevo Curso</h1>
      </div>
      
      <CreateCourseForm />
    </MainLayout>
  );
};

export default CreateCourse;
