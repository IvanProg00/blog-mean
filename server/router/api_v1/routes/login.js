const { Router } = require("express");
const { loginUser, getUserByToken } = require("../controllers/login");
const { findUserByToken } = require("../other/user");
const router = Router();
const validateUser = require("../validators/users");
const errorsValidation = require("../validators/errors_validation");

// GET - Get user by token
router.get(
  "/:token",
  (req, _, next) => {
    req.body.token = req.params?.token;
    next();
  },
  findUserByToken,
  getUserByToken
);

// POST - Login
router.post("", validateUser.loginUser, errorsValidation, loginUser);

module.exports = router;
