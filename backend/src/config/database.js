const { Pool } = require("pg");

const connectionString = "postgresql://postgres:postgres@localhost:5432/readyfest";

const pool = new Pool({
  connectionString,
});

module.exports = pool;
 