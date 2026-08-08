# ORM Prisma com Node.js

Projeto de demonstração do **Prisma ORM** com Node.js e TypeScript, utilizando banco de dados **SQLite** para facilitar a execução sem necessidade de configurar servidores externos.

## O que é este projeto?

Este repositório serve como material didático para aprender os principais conceitos do Prisma ORM:

- **CRUD básico** — criar, ler, atualizar e deletar registros
- **Relação 1:1** — Um curso tem um professor (`Courses` ↔ `Teachers`)
- **Relação 1:N** — Um autor tem vários livros (`Authors` → `Books`)
- **Relação N:N** — Cursos têm vários módulos e módulos pertencem a vários cursos (`Courses` ↔ `Modules` via tabela intermediária `CoursesModules`)
- **Queries com filtros** — `findMany` com `where`, `include`, `AND`, etc.
- **Nested writes** — `create`, `connect`, `connectOrCreate` em relações

## Estrutura do banco de dados

```
┌──────────────┐       1:1       ┌──────────────┐
│   Teachers   │◄───────────────│   Courses    │
└──────────────┘                 └──────┬───────┘
                                        │
                                        │ N:N (via CoursesModules)
                                        │
                                 ┌──────┴───────┐
                                 │   Modules    │
                                 └──────────────┘

┌──────────────┐       1:N       ┌──────────────┐
│   Authors    │────────────────►│    Books     │
└──────────────┘                 └──────────────┘
```

## Pré-requisitos

- [Node.js](https://nodejs.org/) v16 ou superior
- npm (vem junto com o Node.js)

Não é necessário instalar nenhum banco de dados — o projeto usa **SQLite**, que é um arquivo local.

## Como executar pela primeira vez

```bash
# 1. Clone o repositório
git clone https://github.com/brunobandeirafernandes/ORM_Prisma_Node.git
cd ORM_Prisma_Node

# 2. Instale as dependências
npm install

# 3. Crie o banco de dados e aplique as migrations
npx prisma migrate dev --name init

# 4. Gere o Prisma Client
npx prisma generate

# 5. Popule o banco com dados de exemplo
npx ts-node src/seed.ts
```

Pronto! O banco SQLite (`prisma/dev.db`) estará criado e populado com dados de demonstração.

## Executando os exemplos

Cada arquivo na pasta `src/` demonstra uma operação específica do Prisma. Para executar qualquer um deles:

```bash
npx ts-node src/<pasta>/<arquivo>.ts
```

### Exemplos disponíveis

| Arquivo | O que faz |
|---------|-----------|
| `src/seed.ts` | Popula o banco com dados completos de exemplo |
| `src/Old_Courses/create.ts` | Cria um curso simples (sem relações) |
| `src/Old_Courses/findMany.ts` | Busca cursos com filtro por nome |
| `src/Old_Courses/update.ts` | Atualiza um curso existente |
| `src/Old_Courses/delete.ts` | Deleta um curso pelo ID |
| `src/Courses/create.ts` | Cria curso com `connectOrCreate` de teacher |
| `src/Courses/create_non_exist_teacher.ts` | Cria curso + teacher novo (nested create) |
| `src/Courses/create_exist_teacher.ts` | Cria curso conectando a teacher existente |
| `src/Courses/create_fk_teacher.ts` | Cria curso passando FK diretamente |
| `src/Courses/findRelation.ts` | Busca cursos com teacher e modules incluídos |
| `src/Courses/findRelation_where.ts` | Busca cursos com filtro `where` |
| `src/Modules/createManyToMany.ts` | Cria relação N:N manualmente |
| `src/Modules/create_exist_relation.ts` | Cria módulo conectando a curso existente |
| `src/Modules/create_non_exist_both.ts` | Cria curso + módulo + relação de uma vez |
| `src/Modules/delete_coursesModules.ts` | Remove uma relação N:N |
| `src/Author/create_many.ts` | Cria autor com vários livros (relação 1:N) |
| `src/search/findByCourse.ts` | Busca curso por ID com modules |
| `src/search/findByRelation.ts` | Lista todas as relações CoursesModules |

## Prisma Studio

Para visualizar e editar o banco de dados por uma interface gráfica:

```bash
npx prisma studio
```

Abre no navegador em `http://localhost:5555`.

## Resetar o banco

Se quiser limpar tudo e começar do zero:

```bash
npx prisma migrate reset
npx ts-node src/seed.ts
```

## Tecnologias

- **Node.js** + **TypeScript**
- **Prisma ORM** v5
- **SQLite** (banco local, zero configuração)
- **ts-node** (execução direta de TypeScript)

## Observações importantes

- Os arquivos em `src/Old_Courses/` e scripts que usam IDs fixos (UUIDs) só funcionam se o registro correspondente existir no banco. Use o `seed.ts` para popular o banco antes.
- O campo `teacher` em `Courses` é opcional — um curso pode existir sem professor vinculado.
- A relação N:N entre Courses e Modules usa uma tabela intermediária explícita (`CoursesModules`), que é o padrão recomendado pelo Prisma para quando você precisa de campos extras na relação (como `created_at`).
