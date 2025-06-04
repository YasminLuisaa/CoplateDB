import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Upload, Home, User, Mail, Target, AlertTriangle, Lightbulb, Gauge, ActivitySquare, Goal, Blocks } from 'lucide-react';

// Main navigation bar for the app
export const MainNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const loggedIn = Boolean(token && token !== 'undefined' && token !== 'null');
    setIsLoggedIn(loggedIn);
  }, []);
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-background border-b py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-primary flex items-center gap-2">
          <Home className="w-6 h-6" />
          CoPlateDB
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <button onClick={() => scrollToSection('missao')} className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <Target className="w-4 h-4" />
          Missão
        </button>
        <button onClick={() => scrollToSection('problema')} className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <AlertTriangle className="w-4 h-4" />
          Problema
        </button>
        <button onClick={() => scrollToSection('solucao')} className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <Lightbulb className="w-4 h-4" />
          Solução
        </button>
        <button onClick={() => scrollToSection('impacto')} className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <Gauge className="w-4 h-4" />
          Impacto
        </button>
        <button onClick={() => scrollToSection('funcionamento')} className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <ActivitySquare className="w-4 h-4" />
          Funcionamento
        </button>
        <button onClick={() => scrollToSection('objetivos')} className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <Goal className="w-4 h-4" />
          Objetivos
        </button>
        <button onClick={() => scrollToSection('recursos')} className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <Blocks className="w-4 h-4" />
          Recursos
        </button>
        <Link to="/contato" className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">
          <Mail className="w-4 h-4" />
          Contato
        </Link>

        {!isLoggedIn && (
          <div className="flex gap-2 ml-4">
            <Link
              to="/login"
              className="px-7 py-2 border rounded-lg font-semibold text-foreground bg-background hover:bg-accent transition-colors text-lg"
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="px-7 py-2 rounded-lg font-semibold text-primary-foreground bg-primary hover:bg-primary/90 transition-colors text-lg"
            >
              Cadastrar
            </Link>
          </div>
        )}
        {isLoggedIn && (
          <>
            <Link to="/upload-contribuicao" className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">
              <Upload className="w-5 h-5" />
              Contribuir
            </Link>
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-700 hover:text-blue-700 font-medium transition-colors">
              <User className="w-5 h-5" />
              Dashboard
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
              }}
              className="px-7 py-2 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-400 transition-colors text-lg shadow-sm"
              style={{ boxShadow: '0 0 0 1.5px #f87171' }}
            >
              Sair
            </button>
          </>
        )}
      </div>
    </nav>  );
};