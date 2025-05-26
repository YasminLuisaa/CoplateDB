import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Database, Search, Shield, Lock, Users, Code, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const principles = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Ciência Aberta",
      description: "Promovemos a colaboração científica e o compartilhamento de dados para avançar o conhecimento coletivo."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacidade",
      description: "Garantimos anonimização e conformidade com leis de proteção de dados em todas as etapas."
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Segurança",
      description: "Protegemos suas informações com medidas robustas contra acessos não autorizados."
    },
    {
      icon: <Search className="h-6 w-6" />,
      title: "Qualidade",
      description: "Mantemos rigorosos processos de curadoria e validação para todas as imagens."
    }
  ];

  const team = [
    { name: "Yasmin L.G. Lourenço", role: "Desenvolvedora Frontend/Backend", image: "/Images/Colab.png" },
    { name: "Giovanna de O. Pedão", role: "Desenvolvedora Backend", image: "/Images/Colab.png" },
    { name: "Helen de F. Santos", role: "Orientadora", image: "/Images/Colab.png" },
    { name: "Lourenço H.N. Pereira", role: "Colaborador de Desenvolvimento", image: "/Images/Colab.png" },
    { name: "Gustavo de A. Nantes", role: "Colaborador de Feedback", image: "/Images/Colab.png" },
    { name: "José A.C. Castilho", role: "Colaborador de Feedback", image: "/Images/Colab.png" },
    { name: "José V. de S. Gomes", role: "Colaborador de Feedback", image: "/Images/Colab.png" },

  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <MainNav />
      
      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <PageHeader
              title="Sobre o CoPlateDB"
              description="Uma plataforma colaborativa para criação de uma base de dados de placas veiculares, impulsionando pesquisas em Inteligência Artificial e Reconhecimento Automático."
            />
            
            <div className="mt-8 prose prose-blue max-w-none">
              <p className="text-lg text-gray-700 leading-relaxed">
                O CoPlateDB surge para resolver a escassez de datasets diversificados e acessíveis na área de reconhecimento de placas veiculares. 
                Nossa plataforma possibilita a coleta colaborativa de imagens através de uma interface intuitiva, garantindo a padronização 
                e anonimização dos dados em conformidade com a LGPD.
              </p>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Nossos Princípios
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Valores fundamentais que guiam nosso trabalho e compromisso com a comunidade científica.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {principles.map((principle, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg border border-gray-100"
                >
                  <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <div className="text-blue-600">
                      {principle.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{principle.title}</h3>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Nossa Equipe
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Profissionais dedicados ao desenvolvimento e evolução do CoPlateDB.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 text-center transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Info Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Technologies */}
              <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Code className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Tecnologias</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-gray-600">
                      <strong className="text-gray-900 block">Python 3.8+</strong>
                      Processamento e reconhecimento de imagens
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600">
                      <strong className="text-gray-900 block">React + TypeScript</strong>
                      Interface moderna e responsiva
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600">
                      <strong className="text-gray-900 block">Flask + OpenCV</strong>
                      Backend robusto e processamento de imagens
                    </span>
                  </li>
                </ul>
              </div>

              {/* Project Details */}
              <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Detalhes</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-gray-600">
                      <strong className="text-gray-900 block">Versão:</strong>
                      1.2.0 (Maio 2025)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600">
                      <strong className="text-gray-900 block">Licença:</strong>
                      MIT
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-600">
                      <strong className="text-gray-900 block">Instituição:</strong>
                      IFSP - Campus Birigui
                    </span>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Mail className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Contato</h3>
                </div>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="mailto:coplatedb@gmail.com"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      coplatedb@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/yasminluisaa"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-b from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">
              Faça Parte do Projeto
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Contribua com nossa base de dados e ajude a impulsionar o desenvolvimento 
              de tecnologias de reconhecimento de placas veiculares.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 transition-all"
                asChild
              >
                <Link to="/register">Criar Conta</Link>
              </Button>
              <Button
                size="lg"
                className="bg-blue-500 text-white hover:bg-blue-400 transition-all"
                asChild
              >
                <Link to="/contribuir">Contribuir</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
