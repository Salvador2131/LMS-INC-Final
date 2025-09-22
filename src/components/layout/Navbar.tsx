
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BellIcon, MenuIcon, UserIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Actualiza el usuario cuando cambia el localStorage
    const handleStorageChange = () => {
      setUser(getCurrentUser());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Mock notifications
  const notificationCount = 3;
  
  const handleLogout = () => {
    logoutUser();
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate("/");
  };
  
  // Obtiene las iniciales del nombre de usuario
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-10">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
          <MenuIcon className="h-5 w-5" />
        </Button>
        <div className="font-bold text-xl text-primary">Aurum INC</div>
      </div>
      
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <BellIcon className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 px-1.5 h-5 bg-accent"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72">
                <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Nueva tarea asignada</span>
                    <span className="text-sm text-muted-foreground">Matemáticas - Entrega: 25/05/2025</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Nuevo mensaje en el foro</span>
                    <span className="text-sm text-muted-foreground">Física - Tema: Leyes de Newton</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium">Calificación publicada</span>
                    <span className="text-sm text-muted-foreground">Historial - Examen parcial</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-center text-primary">
                  <Link to="/notifications">Ver todas las notificaciones</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* User profile */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span>{user.name}</span>
                    <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                  <UserIcon className="h-4 w-4 mr-2" />
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/login">Iniciar Sesión</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/register">Registrarse</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
