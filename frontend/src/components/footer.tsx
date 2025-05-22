
import React from "react";
import { Logo } from "@/components/logo";

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
              <li><a href="/" className="text-muted-foreground hover:text-brand-blue transition-colors">Início</a></li>
              <li><a href="/collection" className="text-muted-foreground hover:text-brand-blue transition-colors">Coleção</a></li>
              <li><a href="/upload" className="text-muted-foreground hover:text-brand-blue transition-colors">Upload</a></li>
              <li><a href="/api" className="text-muted-foreground hover:text-brand-blue transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Recursos</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-muted-foreground hover:text-brand-blue transition-colors">Sobre o Projeto</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-brand-blue transition-colors">Privacidade</a></li>
              <li><a href="/terms" className="text-muted-foreground hover:text-brand-blue transition-colors">Termos de Uso</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-brand-blue transition-colors">Contato</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} CoPlateDB. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-brand-blue transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand-blue transition-colors">
              Termos de Serviço
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
