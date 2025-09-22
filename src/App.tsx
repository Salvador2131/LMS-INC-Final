
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import CreateCourse from "./pages/CreateCourse";
import Forum from "./pages/Forum";
import Assignments from "./pages/Assignments";
import Calendar from "./pages/Calendar";
import NotFound from "./pages/NotFound";
import Students from "./pages/Students";
import CourseDetail from "./pages/CourseDetail";
import ManageCourse from "./pages/ManageCourse";
import ManageCourses from "./pages/ManageCourses";
import NewUser from "./pages/NewUser";
import Profile from "./pages/Profile";
import Grades from "./pages/Grades";
import Notifications from "./pages/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:id/manage" element={<ManageCourse />} />
          <Route path="/manage-courses" element={<ManageCourses />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/students" element={<Students />} />
          <Route path="/new-user" element={<NewUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
