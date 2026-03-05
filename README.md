Banco de dados (PostgreSQL)

Tabelas necessárias no PostgreSQL:
``` SQL
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user'
);

CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  course TEXT,
  unit TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);
```
# Portal Inscrições API

API utilizada pelo portal hospedado no GitHub Pages.

Tecnologias:
- Node.js
- Express
- PostgreSQL
- JWT

## Instalar

npm install

## Configurar

copiar .env.example para .env

## Rodar

node server.js

API rodará em:

http://localhost:3000

## Endpoints

POST /auth/login

POST /tickets

GET /tickets

PATCH /tickets/:id/approve

PATCH /tickets/:id/reject

## COMO INTEGRAR NO PORTAL ATUAL:

assets/js/api.js
```javascript
const API_URL = "http://localhost:3000";

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  return res.json();
}

export async function createTicket(data, token) {
  const res = await fetch(`${API_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export async function getTickets(token) {
  const res = await fetch(`${API_URL}/tickets`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });

  return res.json();
}
```
## DEPOIS INCLUA NO HTMLK ANTES DO APP.JS:
```javascript
<script src="./assets/js/api.js"></script>
```
