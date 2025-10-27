import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { registerUser, UserRole } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>("estudiante");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Las contraseñas no coinciden",
        description: "Por favor verifica que ambas contraseñas sean iguales",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 8) {
      toast({
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 8 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const user = await registerUser(email, password, name, role);

      if (user) {
        console.log("Registration successful:", { email, role: user.role });
        toast({
          title: "Registro exitoso",
          description: `Bienvenido a Aorus INC, ${user.name}`,
        });

        // Redirección al dashboard
        navigate("/dashboard");
      } else {
        console.log("Registration failed:", { email });
        toast({
          title: "Error en el registro",
          description: "No se pudo crear la cuenta. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error en el registro",
        description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-center">
          Regístrate para acceder a Aurum INC
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre Completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Tipo de Usuario</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona tu rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="estudiante">Estudiante</SelectItem>
                <SelectItem value="profesor">Profesor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4" />
                ) : (
                  <EyeIcon className="h-4 w-4" />
                )}
                <span className="sr-only">
                  {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                </span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Creando cuenta..." : "Registrarse"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <div className="text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-primary hover:underline">
            Iniciar Sesión
          </a>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;
