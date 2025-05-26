import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { FeatureCard } from "@/components/feature-card";
import { StatsCard } from "@/components/stats-card";
import { ArrowRight, Upload, Database, Search, Lock, Image, Shield } from "lucide-react";
import { MercosulPlate } from "@/components/mercosul-plate";

export default function Index() {
  const [stats] = useState({
    images: "12.453",
    users: "345",
    datasets: "28",
    apiCalls: "250K+",
  });

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#eaf2fc' }}>
      <MainNav />
      <main className="flex-1">        {/* Hero section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-blue-900 to-blue-800" style={{ backgroundColor: '#1e40af' }}>
          <div className="container-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-white">
            <div className="order-2 md:order-1">              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                <span className="title-gradient text-blue-300">Plataforma colaborativa</span> <span className="text-white">para pesquisa em placas veiculares</span>
              </h1><p className="text-lg text-blue-100 mb-8 max-w-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Colete, gerencie e compartilhe imagens anonimizadas de placas veiculares para impulsionar a pesquisa em inteligência artificial e reconhecimento ótico de caracteres.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>                
                <Button size="lg" className="bg-yellow-500 hover:bg-blue-400 text-gray-900 transition-all" asChild>
                  <Link to="/register">
                    Começar agora
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-gray-900 hover:bg-blue-300 transition-all" asChild>
                  <Link to="/about">Saiba mais</Link>
                </Button>
              </div>
            </div>            <div className="order-1 md:order-2 flex justify-center animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <MercosulPlate text="ABC1D23" />
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-12" style={{ backgroundColor: '#eaf2fc' }}>
          <div className="container-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="IMAGENS COLETADAS"
                value={stats.images}
                description="Imagens de placas veiculares processadas"
                icon={<Image className="h-5 w-5" />}
              />
              <StatsCard
                title="USUÁRIOS ATIVOS"
                value={stats.users}
                description="Pesquisadores e colaboradores"
                icon={<Database className="h-5 w-5" />}
              />
              <StatsCard
                title="DATASETS GERADOS"
                value={stats.datasets}
                description="Conjuntos de dados disponibilizados"
                icon={<Shield className="h-5 w-5" />}
              />
              <StatsCard
                title="CHAMADAS DE API"
                value={stats.apiCalls}
                description="Requisições processadas por mês"
                icon={<Search className="h-5 w-5" />}
              />
            </div>
          </div>
        </section>

 {/* Nossa Missão section */}
<section className="py-16" style={{ backgroundColor: '#eaf2fc' }}>
  <div className="container-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
    <div>
      <h2 className="text-3xl font-bold text-blue-800">Nossa Missão</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        O CoPlateDB surge como resposta a uma lacuna crítica no desenvolvimento de algoritmos de reconhecimento de placas veiculares: 
        a escassez de conjuntos de dados robustos, diversificados e acessíveis.
      </p>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        Nossa missão é democratizar o acesso a dados de qualidade, criando um repositório colaborativo que respeite 
        rigorosamente as normas de privacidade e impulsione a inovação na área de visão computacional.
      </p>
    </div>
    <div className="flex justify-center">      <img
        src="/Images/mercosul-placas.jpg"    
        alt="Sistema de reconhecimento de placas veiculares com tecnologia AI"
        className="rounded-lg shadow-xl w-full max-w-md hover-scale transition-all"
      />
    </div>
  </div>
</section>

{/* O Problema que Resolvemos section */}
<section className="py-16" style={{ backgroundColor: '#f8fafc' }}>
  <div className="container-lg">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-blue-800 mb-2">O Problema que Resolvemos</h2>
      <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
        As bases de dados existentes apresentam limitações significativas que comprometem o avanço da pesquisa
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-red-500 text-2xl mb-4">🔒</div>
        <h3 className="font-bold text-gray-800 mb-2">Barreiras de Acesso</h3>
        <p className="text-sm text-muted-foreground">
          Repositórios proprietários com acesso restrito, processos burocráticos complexos e limitações de redistribuição
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-orange-500 text-2xl mb-4">🌍</div>
        <h3 className="font-bold text-gray-800 mb-2">Diversidade Limitada</h3>
        <p className="text-sm text-muted-foreground">
          Concentração geográfica restrita, variabilidade insuficiente de condições ambientais e climáticas
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-yellow-500 text-2xl mb-4">🔬</div>
        <h3 className="font-bold text-gray-800 mb-2">Inadequação para Pesquisa</h3>
        <p className="text-sm text-muted-foreground">
          Licenciamento fechado, falta de padronização e ausência de mecanismos de validação colaborativa
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-purple-500 text-2xl mb-4">🎯</div>
        <h3 className="font-bold text-gray-800 mb-2">Baixa Generalização</h3>
        <p className="text-sm text-muted-foreground">
          Algoritmos com performance inadequada em cenários reais diversos e vieses regionais
        </p>
      </div>
    </div>
  </div>
</section>

{/* Nossa Solução section */}
<section className="py-16" style={{ backgroundColor: '#eaf2fc' }}>
  <div className="container-lg grid grid-cols-1 md:grid-cols-2 gap-8 items-center">    <div className="flex justify-center">
      <img
        src="/Images/Colab.png"
        alt="Plataforma colaborativa de dados abertos para IA"
        className="rounded-lg shadow-xl w-full max-w-md hover-scale transition-all"
      />
    </div>
    <div>
      <h2 className="text-3xl font-bold text-blue-800">Nossa Solução</h2>
      <p className="text-muted-foreground mt-4 max-w-2xl">
        O CoPlateDB é uma <strong>plataforma aberta e colaborativa</strong> que oferece:
      </p>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-start gap-3">
          <div className="text-green-500 text-xl">🔓</div>
          <div>
            <h4 className="font-semibold text-gray-800">Acesso Democrático</h4>
            <p className="text-sm text-muted-foreground">Base de dados completamente aberta com API padronizada</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="text-blue-500 text-xl">🌍</div>
          <div>
            <h4 className="font-semibold text-gray-800">Diversidade Ampla</h4>
            <p className="text-sm text-muted-foreground">Coleta colaborativa de múltiplas regiões e condições ambientais</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="text-purple-500 text-xl">🛡️</div>
          <div>
            <h4 className="font-semibold text-gray-800">Privacidade Garantida</h4>
            <p className="text-sm text-muted-foreground">Conformidade total com LGPD, GDPR e anonimização rigorosa</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3">
          <div className="text-orange-500 text-xl">⚡</div>
          <div>
            <h4 className="font-semibold text-gray-800">Padronização e Qualidade</h4>
            <p className="text-sm text-muted-foreground">Metadados estruturados e mecanismos de validação automática</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Impacto Esperado section */}
