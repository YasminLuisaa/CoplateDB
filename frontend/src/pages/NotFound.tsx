
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-16 flex items-center justify-center bg-gray-50">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-brand-blue mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Página não encontrada</p>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <Button asChild>
            <a href="/">Voltar para a página inicial</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
