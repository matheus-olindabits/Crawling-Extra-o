import app from "./app.js";
import http from "http";

const server = http.createServer(app);

server.listen(3000, () => {
  console.log(`API rodando na porta http://localhost:3000`);
});
