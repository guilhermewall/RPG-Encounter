# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)

- [Diagrama ER](#2-diagrama-er)

- [Documentação](#3-documentação)

- [Rodando localmente](#4-rodando-localmente)

## 1. Visão Geral
Visão geral do projeto, um pouco das tecnologias usadas.

- **[NodeJs](https://nodejs.org/en/)**

- **[Express](https://expressjs.com/pt-br/)**

- **[TypeScript](https://www.typescriptlang.org/)**

- **[Postgres](https://www.postgresql.org/)**

- **[TypeORM](https://typeorm.io/)**

- **[Yup](https://www.npmjs.com/package/yup)**

A URL base da aplicação: 

https://project-m4-backend-rpgencounter.onrender.com

## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)

- **[Diagrama](https://imgur.com/a/BYVedEX)**

Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

## 3. Documentação
[ Voltar para o topo ](#tabela-de-conteúdos)

Link com a **[Documentação](https://projeto-m4.vercel.app/)**

## 4. Rodando localmente
[ Voltar para o topo ](#tabela-de-conteúdos)

### 4.1 Instale as dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```bash
  yarn
```

### 4.2 Variáveis de Ambiente

Em seguida, crie um arquivo .env, copiando o formato do arquivo .env.example:

```bash
  cp .env.example .env
```
### 4.3 Migrations

Execute as migrations com o comando:

```bash
  yarn typeorm migration:run -d src/data-source.ts
```

