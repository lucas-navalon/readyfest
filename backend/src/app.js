const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API de usuarios online.",
    endpoints: {
      listarUsuarios: "GET /users/listar",
      buscarUsuarioPorId: "GET /users/buscar/:id",
      criarUsuario: "POST /users/criar",
      atualizarUsuario: "PUT /users/atualizar/:id",
      deletarUsuario: "DELETE /users/deletar/:id",
    },
  });
});

app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Erro interno do servidor." });
});

module.exports = app;
