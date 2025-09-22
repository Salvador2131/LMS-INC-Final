
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { CalendarIcon, UploadIcon } from "lucide-react";

const CreateCourseForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [schedule, setSchedule] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate course creation process
    setTimeout(() => {
      console.log("Create course:", { 
        title, 
        description, 
        category,
        startDate,
        schedule,
        imageFile
      });
      
      setIsLoading(false);
      toast({
        title: "Curso creado",
        description: "El curso ha sido creado exitosamente",
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory("");
      setStartDate("");
      setSchedule("");
      setImageFile(null);
      setImagePreview(null);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Crear Nuevo Curso</CardTitle>
        <CardDescription>
          Completa el formulario para crear un nuevo curso
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título del Curso *</Label>
            <Input
              id="title"
              type="text"
              placeholder="Ej: Matemáticas Avanzadas"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descripción *</Label>
            <Textarea
              id="description"
              placeholder="Describe el contenido y objetivos del curso"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Categoría *</Label>
            <Select
              value={category}
              onValueChange={setCategory}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matematicas">Matemáticas</SelectItem>
                <SelectItem value="ciencias">Ciencias</SelectItem>
                <SelectItem value="historia">Historia</SelectItem>
                <SelectItem value="literatura">Literatura</SelectItem>
                <SelectItem value="idiomas">Idiomas</SelectItem>
                <SelectItem value="tecnologia">Tecnología</SelectItem>
                <SelectItem value="artes">Artes</SelectItem>
                <SelectItem value="otros">Otros</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Fecha de Inicio</Label>
              <div className="relative">
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="schedule">Horario</Label>
              <Input
                id="schedule"
                type="text"
                placeholder="Ej: Lunes y Miércoles, 15:00-17:00"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Imagen de Portada</Label>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image")?.click()}
                  className="cursor-pointer"
                >
                  <UploadIcon className="h-4 w-4 mr-2" />
                  Subir Imagen
                </Button>
                <span className="text-sm text-muted-foreground">
                  {imageFile ? imageFile.name : "Ningún archivo seleccionado"}
                </span>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              
              {imagePreview && (
                <div className="relative h-40 w-full max-w-md border rounded-md overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Creando curso..." : "Crear Curso"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          * Campos obligatorios
        </p>
      </CardFooter>
    </Card>
  );
};

export default CreateCourseForm;
