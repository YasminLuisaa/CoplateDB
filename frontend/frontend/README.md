# Frontend do Sistema de Detecção de Placas Mercosul

Este é o frontend do Sistema de Detecção de Placas Mercosul, construído com React, TypeScript e Vite.

## Tecnologias Utilizadas

- **React 18**: Biblioteca de UI para construção de interfaces modernas
- **TypeScript**: Adiciona tipagem estática ao JavaScript
- **Vite**: Build tool extremamente rápida e moderna
- **React Router DOM**: Para roteamento de páginas
- **React Hook Form**: Para gerenciamento de formulários
- **React Query**: Para gerenciamento de estado do servidor
- **Tailwind CSS**: Framework CSS utility-first para estilização eficiente
- **Radix UI**: Biblioteca de componentes acessíveis e sem estilo
- **Shadcn UI**: Componentes reutilizáveis construídos com Radix UI e Tailwind

## Estrutura do Projeto

```
src/
├── components/     # Componentes React reutilizáveis
├── hooks/          # Hooks personalizados
├── lib/            # Utilitários e funções de ajuda
├── pages/          # Páginas da aplicação
├── services/       # Serviços para comunicação com a API
├── App.tsx         # Componente raiz da aplicação
└── main.tsx        # Ponto de entrada da aplicação
```

## Scripts Disponíveis

- **dev**: Inicia o servidor de desenvolvimento
  ```
  npm run dev
  ```

- **build**: Compila a aplicação para produção
  ```
  npm run build
  ```

- **lint**: Executa a verificação de linting
  ```
  npm run lint
  ```

- **preview**: Visualiza a build de produção localmente
  ```
  npm run preview
  ```

## Comunicação com o Backend

O frontend se comunica com o backend Flask através de endpoints REST:

- `POST /api/detect`: Envia imagens para detecção de placas
- `GET /api/images`: Obtém o histórico de imagens processadas
- `GET /processed/{filename}`: Recupera uma imagem processada específica

## Componentes Principais

- **ImageUploader**: Permite o upload de imagens para processamento
- **ResultViewer**: Exibe os resultados do processamento de imagem
- **HistoryList**: Mostra o histórico de imagens processadas
- **PlateDisplay**: Exibe informações da placa detectada

## Configuração

A configuração da URL da API é feita no arquivo `src/services/api.ts`. Por padrão, aponta para `http://localhost:5000` em desenvolvimento.

## Estilização

O projeto utiliza Tailwind CSS para estilização, com componentes base do Shadcn UI. Os componentes são estilizados de forma consistente seguindo uma abordagem utilitária.

## Desenvolvimento

Para contribuir com o desenvolvimento do frontend:

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute o servidor de desenvolvimento com `npm run dev`
4. Implemente suas alterações
5. Execute o linting com `npm run lint`
6. Faça o build com `npm run build` para verificar problemas de compilação
