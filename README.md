# Sistema de Detecção de Placas Mercosul

Este sistema permite o reconhecimento de placas veiculares no padrão Mercosul usando processamento de imagem com OpenCV e reconhecimento óptico de caracteres com EasyOCR, com uma interface moderna em React.

## Características

- Interface web moderna em React com TypeScript
- Backend em Flask com API RESTful
- Processamento de imagem com múltiplos algoritmos para detecção de placas
- Detecção e reconhecimento de texto em placas veiculares no padrão Mercosul (ABC1D23)
- Histórico de detecções
- Interface responsiva e user-friendly
- Visualização detalhada de resultados

## Estrutura do Projeto

O projeto foi refatorado para seguir uma arquitetura de frontend e backend separados:

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
│
├── .gitignore              # Arquivos ignorados pelo Git
├── README.md               # Documentação do projeto
└── setup.py                # Script de configuração inicial
```

## Requisitos

### Backend
- Python 3.8 ou superior
- Flask 2.3.3
- OpenCV 4.5.4.60
- EasyOCR 1.6.2
- Outras dependências em `backend/requirements.txt`

### Frontend
- Node.js 16 ou superior
- React 18
- TypeScript
- Outras dependências em `frontend/package.json`

## Instalação

### Backend

1. Configure o ambiente Python e instale as dependências:

```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate
pip install -r requirements.txt
python setup.py  # Configura os diretórios necessários
```

### Frontend

1. Instale as dependências do frontend:

```bash
cd frontend
npm install
```

## Execução

### Desenvolvimento

1. Inicie o servidor de backend:

```bash
cd backend
python app.py
```

2. Em outro terminal, inicie o servidor de desenvolvimento do frontend:

```bash
cd frontend
npm run dev
```

3. Acesse o sistema no navegador:

```
http://localhost:5173
```

### Produção

1. Construa o frontend:

```bash
cd frontend
npm run build
```

2. Copie os arquivos gerados (da pasta `frontend/dist`) para a pasta `backend/static`

3. Execute apenas o backend em modo produção:

```bash
cd backend
python app.py
```

4. Acesse o sistema no navegador:

```
http://localhost:5000
```

## Integração Frontend-Backend

O frontend se comunica com o backend através de chamadas à API REST. Os principais endpoints são:

- `POST /api/detect` - Envia uma imagem para processamento e detecção de placas
- `GET /api/images` - Lista imagens processadas anteriormente
- `GET /processed/{filename}` - Recupera uma imagem processada específica

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT.

# Pequena atualização no Readme, para identificar que a partir de agora usará o claude.
# Essa atualização identifica o uso correto do projeto com repositório git para iniciar o uso de commits
#   C o p l a t e D B _ O f i c i a l  
 #   C o p l a t e D B  
 #   C o p l a t e D B  
 #   D e p l o y   t r i g g e r   0 5 / 2 6 / 2 0 2 5   2 0 : 0 6 : 2 6  
 