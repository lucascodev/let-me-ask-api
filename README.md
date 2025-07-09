# NLW Agents

Este projeto é o **NLW Agents**, desenvolvido durante um evento da Rocketseat. Trata-se de uma API Node.js para gerenciamento de salas, utilizando Fastify, Drizzle ORM e PostgreSQL.

## Tecnologias e Bibliotecas Utilizadas
- **Node.js** + **TypeScript**
- **Fastify**: Framework web para Node.js
- **Zod**: Validação de schemas
- **Drizzle ORM**: ORM para PostgreSQL
- **PostgreSQL**: Banco de dados relacional
- **drizzle-seed**: Seed de dados para Drizzle ORM
- **@biomejs/biome** + **ultracite**: Lint e formatação de código
- **Docker**: Ambiente de banco de dados

## Arquitetura do Projeto
O projeto segue uma arquitetura modular e organizada por domínio:
- **src/http/routes/**: Define as rotas HTTP da API, separando cada recurso em seu próprio arquivo.
- **src/db/schema/**: Define os schemas das tabelas do banco de dados usando Drizzle ORM.
- **src/db/connection.ts**: Gerencia a conexão com o banco de dados PostgreSQL.
- **src/db/seed.ts**: Script para popular o banco com dados iniciais (seed).
- **docker/**: Scripts e configurações para inicialização do banco de dados com Docker.
- **src/environments.ts**: Gerenciamento de variáveis de ambiente e validação.

## Sobre o Drizzle ORM
O projeto utiliza o **Drizzle ORM** para:
- Definir schemas de tabelas de forma tipada e segura (`src/db/schema/rooms.ts`).
- Gerenciar migrações e versionamento do banco de dados.
- Realizar queries SQL de forma programática e segura.
- Popular o banco com dados fake para desenvolvimento usando o `drizzle-seed`.
- Configuração do Drizzle está em `drizzle.config.ts` e as migrações são geradas em `src/db/migrations/`.

## Como usar o Drizzle ORM
Para rodar comandos do Drizzle, utilize o `npx drizzle-kit`:

- **Gerar uma nova migration automaticamente:**
  ```bash
  npx drizzle-kit generate:pg
  ```
  Isso irá criar um novo arquivo de migration baseado nas alterações do schema.

- **Rodar as migrations no banco:**
  ```bash
  npx drizzle-kit migrate
  ```
  Aplica todas as migrations pendentes no banco de dados configurado.

- **Visualizar status das migrations:**
  ```bash
  npx drizzle-kit status:pg
  ```

> Certifique-se de que a variável `DATABASE_URL` está corretamente configurada no `.env` antes de rodar os comandos acima.

## Setup e Configuração
1. **Clone o repositório e instale as dependências:**
   ```bash
   npm install
   ```
2. **Configure o ambiente:**
   - Crie um arquivo `.env` na raiz com:
     ```env
     DATABASE_URL=postgres://docker:docker@localhost:5432/agents
     PORT=3333
     ```
3. **Suba o banco de dados com Docker:**
   ```bash
   docker-compose up -d
   ```
4. **Rode as migrações e o seed:**
   ```bash
   npm run db:seed
   ```
5. **Inicie o servidor em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

## Endpoints Principais
- `GET /health`: Health check
- `GET /rooms`: Lista as salas cadastradas

## Padrões de Código
- Lint e formatação com Biome + Ultracite (`biome.jsonc`)
- Projeto estruturado por domínio (`db`, `http/routes`, etc)

---
Rocketseat - NLW Agents 