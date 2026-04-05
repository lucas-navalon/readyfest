const { Router } = require("express");
const userController = require("../controllers/userController");

const router = Router();

function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}

router.get("/listar", asyncHandler(userController.listUsers));
router.get("/buscar/:id", asyncHandler(userController.getUserById));
router.post("/criar", asyncHandler(userController.createUser));
router.put("/atualizar/:id", asyncHandler(userController.updateUser));
router.delete("/deletar/:id", asyncHandler(userController.deleteUser));

module.exports = router;
