import React, { useState, useEffect } from 'react';

const MinimalApp = () => {
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    console.log('MinimalApp montado');
    setLoaded(true);
  }, []);
  
  return (
    <div style={{ 
      backgroundColor: 'white',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#0EA5E9',
        color: 'white',
        padding: '16px',
        textAlign: 'center',
        borderRadius: '8px'
      }}>
        <h1>CoPlateDB - Versão Mínima</h1>
        <p>Esta é uma versão simplificada da aplicação</p>
      </header>
      
      <main style={{
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '8px',
        marginTop: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Aplicação React Carregada!</h2>
        <p>Status: {loaded ? 'Componente inicializado' : 'Carregando...'}</p>
        <p>Se você está vendo esta página, o React está funcionando corretamente.</p>
        <p>Data/Hora atual: {new Date().toLocaleString()}</p>
        
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f4f8', borderRadius: '5px' }}>
          <h3>Links úteis:</h3>
          <ul>
            <li><a href="/teste_simples.html" style={{ color: '#0EA5E9' }}>Página HTML estática de teste</a></li>
          </ul>
        </div>
      </main>
      
      <footer style={{
        textAlign: 'center',
        marginTop: '32px',
        color: '#666'
      }}>
        <p>&copy; {new Date().getFullYear()} CoPlateDB</p>
      </footer>
    </div>
  );
};

export default MinimalApp;
