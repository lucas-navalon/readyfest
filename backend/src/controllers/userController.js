const userModel = require("../models/userModel");

function validatePayload(body) {
  const name = body.name && body.name.trim();
  const email = body.email && body.email.trim();

  if (!name || !email) {
    return "Os campos name e email sao obrigatorios.";
  }

  return null;
}

function parseUserId(id) {
  const parsedId = Number(id);

  if (!Number.isInteger(parsedId) || parsedId <= 0) {
    return null;
  }

  return parsedId;
}

function getSanitizedPayload(body) {
  return {
    name: body.name.trim(),
    email: body.email.trim(),
  };
}

async function listUsers(req, res) {
  const users = await userModel.findAll();
  res.json(users);
}

async function getUserById(req, res) {
  const userId = parseUserId(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "ID de usuario invalido." });
  }

  const user = await userModel.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "Usuario nao encontrado." });
  }

  return res.json(user);
}

async function createUser(req, res) {
  const error = validatePayload(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const user = await userModel.create(getSanitizedPayload(req.body));
    return res.status(201).json(user);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email ja cadastrado." });
    }

    throw err;
  }
}

async function updateUser(req, res) {
  const userId = parseUserId(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "ID de usuario invalido." });
  }

  const error = validatePayload(req.body);

  if (error) {
    return res.status(400).json({ message: error });
  }

  try {
    const user = await userModel.update(userId, getSanitizedPayload(req.body));

    if (!user) {
      return res.status(404).json({ message: "Usuario nao encontrado." });
    }

    return res.json(user);
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email ja cadastrado." });
    }

    throw err;
  }
}

async function deleteUser(req, res) {
  const userId = parseUserId(req.params.id);

  if (!userId) {
    return res.status(400).json({ message: "ID de usuario invalido." });
  }

  const user = await userModel.remove(userId);

  if (!user) {
    return res.status(404).json({ message: "Usuario nao encontrado." });
  }

  return res.json({ message: "Usuario removido com sucesso.", user });
}

module.exports = {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
