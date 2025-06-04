import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Shield, Lock, Eye, Database, UserCheck, AlertTriangle } from "lucide-react";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainNav />
      
      <main className="flex-1">
        <PageHeader
          title="Política de Privacidade"
          description="Como coletamos, utilizamos e protegemos seus dados pessoais"
        />
        
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <div className="prose prose-lg max-w-none">
            
            {/* Seção de Compromisso */}
            <div className="bg-blue-50 p-6 rounded-lg mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-800 m-0">Nosso Compromisso</h2>
              </div>
              <p className="text-gray-700 mb-0">
                O CoPlateDB está comprometido com a proteção da privacidade e dos dados pessoais de todos os usuários. 
                Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações em conformidade 
                com a LGPD (Lei Geral de Proteção de Dados) e GDPR.
              </p>
            </div>

            {/* Dados Coletados */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Dados Coletados</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800">Dados de Cadastro</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Nome completo</li>
                    <li>Endereço de e-mail</li>
                    <li>Instituição de afiliação (quando aplicável)</li>
                    <li>Área de pesquisa</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">Dados de Uso</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Logs de acesso à plataforma</li>
                    <li>Histórico de uploads e downloads</li>
                    <li>Métricas de utilização da API</li>
                    <li>Preferências de usuário</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">Imagens Contribuídas</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Imagens de placas veiculares (automaticamente anonimizadas)</li>
                    <li>Metadados técnicos (resolução, formato, data de captura)</li>
                    <li>Informações contextuais (localização aproximada, condições climáticas)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Uso dos Dados */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Como Utilizamos seus Dados</h2>
              </div>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Fornecer acesso à plataforma e seus recursos</li>
                <li>Melhorar a qualidade dos dados e algoritmos</li>
                <li>Comunicar atualizações e novidades do projeto</li>
                <li>Gerar estatísticas agregadas para relatórios de pesquisa</li>
                <li>Garantir a segurança e integridade da plataforma</li>
              </ul>
            </section>

            {/* Anonimização */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Processo de Anonimização</h2>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700 mb-3">
                  <strong>Todas as imagens de placas veiculares são automaticamente anonimizadas antes do armazenamento:</strong>
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Remoção de dados EXIF que possam conter localização precisa</li>
                  <li>Ofuscação de caracteres identificadores quando necessário</li>
                  <li>Aplicação de técnicas de mascaramento em áreas sensíveis</li>
                  <li>Verificação automática de conformidade antes da publicação</li>
                </ul>
              </div>
            </section>

            {/* Seus Direitos */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Seus Direitos</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                De acordo com a LGPD e GDPR, você tem os seguintes direitos:
              </p>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Acesso:</strong> Solicitar informações sobre quais dados pessoais possuímos</li>
                <li><strong>Retificação:</strong> Corrigir dados imprecisos ou incompletos</li>
                <li><strong>Exclusão:</strong> Solicitar a remoção de seus dados pessoais</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados</li>
                <li><strong>Limitação:</strong> Limitar o processamento em certas situações</li>
              </ul>
              
              <p className="text-gray-700 mt-4">
                Para exercer qualquer desses direitos, entre em contato conosco através do e-mail: 
                <strong> privacy@coplatedb.com</strong>
              </p>
            </section>

            {/* Segurança */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-blue-600" />
                <h2 className="text-lg font-bold text-gray-800 m-0">Medidas de Segurança</h2>
              </div>
              
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Criptografia de dados em trânsito e em repouso</li>
                <li>Controles de acesso rigorosos com autenticação multifator</li>
                <li>Auditorias regulares de segurança</li>
                <li>Backup seguro e redundante dos dados</li>
                <li>Monitoramento contínuo contra ameaças</li>
                <li>Treinamento regular da equipe em práticas de segurança</li>
              </ul>
            </section>

            {/* Contato */}
            <section className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Contato</h2>
              <p className="text-gray-700">
                Se você tiver dúvidas sobre esta política de privacidade ou sobre como tratamos seus dados, 
                entre em contato conosco:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 mb-2"><strong>E-mail:</strong> privacy@coplatedb.com</p>
                <p className="text-gray-700 mb-2"><strong>Data de Proteção:</strong> dpo@coplatedb.com</p>
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
