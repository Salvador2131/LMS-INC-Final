
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, FileTextIcon, GraduationCapIcon } from "lucide-react";
import CourseGrid from "../courses/CourseGrid";

const StudentDashboard = () => {
  // Mock data - would come from API in a real app
  const courses = [
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
    }
  ];
  
  // Mock upcoming assignments
  const assignments = [
    { id: "1", title: "Ecuaciones Diferenciales", course: "Matemáticas Avanzadas", dueDate: "20/05/2025" },
    { id: "2", title: "Ensayo: Segunda Guerra Mundial", course: "Historia Universal", dueDate: "22/05/2025" },
    { id: "3", title: "Proyecto Final", course: "Programación en Python", dueDate: "28/05/2025" }
  ];
  
  // Mock recent grades
  const grades = [
    { id: "1", title: "Parcial 1", course: "Matemáticas Avanzadas", grade: "90/100", date: "05/05/2025" },
    { id: "2", title: "Exposición", course: "Historia Universal", grade: "85/100", date: "07/05/2025" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mi Dashboard</h1>
      
      {/* Welcome card */}
      <Card className="bg-gradient-to-r from-kampus-primary to-blue-600 text-white">
        <CardHeader>
          <CardTitle>¡Bienvenido de vuelta, Miguel!</CardTitle>
          <CardDescription className="text-blue-100">
            Tienes 3 tareas pendientes esta semana
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 md:gap-10">
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-100">Promedio General</p>
                <p className="font-medium text-lg">87/100</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FileTextIcon className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-100">Tareas Completadas</p>
                <p className="font-medium text-lg">15/20</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-6 w-6" />
              <div>
                <p className="text-sm text-blue-100">Asistencia</p>
                <p className="font-medium text-lg">95%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Courses section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mis Cursos</h2>
          <Button variant="outline">Ver Todos</Button>
        </div>
        <CourseGrid courses={courses} role="estudiante" />
      </div>
      
      {/* Two-column layout for assignments and grades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Upcoming assignments */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tareas Próximas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assignments.map(assignment => (
                <div 
                  key={assignment.id} 
                  className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{assignment.title}</p>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Entrega:</p>
                    <p className="text-sm text-muted-foreground">{assignment.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-kampus-primary">
              Ver Todas las Tareas
            </Button>
          </CardFooter>
        </Card>
        
        {/* Recent grades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Calificaciones Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {grades.map(grade => (
                <div 
                  key={grade.id} 
                  className="flex justify-between items-start border-b pb-3 last:border-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{grade.title}</p>
                    <p className="text-sm text-muted-foreground">{grade.course}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-kampus-primary">{grade.grade}</p>
                    <p className="text-sm text-muted-foreground">{grade.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-kampus-primary">
              Ver Todas las Calificaciones
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Overall progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Progreso del Semestre</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Matemáticas Avanzadas</span>
                <span className="font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Historia Universal</span>
                <span className="font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Programación en Python</span>
                <span className="font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
