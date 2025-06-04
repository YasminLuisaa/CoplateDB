import React from "react";
import { Link } from "react-router-dom";
import { SimpleMainNav } from "@/components/simple-main-nav";

export function SimpleIndex() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SimpleMainNav />
      
      <main className="flex-1 py-12">
        <div className="max-w-[1200px] mx-auto px-4">
          <section className="py-8 bg-blue-50 rounded-lg text-center px-4 mb-8">
            <h1 className="text-3xl font-bold mb-4 text-blue-800">
              CoPlateDB - Base de Dados Colaborativa
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
              Colete, gerencie e compartilhe imagens anonimizadas de placas veiculares para impulsionar 
              a pesquisa em inteligência artificial e reconhecimento ótico de caracteres.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/register" 
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
              >
                Começar agora
              </Link>
              <Link 
                to="/about" 
                className="bg-white border border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-2 rounded-lg font-medium"
              >
                Saiba mais
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-center">Sobre o Projeto</h2>
            <p className="text-gray-700 mb-4">
              O CoPlateDB surge para resolver a escassez de datasets diversificados e acessíveis na área de
              reconhecimento de placas veiculares. Nossa plataforma possibilita a coleta colaborativa de 
              imagens através de uma interface intuitiva, garantindo a padronização e anonimização dos dados 
              em conformidade com a LGPD.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="font-bold text-lg mb-2">Ciência Aberta</h3>
                <p className="text-gray-600">Promovemos a colaboração científica e o compartilhamento de dados para avançar o conhecimento coletivo.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="font-bold text-lg mb-2">Privacidade</h3>
                <p className="text-gray-600">Garantimos anonimização e conformidade com leis de proteção de dados em todas as etapas.</p>
              </div>
              <div className="bg-white p-6 shadow-md rounded-lg">
                <h3 className="font-bold text-lg mb-2">Qualidade</h3>
                <p className="text-gray-600">Mantemos rigorosos processos de curadoria e validação para todas as imagens.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-6">
        <div className="max-w-[1200px] mx-auto px-4 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} CoPlateDB. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
