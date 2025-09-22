
import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCurrentUser } from "@/lib/auth";
import { Navigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
  requireAuth?: boolean;
}

const MainLayout = ({ children, requireAuth = true }: MainLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const user = getCurrentUser();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Si requireAuth es true y no hay usuario, redirige al login
  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <main 
          className={`flex-1 overflow-auto p-4 transition-all duration-300 ${
            sidebarOpen && !isMobile ? "ml-64" : isMobile ? "ml-0" : "ml-20"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
