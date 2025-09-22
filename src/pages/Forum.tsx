
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import CreatePostForm from "@/components/forum/CreatePostForm";
import ForumPost from "@/components/forum/ForumPost";

const Forum = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  
  // Mock data for forum posts
  const recentPosts = [
    {
      id: "1",
      author: {
        name: "Carlos Mendoza",
        role: "Profesor",
      },
      title: "Bienvenidos al curso de Matemáticas Avanzadas",
      content: "Estimados estudiantes, les doy la bienvenida al curso de Matemáticas Avanzadas. En este foro podremos discutir todos los temas relacionados con el curso, resolver dudas y compartir recursos adicionales. No duden en participar activamente.",
      date: "15/05/2025",
      likes: 12,
      replies: 5,
    },
    {
      id: "2",
      author: {
        name: "Laura Martínez",
        role: "Estudiante",
      },
      title: "Duda sobre ecuaciones diferenciales",
      content: "Hola a todos, estoy teniendo problemas para resolver las ecuaciones diferenciales de primer orden. ¿Alguien podría explicarme el método de factores integrantes con algún ejemplo práctico? Gracias de antemano.",
      date: "16/05/2025",
      likes: 4,
      replies: 3,
    },
    {
      id: "3",
      author: {
        name: "Miguel Rodríguez",
        role: "Estudiante",
      },
      title: "Recursos adicionales para cálculo vectorial",
      content: "He encontrado unos videos en YouTube que explican muy bien los conceptos de cálculo vectorial. Creo que pueden ser útiles para repasar antes del examen parcial. Los comparto con ustedes: [links]",
      date: "16/05/2025",
      likes: 8,
      replies: 2,
    }
  ];
  
  const myPosts = [
    {
      id: "4",
      author: {
        name: "Miguel Rodríguez",
        role: "Estudiante",
      },
      title: "Recursos adicionales para cálculo vectorial",
      content: "He encontrado unos videos en YouTube que explican muy bien los conceptos de cálculo vectorial. Creo que pueden ser útiles para repasar antes del examen parcial. Los comparto con ustedes: [links]",
      date: "16/05/2025",
      likes: 8,
      replies: 2,
      liked: true,
    }
  ];

  const handleCreatePostSuccess = () => {
    setShowCreatePost(false);
    // In a real app, we would refresh the posts or add the new post to the list
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Foro de Discusión</h1>
        
        <Button 
          className="bg-kampus-primary hover:bg-blue-600"
          onClick={() => setShowCreatePost(!showCreatePost)}
        >
          {showCreatePost ? (
            "Cancelar"
          ) : (
            <>
              <PlusIcon className="h-4 w-4 mr-2" />
              Nueva Publicación
            </>
          )}
        </Button>
      </div>
      
      {showCreatePost && (
        <div className="mb-8">
          <CreatePostForm onSuccess={handleCreatePostSuccess} />
        </div>
      )}
      
      {/* Search and filter controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar en el foro..." 
            className="pl-9"
          />
        </div>
        
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Curso" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los cursos</SelectItem>
              <SelectItem value="math">Matemáticas Avanzadas</SelectItem>
              <SelectItem value="history">Historia Universal</SelectItem>
              <SelectItem value="programming">Programación en Python</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="recent">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Más recientes</SelectItem>
              <SelectItem value="popular">Más populares</SelectItem>
              <SelectItem value="active">Más activos</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Tabs defaultValue="recent">
        <TabsList className="mb-6">
          <TabsTrigger value="recent">Recientes</TabsTrigger>
          <TabsTrigger value="my-posts">Mis Publicaciones</TabsTrigger>
          <TabsTrigger value="following">Siguiendo</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent">
          <div className="space-y-4">
            {recentPosts.map(post => (
              <ForumPost key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="my-posts">
          <div className="space-y-4">
            {myPosts.map(post => (
              <ForumPost key={post.id} post={post} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="following">
          <div className="text-center py-10">
            <p className="text-muted-foreground">
              No estás siguiendo ninguna discusión actualmente.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Forum;
