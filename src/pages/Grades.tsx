
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Grades = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  
  // Mock data for courses and grades
  const courses = [
    { id: "1", name: "Matemáticas Avanzadas" },
    { id: "2", name: "Historia Universal" },
    { id: "3", name: "Programación en Python" },
    { id: "4", name: "Literatura Hispanoamericana" },
  ];
  
  const grades = [
    {
      courseId: "1",
      courseName: "Matemáticas Avanzadas",
      assessments: [
        { name: "Examen Parcial 1", grade: 85, maxGrade: 100, passed: true },
        { name: "Tarea: Ecuaciones", grade: 90, maxGrade: 100, passed: true },
        { name: "Examen Parcial 2", grade: 78, maxGrade: 100, passed: true },
        { name: "Proyecto Final", grade: 92, maxGrade: 100, passed: true },
      ],
      finalGrade: 85,
      passed: true,
    },
    {
      courseId: "2",
      courseName: "Historia Universal",
      assessments: [
        { name: "Ensayo: Edad Media", grade: 88, maxGrade: 100, passed: true },
        { name: "Examen Parcial", grade: 75, maxGrade: 100, passed: true },
        { name: "Presentación: Rev. Industrial", grade: 95, maxGrade: 100, passed: true },
      ],
      finalGrade: 86,
      passed: true,
    },
    {
      courseId: "3",
      courseName: "Programación en Python",
      assessments: [
        { name: "Quiz: Variables", grade: 100, maxGrade: 100, passed: true },
        { name: "Proyecto: App Simple", grade: 85, maxGrade: 100, passed: true },
        { name: "Examen Práctico", grade: 72, maxGrade: 100, passed: true },
        { name: "Proyecto Final", grade: 89, maxGrade: 100, passed: true },
      ],
      finalGrade: 87,
      passed: true,
    },
    {
      courseId: "4",
      courseName: "Literatura Hispanoamericana",
      assessments: [
        { name: "Ensayo: García Márquez", grade: 92, maxGrade: 100, passed: true },
        { name: "Análisis de Texto", grade: 88, maxGrade: 100, passed: true },
        { name: "Examen Parcial", grade: 65, maxGrade: 100, passed: true },
      ],
      finalGrade: 82,
      passed: true,
    },
  ];
  
  // Filter grades based on selected course
  const filteredGrades = selectedCourse === "all" 
    ? grades 
    : grades.filter(grade => grade.courseId === selectedCourse);
  
  // Calculate overall performance
  const overallGrade = grades.reduce((sum, course) => sum + course.finalGrade, 0) / grades.length;
  const passedCourses = grades.filter(course => course.passed).length;
  const totalCourses = grades.length;
  
  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Calificaciones</h1>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="grades">
          <TabsList>
            <TabsTrigger value="grades">Calificaciones</TabsTrigger>
            <TabsTrigger value="statistics">Estadísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="grades" className="mt-6">
            <Card className="mb-6">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Resumen de calificaciones</CardTitle>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-[220px]">
                      <SelectValue placeholder="Filtrar por curso" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos los cursos</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredGrades.map(course => (
                    <div key={course.courseId} className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-lg">{course.courseName}</h3>
                        <div className="flex items-center gap-2">
                          <span className="font-bold">{course.finalGrade}/100</span>
                          {course.passed ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Aprobado</Badge>
                          ) : (
                            <Badge variant="destructive">Reprobado</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {course.assessments.map((assessment, index) => (
                          <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                            <div>{assessment.name}</div>
                            <div>
                              <Progress value={assessment.grade} className="h-2" />
                            </div>
                            <div className="text-right">
                              {assessment.grade}/{assessment.maxGrade}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between items-center text-sm font-medium">
                          <span>Calificación final</span>
                          <span>{course.finalGrade}/100</span>
                        </div>
                        <Progress value={course.finalGrade} className="h-2 mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="statistics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Promedio General</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center flex-col">
                    <div className="text-4xl font-bold text-primary">
                      {overallGrade.toFixed(1)}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">de un máximo de 100</p>
                    <Progress value={overallGrade} className="h-2 mt-4 w-full" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Cursos Aprobados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center flex-col">
                    <div className="text-4xl font-bold text-primary">
                      {passedCourses}/{totalCourses}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round((passedCourses / totalCourses) * 100)}% completado
                    </p>
                    <Progress 
                      value={(passedCourses / totalCourses) * 100} 
                      className="h-2 mt-4 w-full" 
                    />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Mejor Desempeño</CardTitle>
                </CardHeader>
                <CardContent>
                  {grades.length > 0 ? (
                    <div>
                      <p className="font-medium">
                        {grades.sort((a, b) => b.finalGrade - a.finalGrade)[0].courseName}
                      </p>
                      <div className="text-4xl font-bold text-primary mt-2">
                        {Math.max(...grades.map(g => g.finalGrade))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">puntos</p>
                    </div>
                  ) : (
                    <p>No hay datos disponibles</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Grades;
