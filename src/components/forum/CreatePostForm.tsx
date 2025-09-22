
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface CreatePostFormProps {
  onSuccess?: () => void;
}

const CreatePostForm = ({ onSuccess }: CreatePostFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate post creation
    setTimeout(() => {
      console.log("Create post:", { title, content });
      
      setIsLoading(false);
      toast({
        title: "Publicación creada",
        description: "Tu publicación ha sido creada exitosamente",
      });
      
      // Reset form
      setTitle("");
      setContent("");
      
      // Callback
      if (onSuccess) {
        onSuccess();
      }
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Nueva Publicación</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Escribe un título para tu publicación"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Contenido</Label>
            <Textarea
              id="content"
              placeholder="Escribe el contenido de tu publicación"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          className="bg-kampus-primary hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? "Publicando..." : "Publicar"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostForm;
