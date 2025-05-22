document.addEventListener('DOMContentLoaded', function() {
    console.log("Script de inicialização carregado");
    
    // Referências aos elementos 
    const fileInput = document.getElementById('image-upload');
    const fileDropArea = document.getElementById('file-drop-area');
    const detectButton = document.getElementById('detect-button');
    const imagePreview = document.getElementById('image-preview');
    const fileName = document.getElementById('file-name');
    
    // Adicionar um botão de upload explícito
    const uploadButton = document.createElement('button');
    uploadButton.type = 'button';
    uploadButton.className = 'upload-button';
    uploadButton.innerHTML = '<i class="fas fa-upload"></i> Selecionar arquivo';
    uploadButton.style.marginTop = '10px';
    uploadButton.style.zIndex = '100';
    fileDropArea.appendChild(uploadButton);
    
    // Ao clicar no botão, aciona o input de arquivo
    uploadButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Criar um novo input de arquivo a cada clique
        const newFileInput = document.createElement('input');
        newFileInput.type = 'file';
        newFileInput.accept = '.png,.jpg,.jpeg';
        newFileInput.style.position = 'absolute';
        newFileInput.style.top = '-9999px';
        document.body.appendChild(newFileInput);
        
        // Acionar o diálogo de seleção de arquivo
        newFileInput.click();
        
        // Quando um arquivo for selecionado
        newFileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                // Atualizar o input original para o formulário
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(this.files[0]);
                fileInput.files = dataTransfer.files;
                
                // Exibir o nome do arquivo
                fileName.textContent = this.files[0].name;
                
                // Carregar a pré-visualização
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.classList.add('active');
                    fileDropArea.classList.add('has-file');
                    detectButton.disabled = false;
                };
                reader.readAsDataURL(this.files[0]);
                
                console.log("Arquivo selecionado com sucesso:", this.files[0].name);
            }
        });
    });
    
    // Não usar os eventos de clique na área para evitar conflitos
    if (fileDropArea) {
        fileDropArea.removeEventListener('click', null);
    }

    // Reiniciar formulário
    const resetButton = document.getElementById('reset-button');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            const form = document.getElementById('upload-form');
            if (form) form.reset();
            if (imagePreview) {
                imagePreview.src = '';
                imagePreview.classList.remove('active');
            }
            if (fileName) fileName.textContent = '';
            if (fileDropArea) fileDropArea.classList.remove('has-file');
            if (detectButton) detectButton.disabled = true;
            const loadingContainer = document.getElementById('loading-container');
            const resultsContainer = document.getElementById('results-container');
            if (loadingContainer) loadingContainer.style.display = 'none';
            if (resultsContainer) resultsContainer.style.display = 'none';
        });
    }

    // Processar envio do formulário
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!fileInput || !fileInput.files || !fileInput.files.length) {
                alert('Por favor, selecione uma imagem.');
                return;
            }
            
            // Mostrar carregamento
            const loadingContainer = document.getElementById('loading-container');
            const resultsContainer = document.getElementById('results-container');
            if (loadingContainer) loadingContainer.style.display = 'flex';
            if (resultsContainer) resultsContainer.style.display = 'none';
            
            // Criar FormData
            const formData = new FormData(uploadForm);
            
            // Adicionar opções de processamento
            const useAllMethods = document.getElementById('use-all-methods');
            const usePerspective = document.getElementById('use-perspective');
            const useRotation = document.getElementById('use-rotation');
            const useEnhanced = document.getElementById('use-enhanced');
            
            if (useAllMethods) formData.append('use_all_methods', useAllMethods.checked);
            if (usePerspective) formData.append('use_perspective', usePerspective.checked);
            if (useRotation) formData.append('use_rotation', useRotation.checked);
            if (useEnhanced) formData.append('use_enhanced', useEnhanced.checked);
            
            // Enviar para o backend
            fetch('/api/detect', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    processResults(data);
                } else {
                    alert(data.error || 'Erro ao processar a imagem');
                    if (loadingContainer) loadingContainer.style.display = 'none';
                }
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao comunicar com o servidor: ' + error.message);
                if (loadingContainer) loadingContainer.style.display = 'none';
            });
        });
    }

    // Processar resultados
    function processResults(data) {
        const loadingContainer = document.getElementById('loading-container');
        const resultsContainer = document.getElementById('results-container');
        
        // Esconder loading e mostrar resultados
        if (loadingContainer) loadingContainer.style.display = 'none';
        if (resultsContainer) resultsContainer.style.display = 'block';
        
        // Atualizar imagem de resultado
        const resultImage = document.getElementById('result-image');
        const bestMethodData = data.methods[data.best_result.method];
        if (resultImage && bestMethodData && bestMethodData.processed_image_path) {
            resultImage.src = '/processed/' + bestMethodData.processed_image_path;
        }
        
        // Atualizar status
        const resultStatus = document.getElementById('result-status');
        const resultStatusBadge = document.getElementById('result-status-badge');
        if (resultStatus) {
            resultStatus.className = 'result-status status-success';
            resultStatus.innerHTML = '<i class="fas fa-check-circle"></i> Placa detectada com sucesso!';
        }
        if (resultStatusBadge) resultStatusBadge.textContent = 'Sucesso';
        
        // Atualizar dados para cada método
        updateMethodData(data.methods, 'original', 'plate-original', 'confidence-original');
        if (data.methods.rotation) {
            updateMethodData(data.methods, 'rotation', 'plate-rotation', 'confidence-rotation');
        }
        if (data.methods.perspective) {
            updateMethodData(data.methods, 'perspective', 'plate-perspective', 'confidence-perspective');
        }
        if (data.methods.enhanced) {
            updateMethodData(data.methods, 'enhanced', 'plate-enhanced', 'confidence-enhanced');
        }
        
        // Atualizar tabela de comparação
        updateComparisonTable(data.methods);
        
        // Atualizar melhor resultado
        const bestPlate = document.getElementById('best-plate');
        const bestConfidence = document.getElementById('best-confidence');
        const bestMethod = document.getElementById('best-method');
        const bestConfidenceBar = document.getElementById('best-confidence-bar');
        
        if (bestPlate) bestPlate.textContent = data.best_result.text;
        if (bestConfidence) bestConfidence.textContent = data.best_result.confidence + '%';
        if (bestMethod) bestMethod.textContent = translateMethod(data.best_result.method);
        if (bestConfidenceBar) bestConfidenceBar.style.width = data.best_result.confidence + '%';
    }

    // Atualizar dados para um método específico
    function updateMethodData(methods, methodName, plateId, confidenceId) {
        if (methods[methodName]) {
            const plateElement = document.getElementById(plateId);
            const confidenceElement = document.getElementById(confidenceId);
            
            if (plateElement) plateElement.textContent = methods[methodName].text || 'Não detectado';
            if (confidenceElement) {
                confidenceElement.textContent = methods[methodName].confidence + '%';
                
                // Atualizar barra de confiança
                const confidenceFill = confidenceElement.parentElement.querySelector('.confidence-fill');
                if (confidenceFill) {
                    confidenceFill.style.width = methods[methodName].confidence + '%';
                }
            }
        }
    }

    // Atualizar tabela de comparação
    function updateComparisonTable(methods) {
        const tableBody = document.getElementById('comparison-table-body');
        if (!tableBody) return;
        
        // Limpar tabela
        tableBody.innerHTML = '';
        
        // Adicionar linhas para cada método
        for (const [method, data] of Object.entries(methods)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <span class="method-icon icon-${method}"></span>
                    ${translateMethod(method)}
                </td>
                <td>${data.text || 'Não detectado'}</td>
                <td>${data.confidence}%</td>
                <td>${data.processing_time}</td>
            `;
            tableBody.appendChild(row);
        }
    }

    // Traduzir nome do método
    function translateMethod(method) {
        const translations = {
            'original': 'Original',
            'rotation': 'Rotação',
            'perspective': 'Perspectiva',
            'enhanced': 'Melhorado'
        };
        return translations[method] || method;
    }
});