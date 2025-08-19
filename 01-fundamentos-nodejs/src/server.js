import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

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

// req == request || res == response
const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    req.params = { ...routeParams.groups};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
