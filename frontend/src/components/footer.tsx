import React from "react";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-2000 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Descrição do Projeto */}
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-black max-w-md">
              Uma plataforma colaborativa aberta para coleta e gerenciamento de imagens de placas veiculares destinadas à pesquisa em Inteligência Artificial.
            </p>
          </div>

          {/* Navegação Principal */}
          <div>
            <h3 className="font-medium text-lg mb-3 text-black">Plataforma</h3>
            <ul className="space-y-2">
              <li><Link onClick={scrollToTop} to="/" className="text-black hover:text-blue-600 transition-colors">Início</Link></li>
              <li><Link onClick={scrollToTop} to="/collection" className="text-black hover:text-blue-600 transition-colors">Explorar Dataset</Link></li>
              <li><Link onClick={scrollToTop} to="/upload" className="text-black hover:text-blue-600 transition-colors">Detecção OCR</Link></li>
              <li><Link onClick={scrollToTop} to="/upload-contribuicao" className="text-black hover:text-blue-600 transition-colors">Contribuir com Imagens</Link></li>
              <li><Link onClick={scrollToTop} to="/api" className="text-black hover:text-blue-600 transition-colors">API & Documentação</Link></li>
            </ul>
          </div>

          {/* Recursos e Informações */}
          <div>
            <h3 className="font-medium text-lg mb-3 text-black">Recursos</h3>
            <ul className="space-y-2">
              <li><Link onClick={scrollToTop} to="/about" className="text-black hover:text-blue-600 transition-colors">Sobre o Projeto</Link></li>
              <li><Link onClick={scrollToTop} to="/research" className="text-black hover:text-blue-600 transition-colors">Pesquisa Científica</Link></li>
              <li><Link onClick={scrollToTop} to="/how-to-contribute" className="text-black hover:text-blue-600 transition-colors">Como Contribuir</Link></li>
              <li><Link onClick={scrollToTop} to="/statistics" className="text-black hover:text-blue-600 transition-colors">Estatísticas do Dataset</Link></li>
              <li><Link onClick={scrollToTop} to="/downloads" className="text-black hover:text-blue-600 transition-colors">Downloads</Link></li>
            </ul>
          </div>
        </div>

        {/* Rodapé Inferior */}
        <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <p className="text-black text-sm">
              &copy; {new Date().getFullYear()} CoPlateDB - IFSP Campus Birigui
            </p>
            <p className="text-black text-sm hidden md:block">•</p>
            <p className="text-black text-sm">
              Projeto de Iniciação Científica
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link onClick={scrollToTop} to="/privacy" className="text-black hover:text-blue-600 transition-colors">
              Privacidade & LGPD
            </Link>
            <span className="text-black">•</span>
            <Link onClick={scrollToTop} to="/terms" className="text-black hover:text-blue-600 transition-colors">
              Termos de Uso
            </Link>
            <span className="text-black">•</span>
            <Link onClick={scrollToTop} to="/ethics" className="text-black hover:text-blue-600 transition-colors">
              Ética & Anonimização
            </Link>
            <span className="text-black">•</span>
            <Link onClick={scrollToTop} to="/contato" className="text-black hover:text-blue-600 transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}