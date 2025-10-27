import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3Icon,
  DownloadIcon,
  UsersIcon,
  BookIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  CalendarIcon,
  FileTextIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const Reports = () => {
  const { user, isAuthenticated, role } = useAuth();

  // Si no está autenticado o no es admin, redirigir
  if (!isAuthenticated || role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">
            Solo los administradores pueden acceder a los reportes
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

  // Datos simulados para reportes
  const attendanceStats = {
    totalStudents: 82,
    averageAttendance: 87,
    classesThisWeek: 12,
    totalClasses: 156,
    attendanceByClass: [
      { name: "Matemáticas Avanzadas", attendance: 89, students: 28 },
      { name: "Historia Universal", attendance: 85, students: 19 },
      { name: "Programación Python", attendance: 92, students: 35 },
    ],
  };

  const userStats = {
    totalUsers: 156,
    activeUsers: 142,
    newThisMonth: 23,
    usersByRole: [
      { role: "Estudiantes", count: 120, percentage: 77 },
      { role: "Profesores", count: 28, percentage: 18 },
      { role: "Administradores", count: 8, percentage: 5 },
    ],
  };

  const courseStats = {
    totalCourses: 42,
    activeCourses: 38,
    completedCourses: 156,
    coursesByCategory: [
      { category: "Matemáticas", count: 12, students: 340 },
      { category: "Ciencias", count: 8, students: 180 },
      { category: "Tecnología", count: 15, students: 420 },
      { category: "Humanidades", count: 7, students: 95 },
    ],
  };

  const handleExportReport = (reportType: string) => {
    // Simular exportación
    console.log(`Exportando reporte: ${reportType}`);
    // Aquí implementarías la lógica real de exportación
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reportes del Sistema</h1>
            <p className="text-muted-foreground">
              Genera y descarga reportes detallados del sistema
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Exportar Todo
            </Button>
            <Button>
              <FileTextIcon className="h-4 w-4 mr-2" />
              Generar Reporte
            </Button>
          </div>
        </div>

        <Tabs defaultValue="attendance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance">Asistencia</TabsTrigger>
            <TabsTrigger value="users">Usuarios</TabsTrigger>
            <TabsTrigger value="courses">Cursos</TabsTrigger>
            <TabsTrigger value="academic">Académico</TabsTrigger>
          </TabsList>

          {/* Reportes de Asistencia */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Promedio General
                      </p>
                      <p className="text-2xl font-bold">
                        {attendanceStats.averageAttendance}%
                      </p>
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
                      <p className="text-2xl font-bold">
                        {attendanceStats.totalStudents}
                      </p>
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
                      <p className="text-2xl font-bold">
                        {attendanceStats.classesThisWeek}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUpIcon className="h-8 w-8 text-orange-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Clases
                      </p>
                      <p className="text-2xl font-bold">
                        {attendanceStats.totalClasses}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Asistencia por Clase</CardTitle>
                <CardDescription>
                  Estadísticas detalladas de asistencia por curso
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {attendanceStats.attendanceByClass.map((classData, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{classData.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {classData.students} estudiantes
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">
                            {classData.attendance}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Asistencia
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleExportReport(`asistencia-${classData.name}`)
                          }
                        >
                          <DownloadIcon className="h-4 w-4 mr-1" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Reportes de Asistencia</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Asistencia Diaria</p>
                      <p className="text-sm text-muted-foreground">
                        Reporte detallado por día y clase
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-1" />
                      Excel
                    </Button>
                  </div>

                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <p className="font-medium">Asistencia por Estudiante</p>
                      <p className="text-sm text-muted-foreground">
                        Historial individual de cada estudiante
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-1" />
                      Excel
                    </Button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Tendencias de Asistencia</p>
                      <p className="text-sm text-muted-foreground">
                        Análisis de tendencias y patrones
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-1" />
                      PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas Rápidas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Mejor asistencia:
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        Programación Python (92%)
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Clase más numerosa:
                      </span>
                      <Badge className="bg-blue-100 text-blue-800">
                        Programación Python (35)
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Tendencia:
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        ↗ +3% esta semana
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reportes de Usuarios */}
          <TabsContent value="users" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <UsersIcon className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Usuarios
                      </p>
                      <p className="text-2xl font-bold">
                        {userStats.totalUsers}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Activos
                      </p>
                      <p className="text-2xl font-bold">
                        {userStats.activeUsers}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUpIcon className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Nuevos Este Mes
                      </p>
                      <p className="text-2xl font-bold">
                        {userStats.newThisMonth}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BarChart3Icon className="h-8 w-8 text-orange-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Tasa de Actividad
                      </p>
                      <p className="text-2xl font-bold">91%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Distribución por Roles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userStats.usersByRole.map((roleData, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{roleData.role}</h3>
                        <p className="text-sm text-muted-foreground">
                          {roleData.count} usuarios
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {roleData.percentage}%
                          </p>
                          <p className="text-sm text-muted-foreground">
                            del total
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleExportReport(
                              `usuarios-${roleData.role.toLowerCase()}`
                            )
                          }
                        >
                          <DownloadIcon className="h-4 w-4 mr-1" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reportes de Cursos */}
          <TabsContent value="courses" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <BookIcon className="h-8 w-8 text-blue-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Cursos
                      </p>
                      <p className="text-2xl font-bold">
                        {courseStats.totalCourses}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-8 w-8 text-green-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Activos
                      </p>
                      <p className="text-2xl font-bold">
                        {courseStats.activeCourses}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <TrendingUpIcon className="h-8 w-8 text-purple-500" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        Completados
                      </p>
                      <p className="text-2xl font-bold">
                        {courseStats.completedCourses}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Cursos por Categoría</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseStats.coursesByCategory.map((category, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h3 className="font-semibold">{category.category}</h3>
                        <p className="text-sm text-muted-foreground">
                          {category.count} cursos
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold">
                            {category.students}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            estudiantes
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleExportReport(
                              `cursos-${category.category.toLowerCase()}`
                            )
                          }
                        >
                          <DownloadIcon className="h-4 w-4 mr-1" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reportes Académicos */}
          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Rendimiento Académico</CardTitle>
                <CardDescription>
                  Análisis de calificaciones y progreso estudiantil
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">Calificaciones por Curso</p>
                    <p className="text-sm text-muted-foreground">
                      Promedios y distribución de notas
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    Exportar Excel
                  </Button>
                </div>

                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-medium">Progreso de Estudiantes</p>
                    <p className="text-sm text-muted-foreground">
                      Seguimiento individual del avance
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    Exportar Excel
                  </Button>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Tendencias de Aprobación</p>
                    <p className="text-sm text-muted-foreground">
                      Análisis de tasas de aprobación por período
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <DownloadIcon className="h-4 w-4 mr-1" />
                    Exportar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Reports;








