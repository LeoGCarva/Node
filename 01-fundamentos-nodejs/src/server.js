import http from "node:http";

// metodo e url
// basicamente a rota que se forma
// tanto o método quanto a URL estão disponiveis no "req"

// método sendo:
//
// GET => Buscar um recurso do back
// POST => Criar um recurso no back
// PUT => Atualizar um recurso no back
// PATCH => Atualizar uma informação específica de um recurso no back
// DELETE => Deleta um recurso no back

// URL sendo: por exemplo /users ou /editUser

const users = [];

// req == request || res == response
const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "Leo Carva",
      email: "leocarva@example.com",
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);
