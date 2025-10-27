import MainLayout from "@/components/layout/MainLayout";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useAuth } from "@/lib/auth";

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const userRole = user?.role || "estudiante";

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-4">
            Debes iniciar sesión para acceder al dashboard
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

  return (
    <MainLayout>
      {/* Mostrar información del usuario */}
      <div className="mb-6 p-4 bg-blue-50 rounded-md">
        <h2 className="text-lg font-semibold mb-2">
          ¡Bienvenido, {user?.name}!
        </h2>
        <p className="text-sm text-muted-foreground">
          Rol: {user?.role} | Email: {user?.email}
        </p>
      </div>

      {userRole === "estudiante" && <StudentDashboard />}
      {userRole === "profesor" && <TeacherDashboard />}
      {userRole === "admin" && <AdminDashboard />}
    </MainLayout>
  );
};

export default Dashboard;