<section className="py-16" style={{ backgroundColor: '#f8fafc' }}>
  <div className="container-lg text-center">
    <h2 className="text-3xl font-bold text-blue-800 mb-2">Impacto Esperado</h2>
    <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
      Ao disponibilizar um banco de dados padronizado, diversificado e eticamente responsável, o CoPlateDB tem potencial para transformar múltiplos setores
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-4xl mb-4">🚗</div>
        <h3 className="font-bold text-gray-800 mb-2">Mobilidade Urbana</h3>
        <p className="text-sm text-muted-foreground">
          Sistemas inteligentes de gestão de tráfego e cidades conectadas
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-4xl mb-4">🛡️</div>
        <h3 className="font-bold text-gray-800 mb-2">Segurança Pública</h3>
        <p className="text-sm text-muted-foreground">
          Sistemas de monitoramento e identificação veicular mais precisos
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-4xl mb-4">🔬</div>
        <h3 className="font-bold text-gray-800 mb-2">Pesquisa Científica</h3>
        <p className="text-sm text-muted-foreground">
          Democratização do acesso a dados para desenvolvimento de IA
        </p>
      </div>
    </div>
  </div>
</section>

{/* Como Funciona section */}
<section className="py-16" style={{ backgroundColor: '#eaf2fc' }}>
  <div className="container-lg">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-blue-800">Como Sua Contribuição Vira Ciência</h2>
      <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
        Nosso sistema oferece um fluxo simples e transparente para colaboração, garantindo qualidade e consistência nos dados coletados.
      </p>
    </div>
    
    <div className="grid grid-cols-1 gap-6">
      <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-6">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-800 text-white font-bold rounded-full flex-shrink-0">1</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Contribuição de Imagens</h3>
          <p className="text-muted-foreground">
            Instituições de ensino, pesquisadores e colaboradores individuais podem enviar imagens de placas veiculares através da interface web. O sistema realiza uma primeira verificação de qualidade e solicita metadados relevantes.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-6">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-800 text-white font-bold rounded-full flex-shrink-0">2</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Anonimização Automática</h3>
          <p className="text-muted-foreground">
            Após o upload, o sistema aplica técnicas de anonimização para proteger dados sensíveis, garantindo conformidade com as normas de privacidade e proteção de dados, como a LGPD.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-6">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-800 text-white font-bold rounded-full flex-shrink-0">3</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Validação e Curadoria</h3>
          <p className="text-muted-foreground">
            Todas as imagens passam por um processo de validação que assegura a qualidade e a integridade dos dados. Esta etapa garante que apenas dados relevantes e bem formatados sejam incluídos na base.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-6">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-800 text-white font-bold rounded-full flex-shrink-0">4</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Armazenamento Estruturado</h3>
          <p className="text-muted-foreground">
            Os dados validados são armazenados em formato estruturado junto com seus metadados, facilitando a recuperação e a utilização para treinamento de algoritmos de inteligência artificial.
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 bg-white shadow-md rounded-lg p-6">
        <div className="w-10 h-10 flex items-center justify-center bg-blue-800 text-white font-bold rounded-full flex-shrink-0">5</div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Aplicação em Pesquisa</h3>
          <p className="text-muted-foreground">
            Pesquisadores podem utilizar a API ou fazer download dos datasets para treinar e validar algoritmos de reconhecimento de placas, contribuindo para avanços na área de visão computacional e reconhecimento óptico de caracteres.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Objetivos da Pesquisa section */}
