
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, FileTextIcon, GraduationCapIcon, PlusIcon, UsersIcon } from "lucide-react";
import CourseGrid from "../courses/CourseGrid";

const TeacherDashboard = () => {
  // Mock data - would come from API in a real app
  const courses = [
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
  
  // Mock pending assignments to grade
  const pendingGrades = [
    { id: "1", title: "Ecuaciones Diferenciales", course: "Matemáticas Avanzadas", submitted: 25, total: 28 },
    { id: "2", title: "Matrices y Determinantes", course: "Álgebra Lineal", submitted: 30, total: 36 },
    { id: "3", title: "Circunferencia", course: "Geometría Analítica", submitted: 18, total: 22 }
  ];
  
  // Mock upcoming classes
  const upcomingClasses = [
    { id: "1", course: "Matemáticas Avanzadas", date: "Lunes, 17 May", time: "15:00 - 17:00", room: "A-101" },
    { id: "2", course: "Álgebra Lineal", date: "Martes, 18 May", time: "10:00 - 12:00", room: "B-205" },
    { id: "3", course: "Geometría Analítica", date: "Viernes, 21 May", time: "14:00 - 18:00", room: "C-310" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Portal del Profesor</h1>
        <Button className="bg-kampus-primary hover:bg-blue-600">
          <PlusIcon className="h-4 w-4 mr-2" />
          Crear Nuevo Curso
        </Button>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Cursos Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookIcon className="h-6 w-6 text-kampus-primary mr-2" />
              <span className="text-2xl font-bold">3</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Estudiantes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UsersIcon className="h-6 w-6 text-kampus-secondary mr-2" />
              <span className="text-2xl font-bold">86</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tareas por Calificar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileTextIcon className="h-6 w-6 text-kampus-accent mr-2" />
              <span className="text-2xl font-bold">12</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Clases esta Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">8</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Courses section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Mis Cursos</h2>
          <Button variant="outline">Administrar Cursos</Button>
        </div>
        <CourseGrid courses={courses} role="profesor" />
      </div>
      
      {/* Tabs for different teacher functions */}
      <Tabs defaultValue="pending">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="pending">Por Calificar</TabsTrigger>
          <TabsTrigger value="schedule">Horario</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tareas Pendientes de Calificar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingGrades.map(assignment => (
                  <div 
                    key={assignment.id} 
                    className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{assignment.title}</p>
                      <p className="text-sm text-muted-foreground">{assignment.course}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">Entregadas:</p>
                        <p className="font-medium text-kampus-primary">
                          {assignment.submitted}/{assignment.total}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Calificar
                      </Button>
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
        </TabsContent>
        
        <TabsContent value="schedule" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Próximas Clases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingClasses.map(cls => (
                  <div 
                    key={cls.id} 
                    className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{cls.course}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.date} • {cls.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Aula:</p>
                      <p className="font-medium">{cls.room}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-kampus-primary">
                Ver Calendario Completo
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Estudiantes por Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map(course => (
                  <div 
                    key={course.id} 
                    className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="font-medium">{course.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {course.schedule}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        <UsersIcon className="h-4 w-4 mr-1" />
                        <span className="font-medium">{course.students}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Lista
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Missing Lucide icon
const BookIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
  </svg>
);

export default TeacherDashboard;
