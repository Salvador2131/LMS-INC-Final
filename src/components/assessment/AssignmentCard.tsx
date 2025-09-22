
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, ClockIcon, FileTextIcon } from "lucide-react";

interface AssignmentCardProps {
  assignment: {
    id: string;
    title: string;
    course: string;
    dueDate: string;
    status: "pending" | "completed" | "late" | "graded";
    description: string;
    instructor?: {
      name: string;
      avatar?: string;
    };
    grade?: {
      score: string;
      feedback?: string;
    };
  };
  role: "estudiante" | "profesor";
}

const AssignmentCard = ({ assignment, role }: AssignmentCardProps) => {
  const {
    title,
    course,
    dueDate,
    status,
    description,
    instructor,
    grade
  } = assignment;

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pendiente</Badge>;
      case "completed":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Entregado</Badge>;
      case "late":
        return <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">Atrasado</Badge>;
      case "graded":
        return <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Calificado</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p className="text-sm text-muted-foreground">{course}</p>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm mb-3 line-clamp-3">{description}</p>
        
        <div className="space-y-1.5 text-sm">
          <div className="flex items-center text-muted-foreground">
            <CalendarIcon className="h-4 w-4 mr-1.5" />
            <span>Fecha límite: {dueDate}</span>
          </div>
          
          {instructor && (
            <div className="flex items-center mt-2">
              <Avatar className="h-5 w-5 mr-1.5">
                <AvatarImage src={instructor.avatar} />
                <AvatarFallback className="text-xs bg-kampus-primary text-white">
                  {instructor.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{instructor.name}</span>
            </div>
          )}
          
          {status === "graded" && grade && (
            <div className="mt-2 p-2 bg-gray-50 rounded-md">
              <div className="font-medium">Calificación: {grade.score}</div>
              {grade.feedback && (
                <p className="text-sm mt-1 text-muted-foreground">{grade.feedback}</p>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        {role === "estudiante" ? (
          <Button 
            className="w-full" 
            variant={status === "pending" ? "default" : "outline"}
            disabled={status === "graded"}
          >
            {status === "pending" ? "Entregar Tarea" : 
             status === "completed" ? "Ver Entrega" : 
             status === "late" ? "Entregar Tarde" : 
             "Ver Calificación"}
          </Button>
        ) : (
          <Button 
            className="w-full" 
            variant={status === "completed" || status === "late" ? "default" : "outline"}
          >
            {status === "pending" ? "Ver Detalles" : 
             status === "completed" || status === "late" ? "Calificar" : 
             "Ver Calificación"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AssignmentCard;
