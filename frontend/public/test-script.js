// Arquivo JavaScript simples para verificar se há problemas com o servidor
console.log('Script de teste carregado');

// Função para verificar se o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente carregado');
    
    // Criar um elemento no DOM
    const testElement = document.createElement('div');
    testElement.id = 'js-test-element';
    testElement.innerHTML = `
        <style>
            .test-container {
                position: fixed;
                top: 10px;
                right: 10px;
                background-color: #0EA5E9;
                color: white;
                padding: 10px;
                border-radius: 5px;
                z-index: 9999;
                font-family: Arial, sans-serif;
            }
        </style>
        <div class="test-container">
            JavaScript funcionando!
        </div>
    `;
    document.body.appendChild(testElement);
});

// Verificar se há erros no carregamento
window.addEventListener('error', function(e) {
    console.error('Erro detectado:', e.message);
    
    // Criar um elemento para mostrar o erro
    const errorElement = document.createElement('div');
    errorElement.style.position = 'fixed';
    errorElement.style.bottom = '10px';
    errorElement.style.left = '10px';
    errorElement.style.backgroundColor = 'red';
    errorElement.style.color = 'white';
    errorElement.style.padding = '10px';
    errorElement.style.borderRadius = '5px';
    errorElement.style.zIndex = '9999';
    errorElement.style.fontFamily = 'Arial, sans-serif';
    errorElement.textContent = 'Erro: ' + e.message;
    
    document.body.appendChild(errorElement);
});
