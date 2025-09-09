# Kirvano Frontend

Aplicação frontend desenvolvida usando arquitetura de microfrontends com React e TypeScript, construída para integrar com o backend Kirvano Case.

## 🧪 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Module Federation](https://module-federation.github.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)

## 🚀 Como executar

Clone o projeto e acesse a pasta do mesmo.

```bash
$ git clone https://github.com/Brunoocn/kirvano-frontend.git
$ cd kirvano-frontend
```

Para iniciá-lo, siga os passos abaixo:

```bash
# Instalar todas as dependências
$ npm run install

$ npm run preview
```

A aplicação principal (host) irá subir na porta http://localhost:4173.

Os microfrontends estarão rodando em:
- Todos MFE: http://localhost:3001
- Users MFE: http://localhost:3002


## ⚙️ Configuração de Ambiente

Configure as variáveis de ambiente para os microfrontends:

```env
VITE_API_BASE_URL=http://localhost:3005
```

## ⚗️ Arquitetura

O projeto utiliza a arquitetura de **Microfrontends** com Module Federation, organizada da seguinte forma:

### 📁 Estrutura do Projeto

```
kirvano-frontend/
├── host/                    # Aplicação host principal
│   ├── src/
│   │   ├── pages/          # Páginas da aplicação
│   │   |── routes/         # Configuração de rotas
│   │  
│   └── vite.config.ts      # Configuração Vite + Federation
├── todos-mfe/              # Microfrontend de Todos
│   ├── src/
│   │   └── index-federation.tsx
│   └── vite.config.ts
├── users-mfe/              # Microfrontend de Usuários
│   ├── src/
│   │   └── index-federation.tsx
│   └── vite.config.ts
└── package.json            # Scripts principais
```

### 🎨 Padrões de Design

- **UI**: TailwindCSS para estilização consistente
- **Forms**: React Hook Form + Zod para validação
- **State Management**: TanStack Query para estado do servidor
- **HTTP Client**: Axios com configuração compartilhada
- **TypeScript**: Tipagem forte em toda a aplicação

## 🚀 Melhorias/Próximos passos

- **Turborepo**: Migrar para Turborepo para melhor gerenciamento de monorepo, cache de builds e execução de tarefas em paralelo
- **Testes**: Implementar testes unitários e de integração com Vitest/Testing Library
- **Monitoramento**: Integração com ferramentas de observabilidade (Sentry, Analytics)
- **Deploy**: Deploy em plataformas como Vercel, Netlify ou AWS S3 + CloudFront
- **Design System**: Criar biblioteca de componentes compartilhada