<section className="py-16" style={{ backgroundColor: '#f8fafc' }}>
  <div className="container-lg">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-blue-800 mb-2">Objetivos da Pesquisa</h2>
      <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
        Nossa iniciativa busca impulsionar o desenvolvimento científico e tecnológico na área de visão computacional aplicada.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-5xl font-bold text-blue-500 mb-4">01</div>
        <h3 className="text-xl font-bold text-gray-800">Ciência Aberta e Colaborativa</h3>
        <p className="text-muted-foreground">
          Fomentar a colaboração entre instituições de ensino, pesquisadores e desenvolvedores, criando um ecossistema aberto para avanços na pesquisa científica.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-5xl font-bold text-blue-500 mb-4">02</div>
        <h3 className="text-xl font-bold text-gray-800">Avanços em Visão Computacional</h3>
        <p className="text-muted-foreground">
          Impulsionar o desenvolvimento de algoritmos mais precisos e eficientes para o reconhecimento de placas veiculares em diferentes condições ambientais.
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="text-5xl font-bold text-blue-500 mb-4">03</div>
        <h3 className="text-xl font-bold text-gray-800">Padronização e Conformidade</h3>
        <p className="text-muted-foreground">
          Estabelecer padrões para a coleta, anonimização e utilização responsável de dados sensíveis, garantindo o respeito à privacidade e às diretrizes legais.
        </p>
      </div>
    </div>
  </div>
</section>

{/* Features section */}
<section className="py-16" style={{ backgroundColor: '#eaf2fc' }}>
  <div className="container-lg">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-blue-800">Recursos Principais</h2>
      <p className="text-muted-foreground mt-4 max-w-3xl mx-auto">
        Nossa plataforma combina ferramentas avançadas de coleta e processamento com rigorosos controles de privacidade.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-blue-500 text-2xl mb-4">📤</div>
        <h3 className="font-bold text-gray-800 mb-2">Upload Simplificado</h3>
        <p className="text-sm text-muted-foreground">
          Interface intuitiva para upload de imagens de placas veiculares, com suporte a uploads em lote e coleta padronizada de metadados.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-green-500 text-2xl mb-4">🔒</div>
        <h3 className="font-bold text-gray-800 mb-2">Privacidade Garantida</h3>
        <p className="text-sm text-muted-foreground">
          Sistema automático de anonimização de placas veiculares com ferramentas de conformidade com leis de privacidade (LGPD/GDPR).
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-purple-500 text-2xl mb-4">🗃️</div>
        <h3 className="font-bold text-gray-800 mb-2">Banco de Dados Estruturado</h3>
        <p className="text-sm text-muted-foreground">
          Armazenamento eficiente de dados com curadoria profissional e categorização para facilitar pesquisas.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-orange-500 text-2xl mb-4">🔍</div>
        <h3 className="font-bold text-gray-800 mb-2">API Robusta</h3>
        <p className="text-sm text-muted-foreground">
          Endpoint para converter imagens de placas veiculares em formato JSON estruturado, com documentação completa e controle de acesso.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-red-500 text-2xl mb-4">🛡️</div>
        <h3 className="font-bold text-gray-800 mb-2">Validação e Curadoria</h3>
        <p className="text-sm text-muted-foreground">
          Painel administrativo para verificação de dados e sistema de pontuação de qualidade para garantir a integridade da coleção.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-cyan-500 text-2xl mb-4">🖼️</div>
        <h3 className="font-bold text-gray-800 mb-2">Visualização Avançada</h3>
        <p className="text-sm text-muted-foreground">
          Ferramentas interativas para explorar, filtrar e analisar a coleção de imagens com métricas detalhadas.
        </p>
      </div>
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
