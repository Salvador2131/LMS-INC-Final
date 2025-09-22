
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PlusIcon } from "lucide-react";

const Calendar = () => {
  // Datos simulados para el calendario
  const events = [
    { id: 1, title: "Entrega de Proyecto", date: "2025-05-20", course: "Desarrollo Web", type: "assignment" },
    { id: 2, title: "Examen Parcial", date: "2025-05-23", course: "Matemáticas", type: "exam" },
    { id: 3, title: "Sesión de Estudio", date: "2025-05-18", course: "Física", type: "event" },
    { id: 4, title: "Webinar: IA en Educación", date: "2025-05-25", course: "Tecnología", type: "webinar" },
    { id: 5, title: "Revisión de Ensayo", date: "2025-05-19", course: "Literatura", type: "assignment" }
  ];

  // Función para obtener eventos del día actual
  const getTodayEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events.filter(event => event.date === today);
  };
  
  // Función para obtener eventos de esta semana
  const getWeekEvents = () => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    });
  };
  
  // Función para obtener eventos del mes
  const getMonthEvents = () => events;
  
  // Función para generar contenido del calendario mensual
  const generateMonthCalendar = () => {
    const daysInMonth = 31; // Simplificado
    const days = [];
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = events.filter(event => {
        const eventDay = new Date(event.date).getDate();
        return eventDay === i;
      });
      
      days.push(
        <div key={i} className={`border p-2 h-24 overflow-y-auto ${dayEvents.length > 0 ? 'bg-gray-50' : ''}`}>
          <div className="font-semibold mb-1">{i}</div>
          {dayEvents.map(event => (
            <div key={event.id} className={`text-xs p-1 mb-1 rounded truncate ${getEventColor(event.type)}`}>
              {event.title}
            </div>
          ))}
        </div>
      );
    }
    
    return days;
  };
  
  // Función para obtener color según tipo de evento
  const getEventColor = (type: string) => {
    switch (type) {
      case 'assignment':
        return 'bg-blue-100 text-blue-800';
      case 'exam':
        return 'bg-red-100 text-red-800';
      case 'webinar':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Calendario Académico</h1>
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Nuevo Evento
          </Button>
        </div>

        <Tabs defaultValue="month">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="today">Hoy</TabsTrigger>
              <TabsTrigger value="week">Semana</TabsTrigger>
              <TabsTrigger value="month">Mes</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Mayo 2025
              </Button>
              <div className="space-x-1">
                <Button variant="outline" size="icon">
                  &lt;
                </Button>
                <Button variant="outline" size="icon">
                  &gt;
                </Button>
              </div>
            </div>
          </div>
        
          <TabsContent value="today" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eventos de Hoy</CardTitle>
              </CardHeader>
              <CardContent>
                {getTodayEvents().length > 0 ? (
                  <div className="space-y-3">
                    {getTodayEvents().map(event => (
                      <div key={event.id} className={`p-3 rounded border-l-4 ${getEventColor(event.type)} border-l-blue-500`}>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.course} • {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay eventos programados para hoy
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="week" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Eventos de esta Semana</CardTitle>
              </CardHeader>
              <CardContent>
                {getWeekEvents().length > 0 ? (
                  <div className="space-y-3">
                    {getWeekEvents().map(event => (
                      <div key={event.id} className={`p-3 rounded border-l-4 ${getEventColor(event.type)} border-l-blue-500`}>
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.course} • {new Date(event.date).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No hay eventos programados para esta semana
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="month">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mayo 2025</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  <div className="text-center font-medium p-2">Dom</div>
                  <div className="text-center font-medium p-2">Lun</div>
                  <div className="text-center font-medium p-2">Mar</div>
                  <div className="text-center font-medium p-2">Mié</div>
                  <div className="text-center font-medium p-2">Jue</div>
                  <div className="text-center font-medium p-2">Vie</div>
                  <div className="text-center font-medium p-2">Sáb</div>
                  
                  {/* Espacios vacíos para el inicio del mes (si es necesario) */}
                  <div className="border p-2 h-24 opacity-50"></div>
                  <div className="border p-2 h-24 opacity-50"></div>
                  
                  {/* Días del mes */}
                  {generateMonthCalendar()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {events.map(event => (
                <div key={event.id} className={`p-3 rounded border-l-4 ${getEventColor(event.type)} border-l-blue-500`}>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {event.course} • {new Date(event.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Calendar;
