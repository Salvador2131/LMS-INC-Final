
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeftIcon, GripVertical, PlusIcon, Trash2Icon, UsersIcon } from "lucide-react";

const ManageCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
              { id: "l1", title: "Límites y continuidad", type: "video" },
              { id: "l2", title: "Derivadas: concepto y cálculo", type: "document" },
              { id: "l3", title: "Aplicaciones de la derivada", type: "quiz" }
            ]
          },
          {
            id: "m2",
            title: "Cálculo Integral",
            lessons: [
              { id: "l4", title: "La integral definida", type: "video" },
              { id: "l5", title: "Teorema fundamental del cálculo", type: "video" },
              { id: "l6", title: "Técnicas de integración", type: "document" }
            ]
          },
          {
            id: "m3",
            title: "Ecuaciones Diferenciales",
            lessons: [
              { id: "l7", title: "Ecuaciones diferenciales de primer orden", type: "video" },
              { id: "l8", title: "Ecuaciones diferenciales de segundo orden", type: "document" },
              { id: "l9", title: "Aplicaciones en física e ingeniería", type: "quiz" }
            ]
          }
        ],
        assignments: [
          {
            id: "a1",
            title: "Tarea: Límites y derivadas",
            dueDate: "25/05/2025",
            maxGrade: 100
          },
          {
            id: "a2",
            title: "Ejercicios: Aplicaciones de derivadas",
            dueDate: "10/06/2025",
            maxGrade: 100
          },
          {
            id: "a3",
            title: "Proyecto: Modelado con ecuaciones diferenciales",
            dueDate: "30/06/2025",
            maxGrade: 100
          }
        ],
        students: [
          {
            id: 1,
            name: "Ana Martínez",
            email: "ana.martinez@example.com",
            progress: 80
          },
          {
            id: 2,
            name: "Carlos López",
            email: "carlos.lopez@example.com",
            progress: 65
          },
          {
            id: 3,
            name: "María Rodríguez",
            email: "maria.rodriguez@example.com",
            progress: 90
          },
          {
            id: 4,
            name: "Juan Pérez",
            email: "juan.perez@example.com",
            progress: 75
          }
        ]
      };
      
      setCourse(mockCourse);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleSave = () => {
    toast({
      title: "Curso actualizado",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  const handleAddModule = () => {
    setCourse({
      ...course,
      modules: [
        ...course.modules,
        {
          id: `m${course.modules.length + 1}`,
          title: "Nuevo módulo",
          lessons: []
        }
      ]
    });
  };

  const handleAddLesson = (moduleId: string) => {
    const updatedModules = course.modules.map((module: any) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: [
            ...module.lessons,
            {
              id: `l${Math.random().toString(36).substr(2, 9)}`,
              title: "Nueva lección",
              type: "document"
            }
          ]
        };
      }
      return module;
    });
    
    setCourse({
      ...course,
      modules: updatedModules
    });
  };

  const handleAddAssignment = () => {
    setCourse({
      ...course,
      assignments: [
        ...course.assignments,
        {
          id: `a${course.assignments.length + 1}`,
          title: "Nueva tarea",
          dueDate: "",
          maxGrade: 100
        }
      ]
    });
  };

  const handleDeleteModule = (moduleId: string) => {
    setCourse({
      ...course,
      modules: course.modules.filter((module: any) => module.id !== moduleId)
    });
  };

  const handleDeleteLesson = (moduleId: string, lessonId: string) => {
    const updatedModules = course.modules.map((module: any) => {
      if (module.id === moduleId) {
        return {
          ...module,
          lessons: module.lessons.filter((lesson: any) => lesson.id !== lessonId)
        };
      }
      return module;
    });
    
    setCourse({
      ...course,
      modules: updatedModules
    });
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    setCourse({
      ...course,
      assignments: course.assignments.filter((assignment: any) => assignment.id !== assignmentId)
    });
  };

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

  return (
    <MainLayout>
      <div className="mb-6">
        <Link to={`/course/${id}`}>
          <Button variant="ghost" size="sm" className="mb-2">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Volver al curso
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Administrar Curso</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate(`/course/${id}`)}>Cancelar</Button>
          <Button onClick={handleSave}>Guardar cambios</Button>
        </div>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="mb-6">
          <TabsTrigger value="basic">Información básica</TabsTrigger>
          <TabsTrigger value="content">Contenido</TabsTrigger>
          <TabsTrigger value="assignments">Tareas</TabsTrigger>
          <TabsTrigger value="students">Estudiantes</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Título del curso</Label>
                  <Input
                    id="title"
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={course.description}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={course.category}
                      onValueChange={(value) => setCourse({ ...course, category: value })}
                    >
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Matemáticas">Matemáticas</SelectItem>
                        <SelectItem value="Ciencias">Ciencias</SelectItem>
                        <SelectItem value="Historia">Historia</SelectItem>
                        <SelectItem value="Literatura">Literatura</SelectItem>
                        <SelectItem value="Tecnología">Tecnología</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructor">Instructor</Label>
                    <Input
                      id="instructor"
                      value={course.instructor}
                      onChange={(e) => setCourse({ ...course, instructor: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="startDate">Fecha de inicio</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={course.startDate}
                      onChange={(e) => setCourse({ ...course, startDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">Fecha de fin</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={course.endDate}
                      onChange={(e) => setCourse({ ...course, endDate: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="schedule">Horario</Label>
                    <Input
                      id="schedule"
                      value={course.schedule}
                      onChange={(e) => setCourse({ ...course, schedule: e.target.value })}
                      placeholder="Ej: Lun, Mié 15:00-17:00"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="coverImage">Imagen de portada</Label>
                  <div className="mt-2 flex flex-col gap-4">
                    <img
                      src={course.coverImage}
                      alt={course.title}
                      className="h-40 w-full object-cover rounded-md"
                    />
                    <Input
                      id="coverImage"
                      type="file"
                      accept="image/*"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Objetivos del curso</Label>
                  <div className="space-y-2">
                    {course.objectives.map((objective: string, index: number) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={objective}
                          onChange={(e) => {
                            const newObjectives = [...course.objectives];
                            newObjectives[index] = e.target.value;
                            setCourse({ ...course, objectives: newObjectives });
                          }}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newObjectives = course.objectives.filter((_: string, i: number) => i !== index);
                            setCourse({ ...course, objectives: newObjectives });
                          }}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setCourse({
                          ...course,
                          objectives: [...course.objectives, "Nuevo objetivo"]
                        });
                      }}
                    >
                      <PlusIcon className="h-4 w-4 mr-2" />
                      Añadir objetivo
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Módulos y lecciones</h2>
                <Button onClick={handleAddModule}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Añadir módulo
                </Button>
              </div>

              <div className="space-y-6">
                {course.modules.map((module: any) => (
                  <div key={module.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-5 w-5 text-gray-400" />
                        <Input
                          value={module.title}
                          onChange={(e) => {
                            const updatedModules = course.modules.map((m: any) => {
                              if (m.id === module.id) {
                                return { ...m, title: e.target.value };
                              }
                              return m;
                            });
                            setCourse({ ...course, modules: updatedModules });
                          }}
                          className="max-w-md"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAddLesson(module.id)}
                        >
                          <PlusIcon className="h-4 w-4 mr-2" />
                          Añadir lección
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteModule(module.id)}
                        >
                          <Trash2Icon className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2 pl-7">
                      {module.lessons.map((lesson: any) => (
                        <div key={lesson.id} className="flex items-center gap-2 border-b pb-2">
                          <GripVertical className="h-4 w-4 text-gray-400" />
                          <Input
                            value={lesson.title}
                            onChange={(e) => {
                              const updatedModules = course.modules.map((m: any) => {
                                if (m.id === module.id) {
                                  const updatedLessons = m.lessons.map((l: any) => {
                                    if (l.id === lesson.id) {
                                      return { ...l, title: e.target.value };
                                    }
                                    return l;
                                  });
                                  return { ...m, lessons: updatedLessons };
                                }
                                return m;
                              });
                              setCourse({ ...course, modules: updatedModules });
                            }}
                            className="flex-1"
                          />
                          <Select
                            value={lesson.type}
                            onValueChange={(value) => {
                              const updatedModules = course.modules.map((m: any) => {
                                if (m.id === module.id) {
                                  const updatedLessons = m.lessons.map((l: any) => {
                                    if (l.id === lesson.id) {
                                      return { ...l, type: value };
                                    }
                                    return l;
                                  });
                                  return { ...m, lessons: updatedLessons };
                                }
                                return m;
                              });
                              setCourse({ ...course, modules: updatedModules });
                            }}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="document">Documento</SelectItem>
                              <SelectItem value="quiz">Cuestionario</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteLesson(module.id, lesson.id)}
                          >
                            <Trash2Icon className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assignments">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Tareas y evaluaciones</h2>
                <Button onClick={handleAddAssignment}>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Añadir tarea
                </Button>
              </div>

              <div className="space-y-4">
                {course.assignments.map((assignment: any) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
                      <div className="flex-1">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor={`title-${assignment.id}`}>Título</Label>
                            <Input
                              id={`title-${assignment.id}`}
                              value={assignment.title}
                              onChange={(e) => {
                                const updatedAssignments = course.assignments.map((a: any) => {
                                  if (a.id === assignment.id) {
                                    return { ...a, title: e.target.value };
                                  }
                                  return a;
                                });
                                setCourse({ ...course, assignments: updatedAssignments });
                              }}
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`dueDate-${assignment.id}`}>Fecha de entrega</Label>
                              <Input
                                id={`dueDate-${assignment.id}`}
                                type="date"
                                value={assignment.dueDate}
                                onChange={(e) => {
                                  const updatedAssignments = course.assignments.map((a: any) => {
                                    if (a.id === assignment.id) {
                                      return { ...a, dueDate: e.target.value };
                                    }
                                    return a;
                                  });
                                  setCourse({ ...course, assignments: updatedAssignments });
                                }}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`maxGrade-${assignment.id}`}>Calificación máxima</Label>
                              <Input
                                id={`maxGrade-${assignment.id}`}
                                type="number"
                                value={assignment.maxGrade}
                                onChange={(e) => {
                                  const updatedAssignments = course.assignments.map((a: any) => {
                                    if (a.id === assignment.id) {
                                      return { ...a, maxGrade: parseInt(e.target.value) };
                                    }
                                    return a;
                                  });
                                  setCourse({ ...course, assignments: updatedAssignments });
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost"
                        size="icon"
                        className="self-start"
                        onClick={() => handleDeleteAssignment(assignment.id)}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Estudiantes inscritos</h2>
                <Button>
                  <UsersIcon className="h-4 w-4 mr-2" />
                  Inscribir estudiantes
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-2 px-4 text-left font-medium">Nombre</th>
                      <th className="py-2 px-4 text-left font-medium">Email</th>
                      <th className="py-2 px-4 text-left font-medium">Progreso</th>
                      <th className="py-2 px-4 text-left font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.students.map((student: any) => (
                      <tr key={student.id} className="border-b last:border-0">
                        <td className="py-2 px-4">{student.name}</td>
                        <td className="py-2 px-4">{student.email}</td>
                        <td className="py-2 px-4">{student.progress}%</td>
                        <td className="py-2 px-4">
                          <Button variant="ghost" size="sm">
                            Ver detalles
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ManageCourse;
