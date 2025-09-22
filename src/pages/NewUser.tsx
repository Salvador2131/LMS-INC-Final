
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const NewUser = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "estudiante",
    country: "",
    region: "",
    city: "",
    dealership: "",
    company: "",
    type: "",
  });

  const [fileUsers, setFileUsers] = useState<File | null>(null);

  const handleChange = (field: string, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send the data to your backend
    console.log("User data submitted:", userData);
    
    toast({
      title: "Usuario creado",
      description: `El usuario ${userData.name} ha sido creado exitosamente.`,
    });
    
    // Reset form
    setUserData({
      name: "",
      email: "",
      password: "",
      role: "estudiante",
      country: "",
      region: "",
      city: "",
      dealership: "",
      company: "",
      type: "",
    });
  };

  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fileUsers) {
      toast({
        title: "Error",
        description: "Por favor selecciona un archivo CSV o Excel.",
        variant: "destructive",
      });
      return;
    }
    
    // Here you would typically process the file and send to backend
    console.log("File uploaded:", fileUsers);
    
    toast({
      title: "Archivo procesado",
      description: "Los usuarios han sido importados exitosamente.",
    });
    
    // Reset file input
    setFileUsers(null);
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Crear Usuario</h1>
      </div>

      <Tabs defaultValue="individual">
        <TabsList className="mb-6">
          <TabsTrigger value="individual">Usuario individual</TabsTrigger>
          <TabsTrigger value="bulk">Carga masiva</TabsTrigger>
        </TabsList>
        
        <TabsContent value="individual">
          <Card>
            <CardHeader>
              <CardTitle>Nuevo Usuario</CardTitle>
              <CardDescription>
                Ingresa los datos para crear un nuevo usuario en el sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      value={userData.name}
                      onChange={e => handleChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userData.email}
                      onChange={e => handleChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      id="password"
                      type="password"
                      value={userData.password}
                      onChange={e => handleChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Rol</Label>
                    <Select
                      value={userData.role}
                      onValueChange={value => handleChange("role", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="estudiante">Estudiante</SelectItem>
                        <SelectItem value="profesor">Profesor</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">País</Label>
                    <Select
                      value={userData.country}
                      onValueChange={value => handleChange("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un país" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="España">España</SelectItem>
                        <SelectItem value="México">México</SelectItem>
                        <SelectItem value="Argentina">Argentina</SelectItem>
                        <SelectItem value="Colombia">Colombia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Región</Label>
                    <Input
                      id="region"
                      value={userData.region}
                      onChange={e => handleChange("region", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Ciudad</Label>
                    <Input
                      id="city"
                      value={userData.city}
                      onChange={e => handleChange("city", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dealership">Concesionario</Label>
                    <Input
                      id="dealership"
                      value={userData.dealership}
                      onChange={e => handleChange("dealership", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa</Label>
                    <Input
                      id="company"
                      value={userData.company}
                      onChange={e => handleChange("company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select
                      value={userData.type}
                      onValueChange={value => handleChange("type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tecnico">Técnico</SelectItem>
                        <SelectItem value="asesor">Asesor</SelectItem>
                        <SelectItem value="ventas">Ventas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button type="submit">Crear usuario</Button>
                  <Button type="button" variant="outline" onClick={() => {
                    setUserData({
                      name: "",
                      email: "",
                      password: "",
                      role: "estudiante",
                      country: "",
                      region: "",
                      city: "",
                      dealership: "",
                      company: "",
                      type: "",
                    });
                  }}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Carga Masiva de Usuarios</CardTitle>
              <CardDescription>
                Sube un archivo CSV o Excel con la información de múltiples usuarios.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBulkUpload}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file-upload">Archivo de usuarios</Label>
                    <div className="mt-2">
                      <Input
                        id="file-upload"
                        type="file"
                        accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={e => {
                          if (e.target.files && e.target.files.length > 0) {
                            setFileUsers(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Formatos aceptados: CSV, XLS, XLSX
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-md">
                    <h4 className="font-medium text-blue-700">Plantilla de archivo</h4>
                    <p className="text-sm text-blue-600 mb-2">
                      El archivo debe contener las siguientes columnas:
                    </p>
                    <ul className="list-disc pl-5 text-sm text-blue-600 space-y-1">
                      <li>nombre_completo</li>
                      <li>email (debe ser único)</li>
                      <li>contraseña</li>
                      <li>rol (estudiante, profesor, admin)</li>
                      <li>pais (opcional)</li>
                      <li>region (opcional)</li>
                      <li>ciudad (opcional)</li>
                      <li>concesionario (opcional)</li>
                      <li>empresa (opcional)</li>
                      <li>tipo (tecnico, asesor, ventas - opcional)</li>
                    </ul>
                    <div className="mt-3">
                      <Button variant="secondary" size="sm">
                        Descargar plantilla
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex gap-2">
                  <Button type="submit" disabled={!fileUsers}>
                    Procesar archivo
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setFileUsers(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default NewUser;
