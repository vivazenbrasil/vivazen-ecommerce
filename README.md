# VivaZen E-commerce

Este é o repositório do e-commerce da **VivaZen**, uma aplicação web desenvolvida para oferecer produtos naturais focados em saúde e bem-estar. O projeto foi construído utilizando as melhores práticas e tecnologias modernas do ecossistema front-end.

## 🛠 Tecnologias Utilizadas

- **[Next.js](https://nextjs.org/)** (v16.x) - Framework React com renderização híbrida e rotas otimizadas.
- **[React](https://react.dev/)** (v19.x) - Biblioteca para a construção de interfaces de usuário.
- **[Tailwind CSS](https://tailwindcss.com/)** (v4.x) - Framework de CSS utilitário para estilização rápida e responsiva.
- **[TypeScript](https://www.typescriptlang.org/)** (v5.x) - Tipagem estática para JavaScript.
- **[Lucide React](https://lucide.dev/)** - Biblioteca de ícones bonitos e consistentes.

## 📋 Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas na sua máquina:

- **[Node.js](https://nodejs.org/en/)** (Versão 20.x ou superior recomendada, pois o projeto utiliza `@types/node: ^20`).
- Um gerenciador de pacotes da sua escolha, como **npm**, **Yarn**, **pnpm** ou **Bun**.

## 🚀 Como executar o projeto localmente

Siga os passos abaixo para rodar a aplicação no seu ambiente de desenvolvimento:

### 1. Instale as dependências

Abra o terminal na pasta raiz do projeto (`vivazen-ecommerce`) e execute um dos comandos abaixo, dependendo do gerenciador de pacotes da sua preferência:

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Inicie o servidor de desenvolvimento

Após a instalação das dependências, rode o comando abaixo para iniciar o servidor local:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

O terminal indicará a porta em que o projeto está rodando. Abra o seu navegador e acesse: http://localhost:3000 (ou a porta informada).

## 📦 Scripts Disponíveis

No diretório do projeto, você pode executar os seguintes comandos principais definidos no `package.json`:

- `npm run dev`: Inicia a aplicação em modo de desenvolvimento (com Hot Module Replacement).
- `npm run build`: Cria uma versão otimizada da aplicação pronta para produção (build).
- `npm start`: Inicia o servidor Node.js de produção (requer que o `npm run build` tenha sido executado antes).
- `npm run lint`: Executa o ESLint para encontrar e corrigir problemas no código.