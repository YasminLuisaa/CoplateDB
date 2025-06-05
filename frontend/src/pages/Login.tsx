import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/logo";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      // Simular autenticação
      localStorage.setItem("token", "fake-token");
      localStorage.setItem("userName", email.split("@")[0]);
      localStorage.setItem("userEmail", email);
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      setIsLoading(false);
      
      // Redirecionar para a página solicitada ou para contribuição
      const redirectTo = searchParams.get('redirect') || '/upload-contribuicao';
      navigate(redirectTo);
    }, 1000);
  };

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: "url('/background.jpg')" }}>
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-1 py-16 flex items-center justify-center bg-gray-50">
          <div className="w-full max-w-md px-4">
            <div className="mb-8 text-center">
              <Logo className="mx-auto mb-2" />
              <h1 className="text-2xl font-bold">Entrar na plataforma</h1>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Bem-vindo novamente</CardTitle>
                <CardDescription>
                  Entre com seus dados para acessar sua conta.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Senha</Label>
                      <Link
                        to="/forgot-password"
                        className="text-sm text-brand-blue hover:underline"
                      >
                        Esqueceu a senha?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link to="/register" className="text-brand-blue hover:underline">
                    Registre-se
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
