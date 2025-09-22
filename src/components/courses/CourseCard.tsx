
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarIcon, ClockIcon, UsersIcon } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    instructor: string;
    coverImage: string;
    category: string;
    progress?: number;
    students?: number;
    startDate?: string;
    schedule?: string;
    pais?: string;
    region?: string;
    ciudad?: string;
    concesionario?: string;
    empresa?: string;
    tipo?: string;
    status?: string;
  };
  role: "estudiante" | "profesor" | "admin";
}

const CourseCard = ({ course, role }: CourseCardProps) => {
  const {
    title,
    instructor,
    coverImage,
    category,
    progress,
    students,
    startDate,
    schedule
  } = course;

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
      <div className="relative h-36">
        <img
          src={coverImage || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-primary">
          {category}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <h3 className="font-bold text-lg line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground">
          {role === "estudiante" ? "Prof. " + instructor : instructor}
        </p>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        {role === "estudiante" && progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>Progreso</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        {role === "profesor" && students !== undefined && (
          <div className="flex items-center text-sm text-muted-foreground">
            <UsersIcon className="h-4 w-4 mr-1" />
            <span>{students} estudiantes</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="text-xs text-muted-foreground">
        <div className="w-full space-y-1">
          {startDate && (
            <div className="flex items-center">
              <CalendarIcon className="h-3.5 w-3.5 mr-1" />
              <span>Inicio: {startDate}</span>
            </div>
          )}
          
          {schedule && (
            <div className="flex items-center">
              <ClockIcon className="h-3.5 w-3.5 mr-1" />
              <span>{schedule}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
