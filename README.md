# taskify
---
🧪 Desafio Técnico – Taskify 
---
**🎯 Objetivo**
---

Desenvolver uma aplicação completa para gerenciamento de tarefas (Taskify), com:
- Backend em NestJS
- Frontend em ReactJS
- Banco de dados PostgreSQL
- Containerização via Docker
- Testes E2E obrigatórios cobrindo os principais fluxos
---
🧩 Escopo Detalhado
---
Backend (NestJS + TypeScript)
- Autenticação com JWT:
  - POST /auth/register – Registro
  - POST /auth/login – Login
- CRUD de Tarefas (autenticado):
  - GET /tasks – Listar
  - POST /tasks – Criar
  - PATCH /tasks/:id – Atualizar status/título
  - DELETE /tasks/:id – Remover
- Modelo de tarefa:
  - id
  - título
  - descrição (opcional)
  - status (pendente ou concluída)
  - createdAt
  - userId
- Requisitos técnicos:
  - Proteção de rotas autenticadas com JWT
  - Validação com class-validator
  - Banco de dados PostgreSQL usando Prisma ou TypeORM
---
**Frontend (React + TypeScript)**
  - Tela de autenticação (registro/login):
  - Tabs ou páginas separadas para login e cadastro
  - Página principal (após login):
  - Lista de tarefas do usuário
  - Filtro por status: pendente, concluída, todas
  - Formulário para criar nova tarefa
  - Ações:
    - Marcar como concluída
    - Editar título
    - Deletar tarefa
  - Requisitos técnicos:
    - Hooks (useState, useEffect) para gerenciar estado
    - Interface simples e responsiva (CSS, Tailwind ou UI Library)
    - Consumo da API REST
---
🧪 Testes E2E (Obrigatórios)
Ferramenta sugerida: **Cypress** ou **Playwright**
Os seguintes cenários devem ser testados:
1. Registro de usuário
1. Login com sucesso
1. Criação de nova tarefa
1. Marcar tarefa como concluída
1. Exclusão de tarefa
1. Filtro por status (pendente/concluída)
1. Bloqueio de acesso para rotas privadas sem autenticação
1. Validações de formulário (ex: campos obrigatórios)
---
🛠️ Infraestrutura
- Criar Dockerfile para backend e frontend
  - Criar docker-compose.yml com os seguintes serviços:
    - Backend (porta 3000)
    - Frontend (porta 5173 ou 3001)
    - Banco de dados PostgreSQL
---
📌 Critérios de Avaliação
- Funcionalidade: autenticação e tarefas funcionando de ponta a ponta
- Código limpo, bem organizado e com boas práticas
- Testes E2E completos e funcionais
- Validações e tratamento de erros
- Uso correto do Docker e PostgreSQL
- Boas práticas com TypeScript (tipos, interfaces)
---
📦 Entrega
- Repositório público no GitHub
- 2 subpastas: backend/ e frontend/
- README com:
  - Instruções para rodar o projeto com Docker
  - Funcionalidades entregues
  - Como rodar os testes E2E
