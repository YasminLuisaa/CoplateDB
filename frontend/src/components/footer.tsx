import React from "react";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (    <footer className="bg-blue-2000 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-black max-w-md">
              Uma plataforma colaborativa aberta para coleta e gerenciamento de imagens de placas veiculares destinadas à pesquisa em Inteligência Artificial.
            </p>
          </div>
            <div>
            <h3 className="font-medium text-lg mb-3 text-black">Links</h3>
            <ul className="space-y-2">
              <li><Link onClick={scrollToTop} to="/" className="text-black hover:text-blue-600 transition-colors">Início</Link></li>
              <li><Link onClick={scrollToTop} to="/collection" className="text-black hover:text-blue-600 transition-colors">Coleção</Link></li>
              <li><Link onClick={scrollToTop} to="/upload" className="text-black hover:text-blue-600 transition-colors">Detecção</Link></li>
              <li><Link onClick={scrollToTop} to="/api" className="text-black hover:text-blue-600 transition-colors">API</Link></li>
            </ul>
          </div>
            <div>
            <h3 className="font-medium text-lg mb-3 text-black">Recursos</h3>
            <ul className="space-y-2">
              <li><Link onClick={scrollToTop} to="/about" className="text-black hover:text-blue-600 transition-colors">Sobre o Projeto</Link></li>
              <li><Link onClick={scrollToTop} to="/privacy" className="text-black hover:text-blue-600 transition-colors">Privacidade</Link></li>
              <li><Link onClick={scrollToTop} to="/terms" className="text-black hover:text-blue-600 transition-colors">Termos de Uso</Link></li>
              <li><Link onClick={scrollToTop} to="/contato" className="text-black hover:text-blue-600 transition-colors">Contato</Link></li>
            </ul>
          </div>        </div>
          <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-black text-sm">
            &copy; {new Date().getFullYear()} CoPlateDB. Todos os direitos reservados.
          </p>          
          <div className="flex gap-4">
            <Link onClick={scrollToTop} to="/privacy" className="text-black hover:text-blue-600 transition-colors">
              Política de Privacidade
            </Link>
            <span className="text-black">•</span>
            <Link onClick={scrollToTop} to="/terms" className="text-black hover:text-blue-600 transition-colors">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
