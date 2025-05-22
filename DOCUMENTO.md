# Sistema de Detecção de Placas Mercosul

Este documento contém a documentação completa para o Sistema de Detecção de Placas Mercosul, uma aplicação que permite o reconhecimento de placas veiculares no padrão Mercosul através de processamento de imagem com OpenCV e reconhecimento óptico de caracteres com EasyOCR.

## Índice

1. [Visão Geral do Sistema](#visão-geral-do-sistema)
2. [Arquitetura](#arquitetura)
3. [Requisitos](#requisitos)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Execução do Sistema](#execução-do-sistema)
6. [Guia de Uso](#guia-de-uso)
7. [API REST](#api-rest)
8. [Algoritmos de Processamento](#algoritmos-de-processamento)
9. [Solução de Problemas](#solução-de-problemas)
10. [Contribuição](#contribuição)

## Visão Geral do Sistema

O Sistema de Detecção de Placas Mercosul é uma aplicação web completa que combina:

- **Frontend**: Interface moderna desenvolvida em React com TypeScript, utilizando componentes reutilizáveis e design responsivo.
- **Backend**: API RESTful em Flask (Python) para processamento de imagens e reconhecimento de placas.

O sistema permite que os usuários enviem imagens de veículos e identifica automaticamente as placas no padrão Mercosul (formato ABC1D23), exibindo o resultado do processamento com alta precisão.

## Arquitetura

O projeto segue uma arquitetura moderna de aplicação web com separação clara entre frontend e backend:

```
sistema-placas-mercosul/
├── backend/                # Backend Flask
│   ├── app.py              # Aplicação principal Flask
│   ├── utils/              # Utilitários para processamento de imagem
│   │   └── image_processing.py
│   │   └── ocr.py
│   ├── tests/              # Testes automatizados
│   ├── uploads/            # Diretório para uploads de imagens
│   ├── processed/          # Diretório para imagens processadas
│   └── requirements.txt    # Dependências do backend
│
├── frontend/               # Frontend React
│   ├── public/             # Arquivos estáticos públicos
│   ├── src/                # Código fonte React
│   │   ├── components/     # Componentes React reutilizáveis
│   │   ├── hooks/          # React hooks customizados
│   │   ├── lib/            # Bibliotecas e utilitários
│   │   ├── pages/          # Páginas da aplicação
│   │   └── services/       # Serviços para comunicação com o backend
│   ├── package.json        # Dependências do frontend
│   └── vite.config.ts      # Configuração do Vite
```

## Requisitos

### Backend

- Python 3.8 ou superior
- Dependências Python:
  - Flask 2.3.3
  - Werkzeug 2.3.7
  - Flask-CORS 4.0.0
  - NumPy 1.22.0 ou superior
  - OpenCV 4.5.4.60 ou superior
  - EasyOCR 1.6.2 ou superior
  - Pillow 8.4.0 ou superior
  - PyTorch 1.10.0 ou superior

### Frontend

- Node.js 16 ou superior
- NPM ou Yarn
- Dependências JavaScript (gerenciadas pelo NPM):
  - React 18
  - React Router
  - React Hook Form
  - Tailwind CSS
  - Radix UI para componentes de interface
  - React Query para gerenciamento de estado
  - TypeScript para tipagem estática

## Instalação e Configuração

### Pré-requisitos

1. Certifique-se de ter instalado:
   - Git
   - Python 3.8+
   - Node.js 16+
   - NPM ou Yarn

### Clone do Repositório

```bash
git clone https://github.com/seu-usuario/sistema-placas-mercosul.git
cd sistema-placas-mercosul
```

### Configuração do Backend

1. Crie e ative um ambiente virtual Python:

```bash
cd backend
python -m venv venv

# No Windows
venv\Scripts\activate

# No Linux/Mac
source venv/bin/activate
```

2. Instale as dependências do backend:

```bash
pip install -r requirements.txt
```

3. Execute o script de configuração para criar os diretórios necessários:

```bash
python setup.py
```

### Configuração do Frontend

1. Instale as dependências do frontend:

```bash
cd frontend
npm install
```

## Execução do Sistema

### Modo Desenvolvimento

1. Inicie o backend:

```bash
# Na pasta backend, com o ambiente virtual ativado
python app.py
```

O servidor backend estará rodando em `http://localhost:5000`.

2. Inicie o frontend em outro terminal:

```bash
# Na pasta frontend
npm run dev
```

O servidor de desenvolvimento do frontend estará rodando em `http://localhost:5173`.

3. Acesse a aplicação pelo navegador em `http://localhost:5173`.

### Modo Produção

1. Construa o frontend:

```bash
cd frontend
npm run build
```

2. Copie os arquivos gerados (da pasta `frontend/dist`) para a pasta `backend/static`:

```bash
# No Windows
xcopy /E /Y frontend\dist\* backend\static\

# No Linux/Mac
cp -r frontend/dist/* backend/static/
```

3. Execute apenas o backend:

```bash
cd backend
python app.py
```

4. Acesse a aplicação pelo navegador em `http://localhost:5000`.

## Guia de Uso

### Upload de Imagem

1. Na página inicial, clique no botão "Fazer Upload" ou arraste uma imagem para a área de upload.
2. Selecione uma imagem com uma placa de veículo no padrão Mercosul.
3. O sistema processará a imagem automaticamente.

### Visualização de Resultados

Após o processamento da imagem, você verá:

1. A imagem original que você enviou.
2. Uma visualização das imagens processadas por diferentes algoritmos.
3. O texto da placa detectado.
4. Informações adicionais como:
   - Confiança da detecção (%)
   - Tempo de processamento (ms)
   - Método que produziu o melhor resultado

### Histórico de Detecções

O sistema mantém um histórico das detecções recentes, acessível pela interface, permitindo que você reveja resultados anteriores.

## API REST

O backend expõe os seguintes endpoints para integração:

| Endpoint | Método | Descrição | Parâmetros |
|----------|--------|-----------|------------|
| `/api/detect` | POST | Envia uma imagem para processamento | `file`: arquivo de imagem |
| `/api/images` | GET | Lista imagens processadas anteriormente | - |
| `/processed/{filename}` | GET | Recupera uma imagem processada específica | `filename`: nome do arquivo |
| `/check-system` | GET | Verifica o status do sistema | - |

### Exemplo de Requisição (utilizando curl)

```bash
curl -X POST -F "file=@caminho/para/imagem.jpg" http://localhost:5000/api/detect
```

### Exemplo de Resposta

```json
{
  "results": [
    {
      "method": "original",
      "text": "ABC1D23",
      "confidence": 95,
      "processing_time": 156,
      "processed_image_path": "123abc_original.jpg"
    },
    {
      "method": "enhanced",
      "text": "ABC1D23",
      "confidence": 98,
      "processing_time": 145,
      "processed_image_path": "123abc_enhanced.jpg"
    }
  ],
  "best_result": {
    "method": "enhanced",
    "text": "ABC1D23",
    "confidence": 98,
    "processing_time": 145,
    "processed_image_path": "123abc_enhanced.jpg"
  }
}
```

## Algoritmos de Processamento

O sistema utiliza vários algoritmos de processamento de imagem para maximizar a taxa de sucesso na detecção de placas:

1. **Original**: Usa a imagem original sem modificações.
2. **Rotação**: Aplica rotações para lidar com placas em ângulos variados.
3. **Perspectiva**: Corrige distorções de perspectiva na imagem.
4. **Aprimorado**: Aplica técnicas de realce de imagem como binarização adaptativa.

O sistema tenta cada método e seleciona o resultado com maior confiança.

## Solução de Problemas

### Problemas Comuns

| Problema | Possível Solução |
|----------|------------------|
| O backend não inicia | Verifique se todas as dependências foram instaladas corretamente com `pip install -r requirements.txt` |
| Erro de CORS | Certifique-se de que o frontend está acessando a URL correta do backend |
| A detecção de placa falha | Tente com uma imagem mais clara e com melhor iluminação |
| Erro "No GPU available" | O EasyOCR funciona sem GPU, mas será mais lento. Para melhor desempenho, configure uma GPU com CUDA |

### Logs do Sistema

O backend registra informações de diagnóstico no console. Verifique esses logs para informações detalhadas sobre possíveis problemas.

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature: `git checkout -b minha-nova-feature`
3. Faça commit das suas alterações: `git commit -am 'Adiciona nova feature'`
4. Envie para a branch: `git push origin minha-nova-feature`
5. Envie um Pull Request

### Diretrizes de Código

- Mantenha o estilo de código consistente
- Adicione testes para novas funcionalidades
- Mantenha a documentação atualizada
- Siga as melhores práticas para Python (PEP 8) e JavaScript/TypeScript 