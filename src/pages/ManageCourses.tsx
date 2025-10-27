import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  SearchIcon,
  PlusIcon,
  UsersIcon,
  CalendarIcon,
  ClockIcon,
  PenIcon,
  Trash2Icon,
  EyeIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";

const ManageCourses = () => {
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    category: "all",
    instructor: "all",
  });

  // Mock data for courses - Vista administrativa completa
  const allCourses = [
    {
      id: "1",
      title: "Matemáticas Avanzadas",
      instructor: "Carlos Mendoza",
      coverImage:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Matemáticas",
      students: 28,
      startDate: "10/05/2025",
      schedule: "Lun, Mié 15:00-17:00",
      status: "Activo",
      createdBy: "Carlos Mendoza",
      lastModified: "15/01/2025",
    },
    {
      id: "2",
      title: "Historia Universal",
      instructor: "Ana García",
      coverImage:
        "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "Historia",
      students: 19,
      startDate: "05/05/2025",
      schedule: "Mar, Jue 10:00-12:00",
      status: "Activo",
      createdBy: "Ana García",
      lastModified: "12/01/2025",
    },
    {
      id: "3",
      title: "Programación en Python",
      instructor: "Ricardo Torres",
      coverImage:
        "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      category: "Tecnología",
      students: 35,
      startDate: "15/05/2025",
      schedule: "Vie 14:00-18:00",
      status: "Activo",
      createdBy: "Ricardo Torres",
      lastModified: "18/01/2025",
    },
    {
      id: "4",
      title: "Literatura Hispanoamericana",
      instructor: "Elena Martínez",
      coverImage:
        "https://images.unsplash.com/photo-1456513080867-f24f12e94d55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80",
      category: "Literatura",
      students: 22,
      startDate: "20/05/2025",
      schedule: "Jue 15:00-18:00",
      status: "En Revisión",
      createdBy: "Elena Martínez",
      lastModified: "20/01/2025",
    },
    {
      id: "5",
      title: "Física I: Mecánica",
      instructor: "Luis Ramírez",
      coverImage:
        "https://images.unsplash.com/photo-1636466514704-5b34ee678227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
      category: "Ciencias",
      students: 0,
      startDate: "25/05/2025",
      schedule: "Mar, Jue 13:00-15:00",
      status: "Disponible",
      createdBy: "Luis Ramírez",
      lastModified: "22/01/2025",
    },
    {
      id: "6",
      title: "Química Orgánica",
      instructor: "Dr. Patricia López",
      coverImage:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=200&fit=crop",
      category: "Ciencias",
      students: 15,
      startDate: "15/06/2025",
      schedule: "Lun, Mié 14:00-16:00",
      status: "En Revisión",
      createdBy: "Dr. Patricia López",
      lastModified: "25/01/2025",
    },
    {
      id: "7",
      title: "Filosofía Contemporánea",
      instructor: "Prof. Roberto Silva",
      coverImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop",
      category: "Filosofía",
      students: 8,
      startDate: "01/07/2025",
      schedule: "Mar, Jue 11:00-13:00",
      status: "Pausado",
      createdBy: "Prof. Roberto Silva",
      lastModified: "28/01/2025",
    },
  ];

  // Si no está autenticado o no es admin, redirigir
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">
            Solo los administradores pueden acceder a la gestión de cursos
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

  // Filter courses based on search and filters
  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      (filters.status && filters.status !== "all"
        ? course.status === filters.status
        : true) &&
      (filters.category && filters.category !== "all"
        ? course.category === filters.category
        : true) &&
      (filters.instructor && filters.instructor !== "all"
        ? course.instructor
            .toLowerCase()
            .includes(filters.instructor.toLowerCase())
        : true);

    return matchesSearch && matchesFilters;
  });

  // Get unique values for filters
  const statuses = [...new Set(allCourses.map((c) => c.status))];
  const categories = [...new Set(allCourses.map((c) => c.category))];
  const instructors = [...new Set(allCourses.map((c) => c.instructor))];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      category: "all",
      instructor: "all",
    });
    setSearchQuery("");
  };

  const handleDeleteCourse = (id: string) => {
    // In a real app, you would call your API to delete the course
    toast({
      title: "Curso eliminado",
      description: "El curso ha sido eliminado correctamente.",
    });
  };

  return (
    <MainLayout>
      {/* Header informativo para administrador */}
      <div className="mb-6 p-4 bg-purple-50 rounded-md">
        <h2 className="text-lg font-semibold mb-2">
          Panel de Administración - Gestión de Cursos
        </h2>
        <p className="text-sm text-muted-foreground">
          Administrador: {user?.name} | Total de cursos: {allCourses.length} |
          Activos: {allCourses.filter((c) => c.status === "Activo").length} | En
          revisión:{" "}
          {allCourses.filter((c) => c.status === "En Revisión").length}
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Gestionar Cursos</h1>
        <Button className="bg-primary hover:bg-primary/90" asChild>
          <Link to="/courses/create">
            <PlusIcon className="h-4 w-4 mr-2" />
            Crear Nuevo Curso
          </Link>
        </Button>
      </div>

      {/* Search and filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <div className="relative flex-grow">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={resetFilters}>
              Limpiar filtros
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Badge className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filters.status}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los estados</SelectItem>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filters.instructor}
              onValueChange={(value) => handleFilterChange("instructor", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Instructor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los instructores</SelectItem>
                {instructors.map((instructor) => (
                  <SelectItem key={instructor} value={instructor}>
                    {instructor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Course list */}
      <div className="space-y-4">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-48 h-40 relative">
                  <img
                    src={course.coverImage}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <StatusBadge status={course.status} />
                  </div>
                </div>
                <div className="p-6 flex-1">
                  <div className="flex flex-col md:flex-row justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Instructor: {course.instructor}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/course/${course.id}`}>Ver</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/course/${course.id}/manage`}>
                          <PenIcon className="h-4 w-4 mr-1" />
                          Editar
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCourse(course.id)}
                      >
                        <Trash2Icon className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Categoría</p>
                      <p className="text-sm">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Estudiantes
                      </p>
                      <p className="text-sm flex items-center">
                        <UsersIcon className="h-3 w-3 mr-1" />
                        {course.students}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Creado por
                      </p>
                      <p className="text-sm">{course.createdBy}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Última modificación
                      </p>
                      <p className="text-sm">{course.lastModified}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge
                      className={
                        course.status === "Activo"
                          ? "bg-green-500"
                          : course.status === "En Revisión"
                          ? "bg-yellow-500"
                          : course.status === "Pausado"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }
                    >
                      {course.status}
                    </Badge>
                    <Badge variant="outline">{course.category}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center p-8">
          <p className="text-muted-foreground">
            No se encontraron cursos con los filtros seleccionados.
          </p>
        </div>
      )}
    </MainLayout>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  if (status === "Activo") {
    return <Badge className="bg-green-500">Activo</Badge>;
  } else if (status === "En Revisión") {
    return <Badge className="bg-yellow-500">En Revisión</Badge>;
  } else if (status === "Pausado") {
    return <Badge className="bg-red-500">Pausado</Badge>;
  } else if (status === "Disponible") {
    return <Badge className="bg-blue-500">Disponible</Badge>;
  } else {
    return <Badge variant="outline">Inactivo</Badge>;
  }
};

export default ManageCourses;
