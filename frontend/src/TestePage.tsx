import React from 'react';

export default function TestePage() {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <header style={{
        backgroundColor: '#0EA5E9',
        color: 'white',
        padding: '16px',
        textAlign: 'center',
        borderRadius: '8px'
      }}>
        <h1>CoPlateDB - Página de Teste React</h1>
      </header>
      
      <main style={{
        padding: '32px',
        backgroundColor: 'white',
        borderRadius: '8px',
        marginTop: '16px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Esta é uma página React mínima</h2>
        <p>Se você está vendo esta página, o React está funcionando corretamente.</p>
        <p>Estamos testando para resolver o problema da tela em branco.</p>
      </main>
      
      <footer style={{
        textAlign: 'center',
        marginTop: '32px',
        color: '#666'
      }}>
        <p>&copy; 2025 CoPlateDB</p>
      </footer>
    </div>
  );
}
