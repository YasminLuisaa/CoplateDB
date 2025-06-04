// Script para diagnóstico e correção de problemas de renderização React
console.log('Diagnóstico React iniciando...');

// Verifica se há algum container React que não está sendo renderizado
function checkReactRendering() {
  console.log('Verificando renderização React...');
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('ERRO: Elemento root não existe no DOM');
    // Tenta criar o elemento root
    const newRoot = document.createElement('div');
    newRoot.id = 'root';
    document.body.appendChild(newRoot);
    console.log('Elemento root criado e adicionado ao body');
    return;
  }
  
  // Verifica se o conteúdo ainda é a mensagem de carregamento inicial
  if (rootElement.innerHTML.includes('Carregando aplicação')) {
    console.error('ERRO: React não conseguiu renderizar a aplicação. O conteúdo ainda é a mensagem de carregamento.');
    
    // Tenta renderizar conteúdo mínimo
    renderEmergencyContent(rootElement);
  } else {
    console.log('Aplicação React parece ter sido renderizada com sucesso!');
  }
}

// Renderiza conteúdo de emergência se React falhar
function renderEmergencyContent(element) {
  console.log('Tentando renderizar conteúdo de emergência...');
  element.innerHTML = `
    <div style="padding: 20px; max-width: 800px; margin: 0 auto; font-family: Arial, sans-serif;">
      <header style="background-color: #0EA5E9; color: white; padding: 20px; border-radius: 8px;">
        <h1>CoPlateDB - Página de Emergência</h1>
      </header>
      
      <div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; margin-top: 20px; border: 1px solid #ddd;">
        <h2>Problemas ao carregar a aplicação React</h2>
        <p>O aplicativo React não conseguiu carregar corretamente. Isto pode acontecer devido a:</p>
        <ul>
          <li>Problemas de compatibilidade do navegador</li>
          <li>Erros de JavaScript</li>
          <li>Problemas de conexão com a Internet</li>
          <li>Conflito com extensões do navegador</li>
        </ul>
        
        <div style="margin-top: 20px; padding: 15px; background-color: #e9f5fd; border-radius: 5px; border-left: 5px solid #0EA5E9;">
          <h3>Sugestões:</h3>
          <p>1. Atualize a página (pressione F5 ou Ctrl+R)</p>
          <p>2. Limpe o cache do navegador</p>
          <p>3. Tente usar outro navegador</p>
          <p>4. Verifique se JavaScript está habilitado</p>
        </div>
        
        <div style="margin-top: 20px; text-align: center;">
          <a href="/teste_simples.html" style="background-color: #0EA5E9; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Ver página de teste</a>
        </div>
      </div>
    </div>
  `;
}

// Executa verificação após um tempo razoável
setTimeout(checkReactRendering, 8000);

// Também adiciona verificação quando documento estiver completamente carregado
window.addEventListener('load', function() {
  console.log('Página totalmente carregada, agendando verificação...');
  setTimeout(checkReactRendering, 3000);
});
