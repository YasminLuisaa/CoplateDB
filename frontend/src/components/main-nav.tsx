import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Home, User, BookOpen, Info, Search, Database, Mail } from 'lucide-react';

// Main navigation bar for the app
const MainNav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const loggedIn = Boolean(token && token !== 'undefined' && token !== 'null');
    setIsLoggedIn(loggedIn);
  }, []);
  
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link to="/" className="text-xl font-bold text-blue-700 flex items-center gap-2">
          <Home className="w-6 h-6" />
          CoPlateDB
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1">Início</Link>
        <Link to="/api" className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"><Database className="w-4 h-4" />API</Link>        <Link to="/collection" className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"><BookOpen className="w-4 h-4" />Coleção</Link>
        <Link to="/upload" className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"><Search className="w-4 h-4" />Detecção</Link>
        <Link to="/about" className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"><Info className="w-4 h-4" />Sobre</Link>
        <Link to="/contato" className="text-gray-700 hover:text-blue-700 font-medium transition-colors flex items-center gap-1"><Mail className="w-4 h-4" />Contato</Link>
        {!isLoggedIn && (
          <div className="flex gap-2 ml-4">
            <Link
              to="/login"
              className="px-7 py-2 border border-blue-200 rounded-lg font-semibold text-gray-900 bg-white hover:bg-blue-50 transition-colors text-lg shadow-sm"
              style={{ boxShadow: '0 0 0 1.5px #e0e7ef' }}
            >
              Entrar
            </Link>
            <Link
              to="/register"
              className="px-7 py-2 rounded-lg font-semibold text-white bg-sky-400 hover:bg-sky-500 transition-colors text-lg shadow-sm"
              style={{ boxShadow: '0 0 0 1.5px #38bdf8' }}
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
    </nav>
  );
};

export { MainNav };