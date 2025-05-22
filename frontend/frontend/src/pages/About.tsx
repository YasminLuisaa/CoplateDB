
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Database, Search, Shield, Lock, Upload, ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const principles = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Ciência Aberta",
      description: "Promovemos a colaboração científica e o compartilhamento de dados para avançar o conhecimento coletivo no campo do reconhecimento de placas veiculares."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacidade",
      description: "Priorizamos rigorosos padrões de privacidade e proteção de dados, garantindo anonimização de todas as imagens e conformidade com leis de proteção de dados."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Segurança",
      description: "Implementamos medidas robustas para proteger as informações armazenadas e processadas em nossa plataforma contra acessos não autorizados."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Qualidade",
      description: "Mantemos altos padrões de qualidade por meio de processos de curadoria, validação e classificação rigorosos para todas as imagens."
    }
  ];

  const team = [
    { name: "Ana Silva", role: "Coordenadora de Pesquisa", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
    { name: "Carlos Oliveira", role: "Engenheiro de IA", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
    { name: "Mariana Costa", role: "Cientista de Dados", image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
    { name: "Rafael Santos", role: "Especialista em Privacidade", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="container-lg">
            <PageHeader
              title="Sobre o CoPlateDB"
              description="Uma plataforma colaborativa para impulsionar a pesquisa em reconhecimento de placas veiculares."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
                <p className="text-muted-foreground mb-4">
                  O CoPlateDB nasceu da necessidade de um conjunto de dados robusto e diversificado para treinamento de algoritmos de reconhecimento de placas veiculares. Nossa missão é criar um repositório colaborativo e de alta qualidade que respeite rigorosamente as normas de privacidade.
                </p>
                <p className="text-muted-foreground mb-4">
                  Acreditamos que, ao disponibilizar um banco de dados padronizado e anonimizado, podemos acelerar o desenvolvimento de tecnologias de visão computacional mais precisas e confiáveis, beneficiando diversos setores como segurança, gestão de tráfego e cidades inteligentes.
                </p>
                <Button asChild className="mt-2 bg-brand-orange hover:bg-orange-600 text-white transition-all">
                  <Link to="/register">Junte-se ao projeto</Link>
                </Button>
              </div>
              <div className="flex justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
                  alt="CoPlateDB Interface" 
                  className="rounded-lg shadow-lg w-full max-w-md hover-scale transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold animate-fade-in">Nossos Princípios</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                O CoPlateDB é guiado por valores fundamentais que moldam todas as nossas decisões e operações.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="bg-primary/10 p-3 rounded-full inline-block mb-4">
                    <div className="text-primary">
                      {principle.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold animate-fade-in">Como Funciona</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Nossa plataforma combina contribuição colaborativa, privacidade rigorosa e processamento avançado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="bg-brand-blue/10 p-4 rounded-full inline-block mb-4">
                  <Upload className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Contribuição</h3>
                <p className="text-muted-foreground">
                  Usuários de diversas regiões contribuem com imagens de placas veiculares através de nossa plataforma intuitiva.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="bg-brand-blue/10 p-4 rounded-full inline-block mb-4">
                  <Lock className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Processamento</h3>
                <p className="text-muted-foreground">
                  As imagens são automaticamente anonimizadas e processadas para garantir a conformidade com leis de privacidade.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center hover:shadow-md transition-all duration-300 animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="bg-brand-blue/10 p-4 rounded-full inline-block mb-4">
                  <ImageIcon className="h-6 w-6 text-brand-blue" />
                </div>
                <h3 className="text-xl font-medium mb-2">Utilização</h3>
                <p className="text-muted-foreground">
                  Pesquisadores acessam o banco de dados estruturado para treinar e aprimorar algoritmos de reconhecimento.
                </p>
              </div>
            </div>

            <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button asChild className="bg-brand-orange hover:bg-orange-600 text-white transition-all">
                <Link to="/upload">Começar a contribuir</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container-lg">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold animate-fade-in">Nossa Equipe</h2>
              <p className="text-muted-foreground mt-2 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Conheça os especialistas por trás do CoPlateDB.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div key={index} className="text-center hover-scale transition-all animate-fade-in" style={{ animationDelay: `${0.1 * (index + 3)}s` }}>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-full border-2 border-white shadow-md"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-dark text-white">
          <div className="container-lg text-center">
            <h2 className="text-3xl font-bold mb-4 animate-fade-in">
              Pronto para fazer parte do projeto?
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Contribua com a pesquisa em reconhecimento de placas veiculares e ajude a criar um banco de dados robusto para o avanço da inteligência artificial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white transition-all" asChild>
                <Link to="/register">Criar uma conta</Link>
              </Button>
              <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white transition-all" asChild>
                <Link to="/collection">Explorar a coleção</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
