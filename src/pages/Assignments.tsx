
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import AssignmentCard from "@/components/assessment/AssignmentCard";

const Assignments = () => {
  // For demonstration purposes, we'll use state to toggle between roles
  const [userRole, setUserRole] = useState<"estudiante" | "profesor">("estudiante");

  // Mock data for assignments
  const pendingAssignments = [
    {
      id: "1",
      title: "Ecuaciones Diferenciales",
      course: "Matemáticas Avanzadas",
      dueDate: "20/05/2025",
      status: "pending",
      description: "Resolver los problemas de ecuaciones diferenciales del capítulo 5, ejercicios 1-15.",
      instructor: {
        name: "Carlos Mendoza",
      }
    },
    {
      id: "2",
      title: "Ensayo: Segunda Guerra Mundial",
      course: "Historia Universal",
      dueDate: "22/05/2025",
      status: "pending",
      description: "Escribir un ensayo de 1500 palabras sobre las causas y consecuencias de la Segunda Guerra Mundial.",
      instructor: {
        name: "Ana García",
      }
    },
    {
      id: "3",
      title: "Proyecto Final",
      course: "Programación en Python",
      dueDate: "28/05/2025",
      status: "pending",
      description: "Desarrollar una aplicación de gestión de tareas utilizando Python y una base de datos SQLite.",
      instructor: {
        name: "Ricardo Torres",
      }
    }
  ];
  
  const completedAssignments = [
    {
      id: "4",
      title: "Límites y Continuidad",
      course: "Matemáticas Avanzadas",
      dueDate: "10/05/2025",
      status: "completed",
      description: "Resolver los problemas de límites y continuidad del capítulo 3, ejercicios 1-20.",
      instructor: {
        name: "Carlos Mendoza",
      }
    },
    {
      id: "5",
      title: "Línea del Tiempo: Revolución Industrial",
      course: "Historia Universal",
      dueDate: "08/05/2025",
      status: "graded",
      description: "Crear una línea del tiempo detallada de los eventos más importantes de la Revolución Industrial.",
      instructor: {
        name: "Ana García",
      },
      grade: {
        score: "90/100",
        feedback: "Excelente trabajo cronológico. Se destacan los eventos principales y sus impactos."
      }
    }
  ];
  
  // Teacher view assignments
  const pendingToGradeAssignments = [
    {
      id: "1",
      title: "Límites y Continuidad",
      course: "Matemáticas Avanzadas",
      dueDate: "10/05/2025",
      status: "completed",
      description: "Resolver los problemas de límites y continuidad del capítulo 3, ejercicios 1-20."
    },
    {
      id: "2",
      title: "Sistemas de Ecuaciones",
      course: "Álgebra Lineal",
      dueDate: "12/05/2025",
      status: "completed",
      description: "Resolver los sistemas de ecuaciones lineales utilizando diferentes métodos."
    }
  ];
  
  const gradedAssignments = [
    {
      id: "3",
      title: "Derivadas",
      course: "Matemáticas Avanzadas",
      dueDate: "05/05/2025",
      status: "graded",
      description: "Resolver los ejercicios de derivadas del capítulo 4."
    }
  ];

  // For demonstration purposes, add buttons to switch between roles
  const handleRoleChange = (role: "estudiante" | "profesor") => {
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
                ? "bg-kampus-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Estudiante
          </button>
          <button
            onClick={() => handleRoleChange("profesor")}
            className={`px-3 py-1 rounded text-sm ${
              userRole === "profesor"
                ? "bg-kampus-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Profesor
          </button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">
          {userRole === "estudiante" ? "Mis Tareas" : "Tareas"}
        </h1>
        
        {userRole === "profesor" && (
          <Button className="bg-kampus-primary hover:bg-blue-600">
            <PlusIcon className="h-4 w-4 mr-2" />
            Crear Nueva Tarea
          </Button>
        )}
      </div>
      
      {/* Filter controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Curso" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los cursos</SelectItem>
            <SelectItem value="math">Matemáticas Avanzadas</SelectItem>
            <SelectItem value="history">Historia Universal</SelectItem>
            <SelectItem value="programming">Programación en Python</SelectItem>
          </SelectContent>
        </Select>
        
        <Select defaultValue="recent">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Más recientes</SelectItem>
            <SelectItem value="duedate">Fecha de entrega</SelectItem>
            {userRole === "estudiante" ? (
              <SelectItem value="status">Estado</SelectItem>
            ) : (
              <SelectItem value="submissions">Entregas</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
      
      {userRole === "estudiante" ? (
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="completed">Completadas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment as any} 
                  role="estudiante"
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment as any} 
                  role="estudiante"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        <Tabs defaultValue="to-grade">
          <TabsList className="mb-6">
            <TabsTrigger value="to-grade">Por Calificar</TabsTrigger>
            <TabsTrigger value="graded">Calificadas</TabsTrigger>
            <TabsTrigger value="all">Todas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="to-grade">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingToGradeAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment as any} 
                  role="profesor"
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="graded">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gradedAssignments.map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment as any} 
                  role="profesor"
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...pendingToGradeAssignments, ...gradedAssignments].map(assignment => (
                <AssignmentCard 
                  key={assignment.id} 
                  assignment={assignment as any} 
                  role="profesor"
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </MainLayout>
  );
};

export default Assignments;
