const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/readyfest";

const pool = new Pool({
  connectionString,
});

module.exports = pool;
