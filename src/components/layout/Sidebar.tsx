
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BookIcon, 
  CalendarIcon, 
  FileTextIcon, 
  GraduationCapIcon,
  HomeIcon, 
  MessageSquareIcon,
  UsersIcon,
  X
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { getCurrentUser } from "@/lib/auth";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const isMobile = useIsMobile();
  const user = getCurrentUser();
  const userRole = user?.role || "estudiante";
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { id: "home", label: "Inicio", icon: HomeIcon, path: "/dashboard", roles: ["estudiante", "profesor", "admin"] },
    { id: "courses", label: "Mis Cursos", icon: BookIcon, path: "/courses", roles: ["estudiante", "profesor", "admin"] },
    { id: "calendar", label: "Calendario", icon: CalendarIcon, path: "/calendar", roles: ["estudiante", "profesor", "admin"] },
    { id: "assignments", label: "Tareas", icon: FileTextIcon, path: "/assignments", roles: ["estudiante", "profesor"] },
    { id: "messages", label: "Mensajes", icon: MessageSquareIcon, path: "/forum", roles: ["estudiante", "profesor", "admin"] },
    { id: "grades", label: "Calificaciones", icon: GraduationCapIcon, path: "/grades", roles: ["estudiante", "profesor", "admin"] },
    { id: "students", label: "Estudiantes", icon: UsersIcon, path: "/students", roles: ["profesor", "admin"] },
    { id: "manage-courses", label: "Gestionar Cursos", icon: BookIcon, path: "/manage-courses", roles: ["admin"] },
    { id: "manage-users", label: "Gestionar Usuarios", icon: UsersIcon, path: "/new-user", roles: ["admin"] },
  ];

  const filteredMenuItems = menuItems.filter(item => item.roles.includes(userRole));

  const handleItemClick = () => {
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => setOpen(false)}
        />
      )}
      
      <aside 
        className={cn(
          "fixed h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-30 transition-all duration-300",
          open 
            ? "w-64" 
            : isMobile 
              ? "-translate-x-full" 
              : "w-20",
          isMobile && open ? "translate-x-0" : ""
        )}
      >
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2" 
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
        
        <div className="px-3 py-4">
          {(!isMobile || open) && (
            <div className="mb-6 text-center">
              <h3 className="font-semibold text-lg text-primary mb-1">Aurum INC</h3>
            </div>
          )}
          <nav className="space-y-1">
            {filteredMenuItems.map((item) => (
              <Link to={item.path} key={item.id}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start mb-1",
                    !open && !isMobile ? "px-2" : "px-3",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-muted"
                  )}
                  onClick={handleItemClick}
                >
                  <item.icon className={cn("h-5 w-5", open ? "mr-2" : "mx-auto")} />
                  {(open || isMobile) && <span>{item.label}</span>}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
