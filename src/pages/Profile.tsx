
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/lib/auth";

const Profile = () => {
  const { toast } = useToast();
  const currentUser = getCurrentUser();
  const [user, setUser] = useState({
    name: currentUser?.name || "Usuario Demo",
    email: currentUser?.email || "usuario@demo.com",
    role: currentUser?.role || "estudiante",
    avatar: currentUser?.avatar || "",
    country: "España",
    region: "Cataluña",
    city: "Barcelona",
    dealership: "AutoMax",
    company: "VehicleOne",
    type: "asesor",
    bio: "Especialista en asesoramiento de ventas con más de 5 años de experiencia en el sector automotriz.",
    phone: "+34 612 345 678",
    linkedin: "linkedin.com/in/usuario-demo",
    website: "",
  });

  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    assignments: true,
    messages: true,
    courseUpdates: true,
    news: false,
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Perfil actualizado",
      description: "Los cambios han sido guardados correctamente.",
    });
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.new !== password.confirm) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido actualizada correctamente.",
    });
    setPassword({
      current: "",
      new: "",
      confirm: "",
    });
  };

  const handleNotificationsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Preferencias guardadas",
      description: "Tus preferencias de notificaciones han sido actualizadas.",
    });
  };

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Mi Perfil</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-primary text-white text-xl">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 font-semibold text-xl">{user.name}</h2>
            <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
            <div className="mt-2">
              <Badge type={user.type} />
            </div>
            <div className="mt-6 space-y-2 w-full">
              <Button variant="outline" size="sm" className="w-full">
                Cambiar foto
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-3">
          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Información personal</TabsTrigger>
              <TabsTrigger value="password">Contraseña</TabsTrigger>
              <TabsTrigger value="notifications">Notificaciones</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Información personal</CardTitle>
                  <CardDescription>
                    Actualiza tu información personal y datos de contacto.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre completo</Label>
                        <Input
                          id="name"
                          value={user.name}
                          onChange={e => setUser({ ...user, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input
                          id="email"
                          type="email"
                          value={user.email}
                          onChange={e => setUser({ ...user, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Select
                          value={user.country}
                          onValueChange={value => setUser({ ...user, country: value })}
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
                        <Select
                          value={user.region}
                          onValueChange={value => setUser({ ...user, region: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona una región" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Cataluña">Cataluña</SelectItem>
                            <SelectItem value="Madrid">Madrid</SelectItem>
                            <SelectItem value="Andalucía">Andalucía</SelectItem>
                            <SelectItem value="Valencia">Valencia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                          id="city"
                          value={user.city}
                          onChange={e => setUser({ ...user, city: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          value={user.phone}
                          onChange={e => setUser({ ...user, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dealership">Concesionario</Label>
                        <Input
                          id="dealership"
                          value={user.dealership}
                          onChange={e => setUser({ ...user, dealership: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Empresa</Label>
                        <Input
                          id="company"
                          value={user.company}
                          onChange={e => setUser({ ...user, company: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tipo</Label>
                        <Select
                          value={user.type}
                          onValueChange={value => setUser({ ...user, type: value })}
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
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          value={user.linkedin}
                          onChange={e => setUser({ ...user, linkedin: e.target.value })}
                          placeholder="URL de LinkedIn"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <textarea
                          id="bio"
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={user.bio}
                          onChange={e => setUser({ ...user, bio: e.target.value })}
                          placeholder="Cuéntanos sobre ti"
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit">Guardar cambios</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Cambiar contraseña</CardTitle>
                  <CardDescription>
                    Actualiza tu contraseña para mantener segura tu cuenta.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Contraseña actual</Label>
                        <Input
                          id="current-password"
                          type="password"
                          value={password.current}
                          onChange={e => setPassword({ ...password, current: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Nueva contraseña</Label>
                        <Input
                          id="new-password"
                          type="password"
                          value={password.new}
                          onChange={e => setPassword({ ...password, new: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirmar contraseña</Label>
                        <Input
                          id="confirm-password"
                          type="password"
                          value={password.confirm}
                          onChange={e => setPassword({ ...password, confirm: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit">Actualizar contraseña</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Preferencias de notificaciones</CardTitle>
                  <CardDescription>
                    Configura cómo quieres recibir notificaciones del sistema.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleNotificationsSubmit}>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notificaciones por correo electrónico</h4>
                            <p className="text-sm text-muted-foreground">Recibe actualizaciones en tu correo</p>
                          </div>
                          <Switch
                            checked={notifications.email}
                            onCheckedChange={checked => setNotifications({ ...notifications, email: checked })}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Notificaciones del navegador</h4>
                            <p className="text-sm text-muted-foreground">Recibe alertas en el navegador</p>
                          </div>
                          <Switch
                            checked={notifications.browser}
                            onCheckedChange={checked => setNotifications({ ...notifications, browser: checked })}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Tareas y asignaciones</h4>
                            <p className="text-sm text-muted-foreground">Recibe notificaciones sobre nuevas tareas</p>
                          </div>
                          <Switch
                            checked={notifications.assignments}
                            onCheckedChange={checked => setNotifications({ ...notifications, assignments: checked })}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Mensajes</h4>
                            <p className="text-sm text-muted-foreground">Recibe notificaciones sobre nuevos mensajes</p>
                          </div>
                          <Switch
                            checked={notifications.messages}
                            onCheckedChange={checked => setNotifications({ ...notifications, messages: checked })}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Actualizaciones de cursos</h4>
                            <p className="text-sm text-muted-foreground">Recibe notificaciones sobre cambios en cursos</p>
                          </div>
                          <Switch
                            checked={notifications.courseUpdates}
                            onCheckedChange={checked => setNotifications({ ...notifications, courseUpdates: checked })}
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Noticias y novedades</h4>
                            <p className="text-sm text-muted-foreground">Recibe actualizaciones sobre la plataforma</p>
                          </div>
                          <Switch
                            checked={notifications.news}
                            onCheckedChange={checked => setNotifications({ ...notifications, news: checked })}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button type="submit">Guardar preferencias</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

// Badge component for user type
const Badge = ({ type }: { type: string }) => {
  const getTypeColor = () => {
    switch (type) {
      case "tecnico":
        return "bg-blue-100 text-blue-800";
      case "asesor":
        return "bg-green-100 text-green-800";
      case "ventas":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "tecnico":
        return "Técnico";
      case "asesor":
        return "Asesor";
      case "ventas":
        return "Ventas";
      default:
        return type;
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
      {getTypeLabel()}
    </span>
  );
};

// Switch component for notification preferences
const Switch = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => {
  return (
    <div 
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? "bg-primary" : "bg-gray-200"}`}
      onClick={() => onCheckedChange(!checked)}
    >
      <span 
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </div>
  );
};

export default Profile;
