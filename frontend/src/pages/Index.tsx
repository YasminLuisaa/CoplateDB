
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { FeatureCard } from "@/components/feature-card";
import { StatsCard } from "@/components/stats-card";
import { ArrowRight, Upload, Database, Search, Lock, Image, Shield } from "lucide-react";

export default function Index() {
  const [stats] = useState({
    images: "12.453",
    users: "345",
    datasets: "28",
    apiCalls: "250K+",
  });

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-24">
          <div className="container-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                <span className="title-gradient">Plataforma colaborativa</span> para pesquisa em placas veiculares
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Colete, gerencie e compartilhe imagens anonimizadas de placas veiculares para impulsionar a pesquisa em inteligência artificial e reconhecimento ótico de caracteres.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white transition-all" asChild>
                  <Link to="/register">
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="hover:bg-gray-100 transition-all" asChild>
                  <Link to="/about">Saiba mais</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="CoPlateDB Interface" 
                className="rounded-lg shadow-xl w-full max-w-md hover-scale transition-all"
              />
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-12 bg-white">
          <div className="container-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Imagens Coletadas"
                value={stats.images}
                icon={<Image className="h-4 w-4" />}
              />
              <StatsCard
                title="Usuários Ativos"
                value={stats.users}
                icon={<Database className="h-4 w-4" />}
              />
              <StatsCard
                title="Datasets Gerados"
                value={stats.datasets}
                icon={<Shield className="h-4 w-4" />}
              />
              <StatsCard
                title="Chamadas de API"
                value={stats.apiCalls}
                icon={<Search className="h-4 w-4" />}
              />
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="container-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold animate-fade-in">Recursos Principais</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Nossa plataforma combina ferramentas avançadas de coleta e processamento com rigorosos controles de privacidade.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<Upload />}
                title="Upload Simplificado"
                description="Interface intuitiva para upload de imagens de placas veiculares, com suporte a uploads em lote e coleta padronizada de metadados."
              />
              <FeatureCard
                icon={<Lock />}
                title="Privacidade Garantida"
                description="Sistema automático de anonimização de placas veiculares com ferramentas de conformidade com leis de privacidade (LGPD/GDPR)."
              />
              <FeatureCard
                icon={<Database />}
                title="Banco de Dados Estruturado"
                description="Armazenamento eficiente de dados com curadoria profissional e categorização para facilitar pesquisas."
              />
              <FeatureCard
                icon={<Search />}
                title="API Robusta"
                description="Endpoint para converter imagens de placas veiculares em formato JSON estruturado, com documentação completa e controle de acesso."
              />
              <FeatureCard
                icon={<Shield />}
                title="Validação e Curadoria"
                description="Painel administrativo para verificação de dados e sistema de pontuação de qualidade para garantir a integridade da coleção."
              />
              <FeatureCard
                icon={<Image />}
                title="Visualização Avançada"
                description="Ferramentas interativas para explorar, filtrar e analisar a coleção de imagens com métricas detalhadas."
              />
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-brand-dark text-white">
          <div className="container-lg text-center">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">
              Pronto para colaborar?
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Junte-se à nossa comunidade de pesquisadores e contribua para o avanço da visão computacional e reconhecimento de caracteres.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white transition-all" asChild>
                <Link to="/register">Criar uma conta</Link>
              </Button>
              <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white transition-all" asChild>
                <Link to="/login">Entrar na plataforma</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
