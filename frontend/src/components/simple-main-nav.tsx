import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export function SimpleMainNav() {
  return (
    <nav className="bg-white shadow border-b px-4 py-4">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-500 flex items-center gap-2">
          <Home className="w-6 h-6" />
          CoPlateDB
        </Link>
        
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-2 border rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Entrar
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Cadastrar
          </Link>
        </div>
      </div>
    </nav>
  );
}
