import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Mail, Github } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  github: string;
  lattes: string;
  bio: string;
  image: string;
}

const teamMembers: Record<string, TeamMember> = {  "yasmin-lourenco": {
    id: "yasmin-lourenco",
    name: "Yasmin Luísa Gomes Lourenço",
    role: "Desenvolvedora Frontend/Backend",
    email: "yasmin.luisa@aluno.ifsp.edu.br",
    github: "https://github.com/yasminluisaa",
    lattes: "https://lattes.cnpq.br/9888061274914434",
    bio: "Sou desenvolvedora full-stack apaixonada por transformar ideias em soluções inovadoras. Atualmente curso Engenharia de Computação no IFSP e também possuo formação técnica em Química, o que ampliou minha visão analítica e atenção aos detalhes. Tenho foco em desenvolvimento web e atuo na criação de interfaces modernas, responsivas e acessíveis, além de desenvolver APIs RESTful eficientes e bem estruturadas.",
    image: "/Images/yasmin.jpeg"
  },
  "giovanna-pedao": {
    id: "giovanna-pedao",
    name: "Giovanna de Oliveira Pedão",
    role: "Desenvolvedora Backend",
    email: "giovanna.pedao@aluno.ifsp.edu.br",
    github: "https://github.com/G1op",
    lattes: "http://lattes.cnpq.br/6817273514624848",
    bio: "Sou estudante do 9º semestre de Engenharia da Computação, com forte interesse na área de desenvolvimento backend. Tenho experiência com C++, Python e bancos de dados relacionais, além de afinidade com lógica de programação, estrutura de dados e arquitetura de sistemas. Busco constantemente aprimorar meus conhecimentos por meio de projetos práticos e estudo contínuo.",
    image: "/Images/Giovanna.jpeg"
  },
  "helen-santos": {
    id: "helen-santos",
    name: "Helen de Freitas Santos",
    role: "Orientadora",
    email: "helen@ifsp.edu.br",
    github: "https://github.com/helensantos",
    lattes: "http://lattes.cnpq.br/4144138821262565",
    bio: "Doutorado em Ciência da Computação na Universidade Federal de São Carlos-SP (2019), Mestrado em Ciência da Computação pela Universidade Federal de São Carlos-SP (2009), Graduação em Sistema para Faculdade de Direito de Araraquara (1995), Graduação em Matemática pela Faculdade de Administração de Empresas de Araçatuba (1992), Graduada em Tecnólogo em Processamento de Dados pela Universidade Estadual de Maringá (1985). Realizou Pós-Doutorado na UFSCar (2022-2023) onde trabalhou com a Avaliação de Usabilidade do Software de Gestão Pedagógica e Acadêmica para Cursos baseados em Metodologias Ativas de Aprendizagem. Atua nos seguintes temas: avaliação de usabilidade, ciência cidadã, realidade aumentada e virtual, inteligência artificial, processamento de linguagem natural, aprendizagem de máquina, aplicações web, banco de dados, Oracle e Apex, ambiente de ensino aprendizagem, ensino de programação para crianças, uso de tecnologias de realidade aumentada no ambiente de ensino aprendizagem, participação cidadã, laboratório vivo e compostagem em atuação com a tecnologia.",
    image: "/Images/helen_foto.jpg"
  },
  "lourenco-pereira": {
    id: "lourenco-pereira",
    name: "Lourenço Henrique Neves Pereira",
    role: "Colaborador de Desenvolvimento",
    email: "lourenco.pereira@aluno.ifsp.edu.br",
    github: "https://github.com/Lourencohn",
    lattes: "http://lattes.cnpq.br/9234567123456789",
    bio: "Engenheiro da Computação em formação (IFSP) apaixonado por criar soluções tecnológicas modernas e eficientes. Com experiência no desenvolvimento mobile, web e desktop, atuo na criação de aplicações multiplataforma com foco em arquitetura limpa e boas práticas de código.\n\nAtualmente sou estagiário no Desenvolvimento Mobile na Trovata, onde trabalho constantemente com Kotlin para desenvolvimento de aplicativos multiplataforma, além de atuar em projetos web utilizando React, TypeScript e PHP, e desenvolver aplicações desktop em C#.\n\n💡 Principais Habilidades & Tecnologias:\n\n✅ Desenvolvimento Frontend com React, TypeScript e Vite\n✅ Desenvolvimento Mobile com Kotlin\n✅ Aplicações Web com PHP (Laravel) e JavaScript\n✅ Desenvolvimento Desktop com C#\n✅ Frontend & Backend (Full Stack Developer)\n✅ Experiência com Python e frameworks para análise de dados e IA\n✅ Arquitetura de Software e Padrões de Projeto\n✅ Metodologias Ágeis (Scrum e Kanban)\n✅ Versionamento e Colaboração com Git\n✅ UI/UX Design com Figma",
    image: "/Images/lourenço.jpeg"
  },
  "gustavo-nantes": {
    id: "gustavo-nantes",
    name: "Gustavo de Assis Nantes",
    role: "Colaborador de Feedback",
    email: "gustavo.nantes@aluno.ifsp.edu.br",
    github: "https://github.com/gustavonantes",
    lattes: "http://lattes.cnpq.br/6543219876543210",
    bio: "Estudante de Engenharia de Computação no IFSP, dedicado à melhoria contínua de sistemas através de feedback e testes. Especializado em testes de usabilidade e experiência do usuário, com foco na qualidade e acessibilidade das aplicações. Atualmente envolvido na validação e aprimoramento das interfaces do CoPlateDB.",
    image: "/Images/Colab.png"
  },
  "jose-castilho": {
    id: "jose-castilho",
    name: "José Augusto Cenci Castilho",
    role: "Colaborador de Feedback",
    email: "jose.castilho@aluno.ifsp.edu.br",
    github: "https://github.com/josecastilho",
    lattes: "http://lattes.cnpq.br/3456789012345678",
    bio: "Estudante de Engenharia de Computação no IFSP com especialização em análise e teste de software. Contribui ativamente com feedback para melhorar a experiência do usuário e a qualidade geral do sistema. Possui experiência em metodologias ágeis e práticas de desenvolvimento centrado no usuário.",
    image: "/Images/Colab.png"
  },
  "jose-gomes": {
    id: "jose-gomes",
    name: "José Victor de Souza Gomes",
    role: "Colaborador de Feedback",
    email: "jose.gomes@aluno.ifsp.edu.br",
    github: "https://github.com/josegomes",
    lattes: "http://lattes.cnpq.br/8901234567890123",
    bio: "Estudante de Engenharia de Computação no IFSP, comprometido com a qualidade de software e experiência do usuário. Especializado em testes de usabilidade e feedback de usuário, contribuindo ativamente para a melhoria contínua da plataforma CoPlateDB. Possui interesse em interfaces intuitivas e acessibilidade digital.",
    image: "/Images/Colab.png"
  }
};

export default function TeamMemberProfile() {
  const { id } = useParams<{ id: string }>();
  const member = id ? teamMembers[id] : null;
  if (!member) {
    return (
      <div className="flex flex-col min-h-screen">
        <MainNav />
        <main className="flex-1 py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Membro não encontrado</h2>
              <p className="text-gray-600 mb-8">O perfil que você está procurando não existe ou foi removido.</p>
              <Button asChild>
                <Link to="/about">Voltar para a página da equipe</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <PageHeader
            title={member.name}
            description={member.role}
          />

          <div className="grid gap-8 mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="w-full md:w-1/3">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>                  <div className="w-full md:w-2/3 space-y-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center space-x-3">
                        <Mail className="w-5 h-5 text-blue-600" />
                        <a
                          href={`mailto:${member.email}`}
                          className="text-blue-600 hover:underline"
                        >
                          {member.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Github className="w-5 h-5 text-blue-600" />
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          GitHub Profile
                        </a>
                      </div>

                      <div className="flex items-center space-x-3">
                        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        <a
                          href={member.lattes}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Currículo Lattes
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Biografia</h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-600 text-lg whitespace-pre-wrap">{member.bio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
