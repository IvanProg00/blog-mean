const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  changeUser,
  deleteUser,
} = require("../controllers/users");

const router = Router();

// GET - Get all users
router.get("", getAllUsers);

// GET - Get one user
router.get("/:id", getUser);

// POST - Create user
router.post("", createUser);

// PUT - Change user
router.put("/:id", changeUser);

// DELETE - Delete user
router.delete("/:id", deleteUser);

module.exports = router;
