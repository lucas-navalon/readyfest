require("dotenv").config();
const app = require("./app");
const pool = require("./config/database");

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("Conexao com PostgreSQL realizada com sucesso.");

    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Erro ao conectar no PostgreSQL:", error.message);
    process.exit(1);
  }
}

startServer();
