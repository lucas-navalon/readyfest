const pool = require("../config/database");

async function findAll() {
  const result = await pool.query(
    "SELECT id, name, email, created_at, updated_at FROM users ORDER BY id ASC"
  );

  return result.rows;
}

async function findById(id) {
  const result = await pool.query(
    "SELECT id, name, email, created_at, updated_at FROM users WHERE id = $1",
    [id]
  );

  return result.rows[0] || null;
}

async function create({ name, email }) {
  const result = await pool.query(
    `INSERT INTO users (name, email)
     VALUES ($1, $2)
     RETURNING id, name, email, created_at, updated_at`,
    [name, email]
  );

  return result.rows[0];
}

async function update(id, { name, email }) {
  const result = await pool.query(
    `UPDATE users
     SET name = $1,
         email = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING id, name, email, created_at, updated_at`,
    [name, email, id]
  );

  return result.rows[0] || null;
}

async function remove(id) {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id, name, email, created_at, updated_at",
    [id]
  );

  return result.rows[0] || null;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};
