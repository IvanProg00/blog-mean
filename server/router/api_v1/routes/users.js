const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  changeUser,
  deleteUser,
} = require("../controllers/users");
const { findUserByToken } = require("../validators/user");

const router = Router();

// GET - Get all users
router.get("", getAllUsers);

// GET - Get one user
router.get("/:id", getUser);

// POST - Create user
router.post("", createUser);

// PUT - Change user
router.put("/:id", findUserByToken, changeUser);

// DELETE - Delete user
router.delete("/:id", findUserByToken, deleteUser);

module.exports = router;
