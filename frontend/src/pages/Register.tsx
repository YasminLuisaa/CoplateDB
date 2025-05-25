import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "@/components/logo";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("researcher");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    if (!acceptTerms) {
      toast({
        title: "Erro de validação",
        description: "Você precisa aceitar os termos de serviço.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      toast({
        title: "Registro simulado",
        description: "Em uma implementação real, sua conta seria criada agora.",
      });
      setIsLoading(false);
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
              <h1 className="text-2xl font-bold">Criar sua conta</h1>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Cadastre-se</CardTitle>
                <CardDescription>
                  Crie sua conta para colaborar com o projeto CoPlateDB.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="João Silva"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="userType">Tipo de usuário</Label>
                    <Select
                      value={userType}
                      onValueChange={setUserType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo de usuário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="researcher">Pesquisador</SelectItem>
                        <SelectItem value="contributor">Colaborador</SelectItem>
                        <SelectItem value="developer">Desenvolvedor de IA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) => 
                        setAcceptTerms(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Eu li e aceito os{" "}
                      <Link to="/terms" className="text-brand-blue hover:underline">
                        termos de serviço
                      </Link>{" "}
                      e a{" "}
                      <Link to="/privacy" className="text-brand-blue hover:underline">
                        política de privacidade
                      </Link>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Criando conta..." : "Criar conta"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link to="/login" className="text-brand-blue hover:underline">
                    Entrar
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
