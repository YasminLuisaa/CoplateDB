import React from "react";
import { Logo } from "@/components/logo";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-muted-foreground max-w-md">
              Uma plataforma colaborativa aberta para coleta e gerenciamento de imagens de placas veiculares destinadas à pesquisa em Inteligência Artificial.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-brand-blue transition-colors">Início</Link></li>
              <li><Link to="/collection" className="text-muted-foreground hover:text-brand-blue transition-colors">Coleção</Link></li>
              <li><Link to="/upload" className="text-muted-foreground hover:text-brand-blue transition-colors">Upload</Link></li>
              <li><Link to="/api" className="text-muted-foreground hover:text-brand-blue transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Recursos</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-brand-blue transition-colors">Sobre o Projeto</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-brand-blue transition-colors">Privacidade</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-brand-blue transition-colors">Termos de Uso</Link></li>
              <li><Link to="/contato" className="text-muted-foreground hover:text-brand-blue transition-colors">Contato</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CoPlateDB. Todos os direitos reservados.
          </p>          <div className="flex gap-4">
            <Link to="/privacy" className="text-muted-foreground hover:text-brand-blue transition-colors">
              Política de Privacidade
            </Link>
            <Link to="/terms" className="text-muted-foreground hover:text-brand-blue transition-colors">
              Termos de Serviço
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
