# CRUD de usuario com Node.js e PostgreSQL

API simples com Express para cadastrar, listar, atualizar e remover usuarios.

## Requisitos

- Node.js 18+
- PostgreSQL

## Configuracao

1. Instale as dependencias:

```bash
npm install
```

2. Copie o arquivo de exemplo de ambiente:

```bash
cp .env.example .env
```

3. Crie o banco no PostgreSQL e execute o script:

```bash
psql -U postgres -d readyfest -f database/init.sql
```

4. Inicie a API:

```bash
npm run dev
```

## Endpoints

- `GET /users`: lista todos os usuarios
- `GET /users/:id`: busca um usuario por ID
- `POST /users`: cria um usuario
- `PUT /users/:id`: atualiza um usuario
- `DELETE /users/:id`: remove um usuario

## Exemplo de payload

```json
{
  "name": "Lucas Silva",
  "email": "lucas@email.com"
}
```
