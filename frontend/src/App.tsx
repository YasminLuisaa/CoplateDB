import React from 'react';
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./providers/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";

// Importando todos os componentes de página
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import Collection from "./pages/Collection";
import Dashboard from "./pages/Dashboard";
import Api from "./pages/Api";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import UploadContribuicao from "./pages/UploadContribuicao";
import TeamMemberProfile from "./pages/TeamMemberProfile";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout";

// Criando um cliente de consulta para React Query
const queryClient = new QueryClient();

// Log de depuração para confirmar que o componente App está sendo carregado
console.log("App.tsx sendo carregado - versão completa");

const App = () => {
  // Log adicional para confirmar execução do componente
  console.log("Componente App está sendo renderizado");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Layout>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/api" element={<Api />} />              <Route path="/about" element={<About />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/upload-contribuicao" element={<UploadContribuicao />} />
              <Route path="/team/:id" element={<TeamMemberProfile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
