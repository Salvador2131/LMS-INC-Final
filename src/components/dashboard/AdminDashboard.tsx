
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCapIcon, PlusIcon, UserIcon, UsersIcon, BookIcon } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  // Mock statistics data
  const stats = {
    courses: 42,
    students: 756,
    teachers: 28,
    completionRate: 78
  };
  
  // Mock courses by category data
  const coursesByCategory = [
    { category: "Matemáticas", count: 8 },
    { category: "Ciencias", count: 12 },
    { category: "Historia", count: 6 },
    { category: "Literatura", count: 5 },
    { category: "Idiomas", count: 7 },
    { category: "Tecnología", count: 14 },
    { category: "Artes", count: 4 },
    { category: "Otros", count: 3 }
  ];
  
  // Mock student activity data for chart
  const activityData = [
    { month: 'Ene', active: 450, new: 50 },
    { month: 'Feb', active: 480, new: 40 },
    { month: 'Mar', active: 520, new: 60 },
    { month: 'Abr', active: 550, new: 40 },
    { month: 'May', active: 580, new: 55 },
    { month: 'Jun', active: 620, new: 75 },
  ];
  
  // Mock recent users
  const recentUsers = [
    { id: "1", name: "Laura Martínez", role: "Estudiante", date: "14/05/2025", status: "active" },
    { id: "2", name: "Carlos Sánchez", role: "Profesor", date: "13/05/2025", status: "active" },
    { id: "3", name: "Daniela López", role: "Estudiante", date: "12/05/2025", status: "pending" },
    { id: "4", name: "Fernando Ruiz", role: "Estudiante", date: "11/05/2025", status: "active" },
    { id: "5", name: "Patricia Gómez", role: "Profesor", date: "10/05/2025", status: "active" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Panel de Administración</h1>
        <div className="space-x-2">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
          <Button variant="outline">
            <PlusIcon className="h-4 w-4 mr-2" />
            Nuevo Curso
          </Button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Cursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookIcon className="h-6 w-6 text-kampus-primary mr-2" />
              <span className="text-2xl font-bold">{stats.courses}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Estudiantes Registrados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UsersIcon className="h-6 w-6 text-kampus-secondary mr-2" />
              <span className="text-2xl font-bold">{stats.students}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Profesores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <GraduationCapIcon className="h-6 w-6 text-kampus-accent mr-2" />
              <span className="text-2xl font-bold">{stats.teachers}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Índice de Finalización
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <UserIcon className="h-6 w-6 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">{stats.completionRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Activity Chart */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Actividad de Usuarios</CardTitle>
          <CardDescription>
            Usuarios activos y nuevos registros por mes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="active" 
                  name="Usuarios Activos"
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                />
                <Line 
                  type="monotone" 
                  dataKey="new" 
                  name="Nuevos Registros"
                  stroke="#0d9488" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs for different admin functions */}
      <Tabs defaultValue="users">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usuarios Recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUsers.map(user => (
                  <div 
                    key={user.id} 
                    className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        user.status === "active" ? "bg-green-500" : "bg-amber-500"
                      }`} />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Registro:</p>
                        <p className="text-sm">{user.date}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Detalles
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-kampus-primary">
                Ver Todos los Usuarios
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cursos por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {coursesByCategory.map(cat => (
                  <div 
                    key={cat.category} 
                    className="flex justify-between items-center"
                  >
                    <span>{cat.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-kampus-primary rounded-full"
                          style={{ width: `${(cat.count / Math.max(...coursesByCategory.map(c => c.count))) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{cat.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-kampus-primary">
                Administrar Categorías
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reportes Disponibles</CardTitle>
              <CardDescription>
                Genera y descarga reportes del sistema
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Usuarios Registrados</p>
                  <p className="text-sm text-muted-foreground">
                    Lista completa de usuarios y sus roles
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Exportar Excel
                </Button>
              </div>
              
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-medium">Actividad por Curso</p>
                  <p className="text-sm text-muted-foreground">
                    Estadísticas de participación y finalización
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Exportar Excel
                </Button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Rendimiento Académico</p>
                  <p className="text-sm text-muted-foreground">
                    Promedios y tendencias de calificaciones
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Exportar Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
