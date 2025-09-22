
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BellIcon, BookIcon, CheckIcon, FileTextIcon, MessageSquareIcon } from "lucide-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Nueva tarea asignada",
      description: "Matemáticas - Ecuaciones diferenciales",
      date: "2025-05-25",
      type: "task",
      read: false,
    },
    {
      id: 2,
      title: "Nuevo mensaje en el foro",
      description: "Física - Tema: Leyes de Newton",
      date: "2025-05-24",
      type: "message",
      read: false,
    },
    {
      id: 3,
      title: "Calificación publicada",
      description: "Historia - Examen parcial",
      date: "2025-05-23",
      type: "grade",
      read: true,
    },
    {
      id: 4,
      title: "Nuevo curso disponible",
      description: "Introducción a la inteligencia artificial",
      date: "2025-05-22",
      type: "course",
      read: true,
    },
    {
      id: 5,
      title: "Recordatorio: Entrega pendiente",
      description: "Literatura - Ensayo final",
      date: "2025-05-21",
      type: "task",
      read: false,
    },
    {
      id: 6,
      title: "Feedback del instructor",
      description: "Programación - Proyecto de Python",
      date: "2025-05-20",
      type: "message",
      read: true,
    },
  ]);

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "task":
        return <FileTextIcon className="h-5 w-5 text-blue-500" />;
      case "message":
        return <MessageSquareIcon className="h-5 w-5 text-green-500" />;
      case "grade":
        return <CheckIcon className="h-5 w-5 text-purple-500" />;
      case "course":
        return <BookIcon className="h-5 w-5 text-orange-500" />;
      default:
        return <BellIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Notificaciones</h1>
          {unreadCount > 0 && (
            <Badge className="bg-primary">{unreadCount} sin leer</Badge>
          )}
        </div>
        <Button variant="outline" onClick={markAllAsRead}>
          Marcar todas como leídas
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="unread">Sin leer</TabsTrigger>
          <TabsTrigger value="tasks">Tareas</TabsTrigger>
          <TabsTrigger value="messages">Mensajes</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-4">
            {notifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={markAsRead} 
                formatDate={formatDate}
                getIcon={getNotificationIcon}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-4">
            {notifications.filter(n => !n.read).map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={markAsRead} 
                formatDate={formatDate}
                getIcon={getNotificationIcon}
              />
            ))}
            {notifications.filter(n => !n.read).length === 0 && (
              <p className="text-center text-muted-foreground py-8">No hay notificaciones sin leer</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <div className="space-y-4">
            {notifications.filter(n => n.type === "task").map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={markAsRead} 
                formatDate={formatDate}
                getIcon={getNotificationIcon}
              />
            ))}
            {notifications.filter(n => n.type === "task").length === 0 && (
              <p className="text-center text-muted-foreground py-8">No hay notificaciones de tareas</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <div className="space-y-4">
            {notifications.filter(n => n.type === "message").map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={markAsRead} 
                formatDate={formatDate}
                getIcon={getNotificationIcon}
              />
            ))}
            {notifications.filter(n => n.type === "message").length === 0 && (
              <p className="text-center text-muted-foreground py-8">No hay notificaciones de mensajes</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="courses">
          <div className="space-y-4">
            {notifications.filter(n => n.type === "course").map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={markAsRead} 
                formatDate={formatDate}
                getIcon={getNotificationIcon}
              />
            ))}
            {notifications.filter(n => n.type === "course").length === 0 && (
              <p className="text-center text-muted-foreground py-8">No hay notificaciones de cursos</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

interface NotificationItemProps {
  notification: {
    id: number;
    title: string;
    description: string;
    date: string;
    type: string;
    read: boolean;
  };
  onMarkAsRead: (id: number) => void;
  formatDate: (date: string) => string;
  getIcon: (type: string) => JSX.Element;
}

const NotificationItem = ({ notification, onMarkAsRead, formatDate, getIcon }: NotificationItemProps) => {
  return (
    <Card className={notification.read ? "bg-white" : "bg-blue-50"}>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="mt-1">
            {getIcon(notification.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className={`font-medium ${!notification.read ? "font-semibold" : ""}`}>
                {notification.title}
              </h3>
              <span className="text-xs text-muted-foreground">
                {formatDate(notification.date)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {notification.description}
            </p>
          </div>
        </div>
        
        {!notification.read && (
          <div className="mt-3 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onMarkAsRead(notification.id)}
            >
              Marcar como leída
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Notifications;
