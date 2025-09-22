
import MainLayout from "@/components/layout/MainLayout";
import StudentDashboard from "@/components/dashboard/StudentDashboard";
import TeacherDashboard from "@/components/dashboard/TeacherDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import { useState } from "react";

const Dashboard = () => {
  // This would come from auth context in a real app
  const [userRole, setUserRole] = useState<"estudiante" | "profesor" | "admin">("estudiante");

  // For demonstration purposes, add buttons to switch between roles
  const handleRoleChange = (role: "estudiante" | "profesor" | "admin") => {
    setUserRole(role);
  };

  return (
    <MainLayout>
      {/* Role switcher for demo purposes */}
      <div className="mb-6 p-3 bg-gray-100 rounded-md">
        <p className="text-xs text-muted-foreground mb-2">
          Demo: Cambiar de rol para ver diferentes dashboards
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleRoleChange("estudiante")}
            className={`px-3 py-1 rounded text-sm ${
              userRole === "estudiante"
                ? "bg-kampus-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Estudiante
          </button>
          <button
            onClick={() => handleRoleChange("profesor")}
            className={`px-3 py-1 rounded text-sm ${
              userRole === "profesor"
                ? "bg-kampus-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Profesor
          </button>
          <button
            onClick={() => handleRoleChange("admin")}
            className={`px-3 py-1 rounded text-sm ${
              userRole === "admin"
                ? "bg-kampus-primary text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Administrador
          </button>
        </div>
      </div>

      {userRole === "estudiante" && <StudentDashboard />}
      {userRole === "profesor" && <TeacherDashboard />}
      {userRole === "admin" && <AdminDashboard />}
    </MainLayout>
  );
};

export default Dashboard;
