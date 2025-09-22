
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/lib/auth";
import { ArrowLeftIcon, BookIcon, FileTextIcon, MessageSquareIcon, PenIcon, PlayIcon, UsersIcon } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const user = getCurrentUser();
  const userRole = user?.role || "estudiante";
  
  // Mock course data
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call to fetch course details
    setTimeout(() => {
      const mockCourse = {
        id,
        title: "Matemáticas Avanzadas",
        instructor: "Carlos Mendoza",
        coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        category: "Matemáticas",
        progress: 75,
        startDate: "10/05/2025",
        endDate: "30/07/2025",
        schedule: "Lun, Mié 15:00-17:00",
        description: "Este curso cubre temas avanzados de matemáticas incluyendo cálculo diferencial e integral, ecuaciones diferenciales y análisis numérico. Está diseñado para estudiantes con conocimientos previos de álgebra y trigonometría.",
        objectives: [
          "Dominar los conceptos fundamentales del cálculo diferencial e integral",
          "Resolver ecuaciones diferenciales aplicadas a problemas reales",
          "Implementar métodos numéricos para la solución aproximada de problemas matemáticos complejos",
          "Aplicar técnicas de optimización matemática en contextos prácticos"
        ],
        modules: [
          {
            id: "m1",
            title: "Introducción al Cálculo Diferencial",
            lessons: [
              { id: "l1", title: "Límites y continuidad", completed: true },
              { id: "l2", title: "Derivadas: concepto y cálculo", completed: true },
              { id: "l3", title: "Aplicaciones de la derivada", completed: false }
            ]
          },
          {
            id: "m2",
            title: "Cálculo Integral",
            lessons: [
              { id: "l4", title: "La integral definida", completed: false },
              { id: "l5", title: "Teorema fundamental del cálculo", completed: false },
              { id: "l6", title: "Técnicas de integración", completed: false }
            ]
          },
          {
            id: "m3",
            title: "Ecuaciones Diferenciales",
            lessons: [
              { id: "l7", title: "Ecuaciones diferenciales de primer orden", completed: false },
              { id: "l8", title: "Ecuaciones diferenciales de segundo orden", completed: false },
              { id: "l9", title: "Aplicaciones en física e ingeniería", completed: false }
            ]
          }
        ],
        assignments: [
          {
            id: "a1",
            title: "Tarea: Límites y derivadas",
            dueDate: "25/05/2025",
            status: "completed",
            grade: 90,
            maxGrade: 100
          },
          {
            id: "a2",
            title: "Ejercicios: Aplicaciones de derivadas",
            dueDate: "10/06/2025",
            status: "in-progress",
            grade: null,
            maxGrade: 100
          },
          {
            id: "a3",
            title: "Proyecto: Modelado con ecuaciones diferenciales",
            dueDate: "30/06/2025",
            status: "pending",
            grade: null,
            maxGrade: 100
          }
        ],
        students: [
          {
            id: 1,
            name: "Ana Martínez",
            avatar: "",
            progress: 80
          },
          {
            id: 2,
            name: "Carlos López",
            avatar: "",
            progress: 65
          },
          {
            id: 3,
            name: "María Rodríguez",
            avatar: "",
            progress: 90
          },
          {
            id: 4,
            name: "Juan Pérez",
            avatar: "",
            progress: 75
          }
        ],
        discussions: [
          {
            id: "d1",
            title: "Duda sobre límites laterales",
            author: "Ana Martínez",
            date: "15/05/2025",
            replies: 3
          },
          {
            id: "d2",
            title: "Consulta sobre regla de la cadena",
            author: "Juan Pérez",
            date: "17/05/2025",
            replies: 2
          },
          {
            id: "d3",
            title: "Problema con ejercicio 2.4",
            author: "María Rodríguez",
            date: "20/05/2025",
            replies: 5
          }
        ]
      };
      
      setCourse(mockCourse);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Cargando curso...</p>
        </div>
      </MainLayout>
    );
  }

  if (!course) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Curso no encontrado.</p>
        </div>
      </MainLayout>
    );
  }

  // Calculate course completion
  const totalLessons = course.modules.reduce(
    (count: number, module: any) => count + module.lessons.length, 
    0
  );
  const completedLessons = course.modules.reduce(
    (count: number, module: any) => count + module.lessons.filter((l: any) => l.completed).length,
    0
  );
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <Link to="/courses">
          <Button variant="ghost" size="sm" className="mb-2">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Volver a Cursos
          </Button>
        </Link>
      </div>

      {/* Course header */}
      <div className="relative rounded-lg overflow-hidden mb-8">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img
          src={course.coverImage}
          alt={course.title}
          className="w-full h-48 md:h-64 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{course.title}</h1>
              <p className="text-gray-200 mt-1">Instructor: {course.instructor}</p>
            </div>
            {userRole === "profesor" || userRole === "admin" ? (
              <Button className="mt-4 md:mt-0" asChild>
                <Link to={`/course/${id}/manage`}>
                  <PenIcon className="h-4 w-4 mr-2" />
                  Editar curso
                </Link>
              </Button>
            ) : (
              <div className="mt-4 md:mt-0 bg-white/10 px-4 py-2 rounded-lg">
                <span className="text-sm">Progreso: {completionPercentage}%</span>
                <Progress value={completionPercentage} className="h-2 mt-1" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course content */}
      <Tabs defaultValue="content">
        <TabsList className="mb-6">
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="assignments">Tareas</TabsTrigger>
          <TabsTrigger value="forum">Foro</TabsTrigger>
          {(userRole === "profesor" || userRole === "admin") && (
            <TabsTrigger value="students">Estudiantes</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Descripción del curso</h2>
                <p className="text-gray-700">{course.description}</p>
                
                <h3 className="text-lg font-medium mt-6 mb-3">Objetivos</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {course.objectives.map((objective: string, index: number) => (
                    <li key={index}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Módulos</h2>
                <div className="space-y-6">
                  {course.modules.map((module: any) => (
                    <div key={module.id} className="border rounded-md p-4">
                      <h3 className="text-lg font-medium mb-3">{module.title}</h3>
                      <div className="space-y-2">
                        {module.lessons.map((lesson: any) => (
                          <div key={lesson.id} className="flex items-center justify-between py-2 border-b last:border-0">
                            <div className="flex items-center">
                              <div className={`h-4 w-4 rounded-full mr-3 ${lesson.completed ? "bg-green-500" : "bg-gray-200"}`}></div>
                              <span>{lesson.title}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              <PlayIcon className="h-4 w-4 mr-2" />
                              Ver
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4">Información del curso</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Categoría:</span>
                    <span className="font-medium">{course.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fecha de inicio:</span>
                    <span className="font-medium">{course.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fecha de fin:</span>
                    <span className="font-medium">{course.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Horario:</span>
                    <span className="font-medium">{course.schedule}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total de módulos:</span>
                    <span className="font-medium">{course.modules.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total de lecciones:</span>
                    <span className="font-medium">{totalLessons}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Instructor</h2>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-white">CM</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <h4 className="font-medium">{course.instructor}</h4>
                    <p className="text-sm text-muted-foreground">Profesor de Matemáticas</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <MessageSquareIcon className="h-4 w-4 mr-2" />
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assignments">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Tareas y evaluaciones</h2>
            <div className="space-y-6">
              {course.assignments.map((assignment: any) => (
                <Card key={assignment.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <h3 className="font-medium text-lg">{assignment.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Fecha de entrega: {assignment.dueDate}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        {assignment.status === "completed" ? (
                          <div className="flex flex-col items-end">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Completado
                            </span>
                            <span className="mt-1 font-medium">
                              {assignment.grade}/{assignment.maxGrade}
                            </span>
                          </div>
                        ) : assignment.status === "in-progress" ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            En progreso
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Pendiente
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex">
                      <Button variant="outline" className="mr-2">
                        <FileTextIcon className="h-4 w-4 mr-2" />
                        {assignment.status === "completed" ? "Ver entrega" : "Ver detalles"}
                      </Button>
                      {assignment.status !== "completed" && (
                        <Button>
                          {assignment.status === "in-progress" ? "Continuar" : "Comenzar"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="forum">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Foro del curso</h2>
              <Button>
                <MessageSquareIcon className="h-4 w-4 mr-2" />
                Nueva discusión
              </Button>
            </div>
            <div className="space-y-4">
              {course.discussions.map((discussion: any) => (
                <Card key={discussion.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{discussion.title}</h3>
                      <span className="text-sm text-muted-foreground">{discussion.date}</span>
                    </div>
                    <p className="text-sm mt-1">Por: {discussion.author}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {discussion.replies} respuestas
                      </span>
                      <Button variant="ghost" size="sm">
                        Ver discusión
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {(userRole === "profesor" || userRole === "admin") && (
          <TabsContent value="students">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Estudiantes inscritos</h2>
                <Button variant="outline">
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Administrar estudiantes
                </Button>
              </div>
              <div className="space-y-4">
                {course.students.map((student: any) => (
                  <Card key={student.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={student.avatar} alt={student.name} />
                            <AvatarFallback className="bg-primary text-white">
                              {getInitials(student.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <h3 className="font-medium">{student.name}</h3>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4">
                            <p className="text-sm text-muted-foreground">Progreso:</p>
                            <p className="font-medium">{student.progress}%</p>
                          </div>
                          <Button variant="ghost" size="sm">
                            Ver detalles
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </MainLayout>
  );
};

export default CourseDetail;
