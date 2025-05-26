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
    { name: "Yasmin L.G. Lourenço", role: "Desenvolvedora Frontend/Backend", image: "/Images/Colab.png" },
    { name: "Giovanna de O. Pedão", role: "Desenvolvedora Backend", image: "/Images/Colab.png" },
    { name: "Helen de F. Santos", role: "Orientadora", image: "/Images/Colab.png" },
    { name: "Lourenço H.N. Pereira", role: "Colaborador de Desenvolvimento", image: "/Images/Colab.png" },
    { name: "Gustavo de A. Nantes", role: "Colaboradores com Feedback", image: "/Images/Colab.png" },
    { name: "José A.C. Castilho", role: "Colaboradores com Feedback", image: "/Images/Colab.png" },
    { name: "José V. de S. Gomes", role: "Colaboradores com Feedback", image: "/Images/Colab.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-white to-gray-50 py-16">
          <div className="container-lg">
            <PageHeader
              title="Sobre o CoPlateDB"
              description="O CoPlateDB é uma plataforma aberta e colaborativa destinada à criação coletiva de uma extensa base de dados de imagens de placas veiculares. O projeto surge para solucionar a falta de datasets amplos, diversificados e acessíveis, cruciais para o treinamento e avaliação de algoritmos de Inteligência Artificial no Reconhecimento Automático de Placas Veiculares.

A plataforma permite a coleta colaborativa de imagens através de uma interface web intuitiva, com padronização de metadados e rigorosos processos de anonimização em conformidade com a LGPD. Uma funcionalidade central é sua API, que converte imagens de placas para formatos estruturados (JSON), facilitando a integração com sistemas de IA e OCR e democratizando o acesso aos dados. Processos de curadoria e validação garantem a integridade e qualidade do repositório.

O CoPlateDB visa impulsionar a pesquisa científica ao fornecer dados abertos e diversificados, permitindo o desenvolvimento de algoritmos mais robustos. Além disso, tem potencial para aplicações práticas em segurança pública, mobilidade urbana e logística. Inspirado em modelos de Ciência Aberta como ImageNet, o projeto utiliza tecnologias modernas e busca criar um ecossistema sustentável para futuras inovações em Visão Computacional e Inteligência Artificial aplicada à mobilidade urbana."
            />
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
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white transition-all" asChild>
                <Link to="/contribuir">Contribuir com o banco de dados</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
