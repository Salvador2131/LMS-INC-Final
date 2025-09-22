
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SearchIcon, PlusIcon, Flag, MapPin, Building, Briefcase, PenIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ManageCourses = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    pais: "",
    region: "",
    ciudad: "",
    concesionario: "",
    empresa: "",
    tipo: "",
  });
  
  // Mock data for courses
  const allCourses = [
    {
      id: "1",
      title: "Matemáticas Avanzadas",
      instructor: "Carlos Mendoza",
      coverImage: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Matemáticas",
      students: 28,
      startDate: "10/05/2025",
      schedule: "Lun, Mié 15:00-17:00",
      pais: "España",
      region: "Cataluña",
      ciudad: "Barcelona",
      concesionario: "AutoMax",
      empresa: "VehicleOne",
      tipo: "tecnico",
      status: "active",
    },
    {
      id: "2",
      title: "Historia Universal",
      instructor: "Ana García",
      coverImage: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "Historia",
      students: 19,
      startDate: "05/05/2025",
      schedule: "Mar, Jue 10:00-12:00",
      pais: "México",
      region: "Ciudad de México",
      ciudad: "Miguel Hidalgo",
      concesionario: "CarWorld",
      empresa: "AutoGroup",
      tipo: "asesor",
      status: "active",
    },
    {
      id: "3",
      title: "Programación en Python",
      instructor: "Ricardo Torres",
      coverImage: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      category: "Tecnología",
      students: 35,
      startDate: "15/05/2025",
      schedule: "Vie 14:00-18:00",
      pais: "Colombia",
      region: "Bogotá",
      ciudad: "Chapinero",
      concesionario: "CarDrive",
      empresa: "VehicleTech",
      tipo: "tecnico",
      status: "active",
    },
    {
      id: "4",
      title: "Ventas y Atención al Cliente",
      instructor: "Laura Sánchez",
      coverImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Negocios",
      students: 42,
      startDate: "20/05/2025",
      schedule: "Lun, Mié, Vie 16:00-18:00",
      pais: "Argentina",
      region: "Buenos Aires",
      ciudad: "La Plata",
      concesionario: "AutoDrive",
      empresa: "MotorCorp",
      tipo: "ventas",
      status: "draft",
    },
  ];

  // Filter courses based on search and filters
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = 
      (filters.pais ? course.pais === filters.pais : true) &&
      (filters.region ? course.region === filters.region : true) &&
      (filters.ciudad ? course.ciudad === filters.ciudad : true) &&
      (filters.concesionario ? course.concesionario === filters.concesionario : true) &&
      (filters.empresa ? course.empresa === filters.empresa : true) &&
      (filters.tipo ? course.tipo === filters.tipo : true);
    
    return matchesSearch && matchesFilters;
  });

  // Get unique values for filters
  const countries = [...new Set(allCourses.map(c => c.pais))];
  const regions = [...new Set(allCourses.map(c => c.region))];
  const cities = [...new Set(allCourses.map(c => c.ciudad))];
  const dealerships = [...new Set(allCourses.map(c => c.concesionario))];
  const companies = [...new Set(allCourses.map(c => c.empresa))];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      pais: "",
      region: "",
      ciudad: "",
      concesionario: "",
      empresa: "",
      tipo: "",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="flex items-center gap-2">
            <Flag className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={filters.pais} 
              onValueChange={(value) => handleFilterChange("pais", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="País" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los países</SelectItem>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={filters.region} 
              onValueChange={(value) => handleFilterChange("region", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Región" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las regiones</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={filters.ciudad} 
              onValueChange={(value) => handleFilterChange("ciudad", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Ciudad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las ciudades</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={filters.concesionario} 
              onValueChange={(value) => handleFilterChange("concesionario", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Concesionario" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los concesionarios</SelectItem>
                {dealerships.map(dealership => (
                  <SelectItem key={dealership} value={dealership}>{dealership}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Building className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={filters.empresa} 
              onValueChange={(value) => handleFilterChange("empresa", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las empresas</SelectItem>
                {companies.map(company => (
                  <SelectItem key={company} value={company}>{company}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <Select 
              value={filters.tipo} 
              onValueChange={(value) => handleFilterChange("tipo", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos los tipos</SelectItem>
                <SelectItem value="tecnico">Técnico</SelectItem>
                <SelectItem value="asesor">Asesor</SelectItem>
                <SelectItem value="ventas">Ventas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Course list */}
      <div className="space-y-4">
        {filteredCourses.map(course => (
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
                      <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                    </div>
                    <div className="flex gap-2 mt-4 md:mt-0">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/course/${course.id}`}>
                          Ver
                        </Link>
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
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Categoría</p>
                      <p className="text-sm">{course.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estudiantes</p>
                      <p className="text-sm">{course.students}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Inicio</p>
                      <p className="text-sm">{course.startDate}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="secondary">{course.pais}</Badge>
                    <Badge variant="outline" className="capitalize">{course.tipo}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredCourses.length === 0 && (
        <div className="text-center p-8">
          <p className="text-muted-foreground">No se encontraron cursos con los filtros seleccionados.</p>
        </div>
      )}
    </MainLayout>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  if (status === "active") {
    return (
      <Badge className="bg-green-500">Activo</Badge>
    );
  } else if (status === "draft") {
    return (
      <Badge variant="secondary">Borrador</Badge>
    );
  } else {
    return (
      <Badge variant="outline">Inactivo</Badge>
    );
  }
};

export default ManageCourses;
