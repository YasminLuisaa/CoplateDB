# Guia de Execução do Sistema de Detecção de Placas Mercosul

Este guia fornece instruções passo a passo para configurar e executar o Sistema de Detecção de Placas Mercosul, tanto em ambiente de desenvolvimento quanto em produção.

## Pré-requisitos

Certifique-se de ter instalado:

- Git
- Python 3.8 ou superior
- Node.js 16 ou superior
- NPM ou Yarn

## Preparação do Ambiente

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/sistema-placas-mercosul.git
cd sistema-placas-mercosul
```

### 2. Configuração do Backend

```bash
# Acesse o diretório do backend
cd backend

# Crie um ambiente virtual Python
python -m venv venv

# Ative o ambiente virtual (Windows)
venv\Scripts\activate

# Ou ative o ambiente virtual (Linux/Mac)
# source venv/bin/activate

# Instale as dependências do backend
pip install -r requirements.txt

# Execute o script de configuração
python setup.py

# Volte para o diretório raiz
cd ..
```

### 3. Configuração do Frontend

```bash
# Acesse o diretório do frontend
cd frontend

# Instale as dependências do frontend
npm install

# Volte para o diretório raiz
cd ..
```

## Execução em Ambiente de Desenvolvimento
cd
Para desenvolvimento, você precisa executar o backend e o frontend em terminais separados.

### Terminal 1: Backend

```bash
# Acesse o diretório do backend
cd backend

# Ative o ambiente virtual (Windows)
venv\Scripts\activate

# Ou ative o ambiente virtual (Linux/Mac)
# source venv/bin/activate

# Execute o backend
python app.py
```

O backend estará disponível em:
### Terminal 2: Frontend

```bash
# Acesse o diretório do frontend
cd frontend

```

O frontend estará disponível em: http://localhost:5173

Durante o desenvolvimento, acesse a aplicação através da URL do frontend: http://localhost:5173

## Execução em Ambiente de Produção

Para produção, você pode servir o frontend diretamente do backend Flask.

```bash
# Acesse o diretório do frontend
cd frontend

# Construa o frontend para produção
npm run build

# Copie os arquivos para o diretório static do backend
# No Windows:
xcopy /E /Y dist\* ..\backend\static\

# No Linux/Mac:
# cp -r dist/* ../backend/static/

# Acesse o diretório do backend
cd ../backend

# Ative o ambiente virtual (Windows)
venv\Scripts\activate

# Ou ative o ambiente virtual (Linux/Mac)
# source venv/bin/activate

# Execute o backend
python app.py
```

Em produção, acesse a aplicação através da URL do backend: http://localhost:5000

## Verificação do Sistema

Para verificar se o sistema está funcionando corretamente:

1. Acesse a URL da aplicação no navegador
2. Na página inicial, faça o upload de uma imagem contendo uma placa de veículo no padrão Mercosul
3. Verifique se o sistema processa a imagem e detecta o texto da placa

## Solução de Problemas Comuns

### Erro ao Iniciar o Backend

- Verifique se as dependências foram instaladas corretamente
- Certifique-se de que o ambiente virtual está ativado
- Verifique se as pastas "uploads" e "processed" foram criadas

```bash
# Crie manualmente as pastas se necessário
mkdir -p backend/uploads backend/processed
```

### Erro ao Iniciar o Frontend

- Verifique se o Node.js está instalado corretamente
- Certifique-se de que as dependências foram instaladas

```bash
# Reinstale as dependências se necessário
cd frontend
rm -rf node_modules
npm install
```

### Erro de CORS

- Verifique se o frontend está acessando a URL correta do backend
- Certifique-se de que o backend tem o CORS configurado corretamente

### Erros de Reconhecimento de Placa

- Use imagens com boa resolução e iluminação
- Certifique-se de que a placa está visível e em primeiro plano na imagem
- Verifique se a placa está no padrão Mercosul (formato ABC1D23) 