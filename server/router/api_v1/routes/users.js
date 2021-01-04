const { Router } = require("express");
const {
  getAllUsers,
  getUser,
  createUser,
  changeUser,
  deleteUser,
} = require("../controllers/users");
const { findUserByToken, validateUserEqualToken } = require("../other/user");
const errorsValidation = require("../validators/errors_validation");
const validateUser = require("../validators/users");

const router = Router();

// GET - Get all users
router.get("", getAllUsers);

// GET - Get one user
router.get("/:id", getUser);

// POST - Create user
router.post("", validateUser.createUser, errorsValidation, createUser);

// PUT - Change user
router.put(
  "/:id",
  findUserByToken,
  validateUser.changeUser,
  errorsValidation,
  validateUserEqualToken,
  changeUser
);

// DELETE - Delete user
router.delete("/:id", findUserByToken, validateUserEqualToken, deleteUser);

module.exports = router;
