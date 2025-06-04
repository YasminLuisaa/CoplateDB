// Arquivo de fallback para navegadores que não suportam módulos ES
console.log("Navegador não suporta módulos ES - carregando fallback");

// Exibir mensagem para o usuário
document.addEventListener('DOMContentLoaded', function() {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="padding: 20px; max-width: 600px; margin: 0 auto; text-align: center;">
        <h1 style="color: #0EA5E9;">CoPlateDB</h1>
        <div style="padding: 20px; background-color: #fff3cd; border: 1px solid #ffeeba; border-radius: 5px; margin-top: 20px;">
          <h2 style="color: #856404;">Seu navegador está desatualizado</h2>
          <p>Esta aplicação requer um navegador moderno para funcionar corretamente.</p>
          <p>Por favor, atualize seu navegador ou use um dos navegadores recomendados abaixo:</p>
          <ul style="list-style: none; padding: 0; margin-top: 20px; display: flex; justify-content: center; gap: 20px;">
            <li><a href="https://www.google.com/chrome/" target="_blank">Google Chrome</a></li>
            <li><a href="https://www.mozilla.org/firefox/" target="_blank">Mozilla Firefox</a></li>
            <li><a href="https://www.microsoft.com/edge" target="_blank">Microsoft Edge</a></li>
          </ul>
        </div>
      </div>
    `;
  }
});
