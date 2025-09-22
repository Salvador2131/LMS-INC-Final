
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { PlusIcon, SearchIcon } from "lucide-react";
import CourseGrid from "@/components/courses/CourseGrid";
import { useState } from "react";

const Courses = () => {
  // For demonstration purposes, we'll use state to toggle between roles
  const [userRole, setUserRole] = useState<"estudiante" | "profesor" | "admin">("estudiante");
  
  // Mock data for courses
  const studentCourses = [
    {
      id: "1",
      title: "Matemáticas Avanzadas",
      instructor: "Carlos Mendoza",
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Matemáticas",
      progress: 75,
      startDate: "10/05/2025",
      schedule: "Lun, Mié 15:00-17:00"
    },
    {
      id: "2",
      title: "Historia Universal",
      instructor: "Ana García",
      coverImage: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "Historia",
      progress: 40,
      startDate: "05/05/2025",
      schedule: "Mar, Jue 10:00-12:00"
    },
    {
      id: "3",
      title: "Programación en Python",
      instructor: "Ricardo Torres",
      coverImage: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      category: "Tecnología",
      progress: 60,
      startDate: "15/05/2025",
      schedule: "Vie 14:00-18:00"
    },
    {
      id: "4",
      title: "Literatura Hispanoamericana",
      instructor: "Elena Martínez",
      coverImage: "https://images.unsplash.com/photo-1456513080867-f24f12e94d55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      category: "Literatura",
      progress: 25,
      startDate: "20/05/2025",
      schedule: "Jue 15:00-18:00"
    }
  ];
  
  const teacherCourses = [
    {
      id: "1",
      title: "Matemáticas Avanzadas",
      instructor: "Prof. Juan Pérez",
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Matemáticas",
      students: 28,
      startDate: "10/05/2025",
      schedule: "Lun, Mié 15:00-17:00"
    },
    {
      id: "2",
      title: "Álgebra Lineal",
      instructor: "Prof. Juan Pérez",
      coverImage: "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Matemáticas",
      students: 36,
      startDate: "05/05/2025",
      schedule: "Mar, Jue 10:00-12:00"
    },
    {
      id: "3",
      title: "Geometría Analítica",
      instructor: "Prof. Juan Pérez",
      coverImage: "https://images.unsplash.com/photo-1636466497217-26a5865ebd3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Matemáticas",
      students: 22,
      startDate: "15/05/2025",
      schedule: "Vie 14:00-18:00"
    }
  ];
  
  const availableCourses = [
    {
      id: "5",
      title: "Física I: Mecánica",
      instructor: "Luis Ramírez",
      coverImage: "https://images.unsplash.com/photo-1636466514704-5b34ee678227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Ciencias",
      startDate: "25/05/2025",
      schedule: "Mar, Jue 13:00-15:00"
    },
    {
      id: "6",
      title: "Introducción a la Psicología",
      instructor: "Marta González",
      coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Psicología",
      startDate: "01/06/2025",
      schedule: "Lun, Mié 10:00-12:00"
    },
    {
      id: "7",
      title: "Inglés Avanzado",
      instructor: "Daniel White",
      coverImage: "https://images.unsplash.com/photo-1494809610410-160faaed4de0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "Idiomas",
      startDate: "05/06/2025",
      schedule: "Lun, Mié, Vie, 17:00-18:30"
    },
    {
      id: "8",
      title: "Economía para Principiantes",
      instructor: "Sofía Herrera",
      coverImage: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Economía",
      startDate: "10/06/2025",
      schedule: "Mar, Jue 09:00-11:00"
    }
  ];

  // For demonstration purposes, add buttons to switch between roles
  const handleRoleChange = (role: "estudiante" | "profesor" | "admin") => {
    setUserRole(role);
  };

  return (
    <MainLayout>
      {/* Role switcher for demo purposes */}
      <div className="mb-6 p-3 bg-gray-100 rounded-md">
        <p className="text-xs text-muted-foreground mb-2">
          Demo: Cambiar de rol para ver diferentes vistas
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleRoleChange("estudiante")}
            className={`px-3 py-1 rounded text-sm ${
              userRole === "estudiante"
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Estudiante
          </button>
          <button
            onClick={() => handleRoleChange("profesor")}
            className={`px-3 py-1 rounded text-sm ${
              userRole === "profesor"
                ? "bg-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Profesor
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Cursos</h1>
        
        {userRole === "profesor" && (
          <Link to="/courses/create">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusIcon className="h-4 w-4 mr-2" />
              Crear Nuevo Curso
            </Button>
          </Link>
        )}
      </div>
      
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar cursos..." 
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="matematicas">Matemáticas</SelectItem>
              <SelectItem value="ciencias">Ciencias</SelectItem>
              <SelectItem value="historia">Historia</SelectItem>
              <SelectItem value="literatura">Literatura</SelectItem>
              <SelectItem value="idiomas">Idiomas</SelectItem>
              <SelectItem value="tecnologia">Tecnología</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="az">A-Z</SelectItem>
              <SelectItem value="za">Z-A</SelectItem>
              {userRole === "estudiante" && (
                <SelectItem value="progress">Progreso</SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {userRole === "estudiante" ? (
        <Tabs defaultValue="enrolled">
          <TabsList className="mb-6">
            <TabsTrigger value="enrolled">Mis Cursos</TabsTrigger>
            <TabsTrigger value="available">Disponibles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrolled">
            <CourseGrid courses={studentCourses} role="estudiante" />
          </TabsContent>
          
          <TabsContent value="available">
            <CourseGrid courses={availableCourses} role="estudiante" />
          </TabsContent>
        </Tabs>
      ) : (
        <CourseGrid courses={teacherCourses} role="profesor" />
      )}
    </MainLayout>
  );
};

export default Courses;
