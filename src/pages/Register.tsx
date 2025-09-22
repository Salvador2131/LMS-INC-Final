
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simple header */}
      <header className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <Link to="/" className="text-2xl font-bold text-kampus-primary">
            KampusPlus
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <RegisterForm />
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              Al registrarte, aceptas nuestros{" "}
              <a href="#" className="text-kampus-primary hover:underline">
                Términos de Servicio
              </a>{" "}
              y{" "}
              <a href="#" className="text-kampus-primary hover:underline">
                Política de Privacidad
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 KampusPlus. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Register;
