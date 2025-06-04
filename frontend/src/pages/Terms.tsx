import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { FileText, AlertCircle, Users, Shield, Database, CheckCircle } from "lucide-react";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      
      <main className="flex-1">
        <PageHeader
          title="Termos de Uso"
          description="Condições para utilização da plataforma CoPlateDB"
        />
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Aceite dos Termos */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-800 m-0">Aceite dos Termos</h2>
              </div>
              <p className="text-gray-700 mb-0">
                Ao acessar e utilizar a plataforma CoPlateDB, você concorda com estes termos de uso. 
                Se você não concordar com qualquer parte destes termos, não deve utilizar nossa plataforma.
              </p>
            </div>

            {/* Sobre o Serviço */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Sobre o Serviço</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                O CoPlateDB é uma plataforma colaborativa de código aberto destinada à coleta, 
                anonimização e disponibilização de imagens de placas veiculares para fins de 
                pesquisa científica em inteligência artificial e visão computacional.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Objetivos da Plataforma:</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Promover a pesquisa científica aberta</li>
                  <li>Democratizar o acesso a dados de qualidade</li>
                  <li>Facilitar o desenvolvimento de algoritmos de IA</li>
                  <li>Garantir conformidade com leis de privacidade</li>
                </ul>
              </div>
            </section>

            {/* Elegibilidade */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Elegibilidade e Cadastro</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Quem pode usar:</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Pesquisadores acadêmicos e científicos</li>
                    <li>Estudantes de graduação e pós-graduação</li>
                    <li>Profissionais da área de tecnologia</li>
                    <li>Instituições de ensino e pesquisa</li>
                    <li>Desenvolvedores de software educacional</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">Requisitos:</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Ter pelo menos 18 anos de idade</li>
                    <li>Fornecer informações verdadeiras e atualizadas</li>
                    <li>Ter finalidade acadêmica, educacional ou de pesquisa</li>
                    <li>Concordar com nossa política de privacidade</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Uso Permitido */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Uso Permitido</h2>
              </div>
              
              <p className="text-gray-700 mb-4">Você pode utilizar os dados e serviços da plataforma para:</p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Pesquisa acadêmica e científica</li>
                <li>Desenvolvimento de algoritmos de visão computacional</li>
                <li>Treinamento de modelos de inteligência artificial</li>
                <li>Estudos comparativos e benchmarking</li>
                <li>Publicação de resultados científicos (com devida atribuição)</li>
                <li>Desenvolvimento de ferramentas educacionais</li>
              </ul>
              
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <p className="text-gray-700 m-0">
                  <strong>Atribuição:</strong> Ao utilizar nossos dados em publicações, 
                  solicitamos que cite o CoPlateDB como fonte dos dados utilizados.
                </p>
              </div>
            </section>

            {/* Uso Proibido */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Uso Proibido</h2>
              </div>
              
              <p className="text-gray-700 mb-4">É expressamente proibido:</p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Usar os dados para fins comerciais sem autorização</li>
                <li>Tentar identificar ou rastrear veículos ou proprietários</li>
                <li>Vender, distribuir ou sublicenciar os dados</li>
                <li>Usar para vigilância ou monitoramento não autorizado</li>
                <li>Violar leis de privacidade ou proteção de dados</li>
                <li>Sobrecarregar nossa infraestrutura com requests excessivos</li>
                <li>Criar contas falsas ou múltiplas</li>
                <li>Interferir no funcionamento da plataforma</li>
              </ul>
            </section>

            {/* Contribuições */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Contribuições de Dados</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">
                  Ao contribuir com imagens para nossa plataforma, você declara que:
                </p>
                
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Possui direitos legais sobre as imagens enviadas</li>
                  <li>As imagens não violam direitos de terceiros</li>
                  <li>Concorda com a anonimização automática das imagens</li>
                  <li>Autoriza o uso das imagens para fins de pesquisa</li>
                  <li>As imagens foram capturadas em espaços públicos</li>
                </ul>
                
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-gray-700 m-0">
                    <strong>Importante:</strong> Todas as imagens passam por processo automático 
                    de anonimização antes de serem incluídas no banco de dados público.
                  </p>
                </div>
              </div>
            </section>

            {/* Limitações */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Limitações de Responsabilidade</h2>
              
              <p className="text-gray-700 mb-4">
                A plataforma CoPlateDB é fornecida "como está" para fins educacionais e de pesquisa. 
                Não oferecemos garantias sobre:
              </p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Disponibilidade contínua do serviço</li>
                <li>Precisão ou completude dos dados</li>
                <li>Adequação para propósitos específicos</li>
                <li>Ausência de erros ou interrupções</li>
              </ul>
            </section>

            {/* Modificações */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Modificações dos Termos</h2>
              <p className="text-gray-700">
                Reservamo-nos o direito de modificar estes termos a qualquer momento. 
                Mudanças significativas serão comunicadas com pelo menos 30 dias de antecedência 
                através de e-mail ou notificação na plataforma.
              </p>
            </section>

            {/* Contato */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Contato</h2>
              <p className="text-gray-700">
                Para dúvidas sobre estes termos ou sobre a plataforma:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>E-mail:</strong> legal@coplatedb.com</p>
                <p className="text-gray-700 mb-2"><strong>Suporte:</strong> support@coplatedb.com</p>
                <p className="text-gray-700"><strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR')}</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
