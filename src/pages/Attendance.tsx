import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UsersIcon,
  CalendarIcon,
  PlusIcon,
  EyeIcon,
  BarChart3Icon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

const Attendance = () => {
  const { user, isAuthenticated, role } = useAuth();
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [attendanceStatus, setAttendanceStatus] = useState<
    Record<string, "present" | "absent" | "late" | null>
  >({});

  // Si no está autenticado, redirigir
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">
            Debes iniciar sesión para acceder a la asistencia
          </p>
          <a
            href="/login"
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            Ir al Login
          </a>
        </div>
      </div>
    );
  }

  // Datos simulados de clases y estudiantes
  const classes = [
    {
      id: "1",
      name: "Matemáticas Avanzadas",
      instructor: "Carlos Mendoza",
      schedule: "Lun, Mié 15:00-17:00",
      students: 28,
      nextClass: "2025-01-27T15:00:00",
    },
    {
      id: "2",
      name: "Historia Universal",
      instructor: "Ana García",
      schedule: "Mar, Jue 10:00-12:00",
      students: 19,
      nextClass: "2025-01-28T10:00:00",
    },
    {
      id: "3",
      name: "Programación en Python",
      instructor: "Ricardo Torres",
      schedule: "Vie 14:00-18:00",
      students: 35,
      nextClass: "2025-01-31T14:00:00",
    },
  ];

  const students = [
    {
      id: "1",
      name: "María González",
      email: "maria@estudiante.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: "2",
      name: "Juan Pérez",
      email: "juan@estudiante.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: "3",
      name: "Ana López",
      email: "ana@estudiante.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: "4",
      name: "Carlos Ruiz",
      email: "carlos@estudiante.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    {
      id: "5",
      name: "Laura Martínez",
      email: "laura@estudiante.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
    },
  ];

  // Datos simulados de asistencia histórica
  const attendanceHistory = [
    {
      id: "1",
      classId: "1",
      className: "Matemáticas Avanzadas",
      date: "2025-01-20",
      time: "15:00",
      totalStudents: 28,
      present: 25,
      absent: 3,
      late: 2,
    },
    {
      id: "2",
      classId: "2",
      className: "Historia Universal",
      date: "2025-01-21",
      time: "10:00",
      totalStudents: 19,
      present: 18,
      absent: 1,
      late: 0,
    },
    {
      id: "3",
      classId: "3",
      className: "Programación en Python",
      date: "2025-01-24",
      time: "14:00",
      totalStudents: 35,
      present: 32,
      absent: 2,
      late: 1,
    },
  ];

  const handleMarkAttendance = (
    studentId: string,
    status: "present" | "absent" | "late"
  ) => {
    setAttendanceStatus((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSaveAttendance = () => {
    const presentCount = Object.values(attendanceStatus).filter(
      (status) => status === "present"
    ).length;
    const absentCount = Object.values(attendanceStatus).filter(
      (status) => status === "absent"
    ).length;
    const lateCount = Object.values(attendanceStatus).filter(
      (status) => status === "late"
    ).length;

    toast({
      title: "Asistencia guardada",
      description: `Presentes: ${presentCount}, Ausentes: ${absentCount}, Tardanzas: ${lateCount}`,
    });

    // Reset form
    setAttendanceStatus({});
    setSelectedClass("");
  };

  const getAttendancePercentage = (present: number, total: number) => {
    return total > 0 ? Math.round((present / total) * 100) : 0;
  };

  const getStatusIcon = (status: "present" | "absent" | "late" | null) => {
    switch (status) {
      case "present":
        return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case "absent":
        return <XCircleIcon className="h-4 w-4 text-red-500" />;
      case "late":
        return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return (
          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
        );
    }
  };

  const getStatusColor = (status: "present" | "absent" | "late" | null) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Control de Asistencia</h1>
            <p className="text-muted-foreground">
              {role === "profesor" && "Marca la asistencia de tus clases"}
              {role === "estudiante" && "Consulta tu historial de asistencia"}
              {role === "admin" &&
                "Supervisa la asistencia de todos los cursos"}
            </p>
          </div>
          {(role === "profesor" || role === "admin") && (
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Nueva Clase
            </Button>
          )}
        </div>

        <Tabs
          defaultValue={
            role === "profesor"
              ? "mark"
              : role === "estudiante"
              ? "history"
              : "mark"
          }
        >
          <TabsList className="grid w-full grid-cols-3">
            {role === "profesor" && (
              <>
                <TabsTrigger value="mark">Marcar Asistencia</TabsTrigger>
                <TabsTrigger value="history">Historial</TabsTrigger>
                <TabsTrigger value="stats">Estadísticas</TabsTrigger>
              </>
            )}
            {role === "estudiante" && (
              <>
                <TabsTrigger value="history">Mi Asistencia</TabsTrigger>
                <TabsTrigger value="stats">Estadísticas</TabsTrigger>
                <TabsTrigger value="calendar">Calendario</TabsTrigger>
              </>
            )}
            {role === "admin" && (
              <>
                <TabsTrigger value="mark">Marcar Asistencia</TabsTrigger>
                <TabsTrigger value="overview">Resumen General</TabsTrigger>
                <TabsTrigger value="classes">Por Clase</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Vista para PROFESORES Y ADMINISTRADORES - Marcar Asistencia */}
          {(role === "profesor" || role === "admin") && (
            <TabsContent value="mark" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Seleccionar Clase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {classes.map((classItem) => (
                      <Card
                        key={classItem.id}
                        className={`cursor-pointer transition-colors ${
                          selectedClass === classItem.id
                            ? "ring-2 ring-primary bg-primary/5"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedClass(classItem.id)}
                      >
                        <CardContent className="p-4">
                          <h3 className="font-semibold">{classItem.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {classItem.schedule}
                          </p>
                          <div className="flex items-center mt-2">
                            <UsersIcon className="h-4 w-4 mr-1" />
                            <span className="text-sm">
                              {classItem.students} estudiantes
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {selectedClass && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Marcar Asistencia -{" "}
                      {classes.find((c) => c.id === selectedClass)?.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {new Date().toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {students.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={student.avatar}
                              alt={student.name}
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {student.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant={
                                attendanceStatus[student.id] === "present"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleMarkAttendance(student.id, "present")
                              }
                            >
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Presente
                            </Button>
                            <Button
                              variant={
                                attendanceStatus[student.id] === "late"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleMarkAttendance(student.id, "late")
                              }
                            >
                              <ClockIcon className="h-4 w-4 mr-1" />
                              Tarde
                            </Button>
                            <Button
                              variant={
                                attendanceStatus[student.id] === "absent"
                                  ? "default"
                                  : "outline"
                              }
                              size="sm"
                              onClick={() =>
                                handleMarkAttendance(student.id, "absent")
                              }
                            >
                              <XCircleIcon className="h-4 w-4 mr-1" />
                              Ausente
                            </Button>
                          </div>
                        </div>
                      ))}

                      <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedClass("")}
                        >
                          Cancelar
                        </Button>
                        <Button onClick={handleSaveAttendance}>
                          Guardar Asistencia
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          )}

          {/* Vista para ESTUDIANTES - Mi Asistencia */}
          {role === "estudiante" && (
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mi Historial de Asistencia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceHistory.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{record.className}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString("es-ES")}{" "}
                            a las {record.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-100 text-green-800">
                            Presente
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">
                            Asistencia:{" "}
                            {getAttendancePercentage(
                              record.present,
                              record.totalStudents
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Vista para ADMINISTRADORES - Resumen General */}
          {role === "admin" && (
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <CheckCircleIcon className="h-8 w-8 text-green-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Promedio General
                        </p>
                        <p className="text-2xl font-bold">87%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <UsersIcon className="h-8 w-8 text-blue-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Total Estudiantes
                        </p>
                        <p className="text-2xl font-bold">82</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <CalendarIcon className="h-8 w-8 text-purple-500" />
                      <div className="ml-4">
                        <p className="text-sm font-medium text-muted-foreground">
                          Clases Esta Semana
                        </p>
                        <p className="text-2xl font-bold">12</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Resumen por Clase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {attendanceHistory.map((record) => (
                      <div
                        key={record.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h3 className="font-semibold">{record.className}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(record.date).toLocaleDateString("es-ES")}{" "}
                            a las {record.time}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex space-x-4 text-sm">
                            <span className="text-green-600">
                              Presentes: {record.present}
                            </span>
                            <span className="text-red-600">
                              Ausentes: {record.absent}
                            </span>
                            <span className="text-yellow-600">
                              Tardanzas: {record.late}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Asistencia:{" "}
                            {getAttendancePercentage(
                              record.present,
                              record.totalStudents
                            )}
                            %
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Estadísticas para todos los roles */}
          <TabsContent value="stats" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas de Asistencia</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart3Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    {role === "profesor" &&
                      "Estadísticas detalladas de tus clases"}
                    {role === "estudiante" && "Tu rendimiento de asistencia"}
                    {role === "admin" && "Análisis completo del sistema"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Attendance;
