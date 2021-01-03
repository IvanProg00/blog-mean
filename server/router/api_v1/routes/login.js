const { Router } = require("express");
const { loginUser, getUserByToken } = require("../controllers/login");
const { findUserByToken } = require("../validators/user");
const router = Router();

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

// POST - Create user
router.post("", loginUser);

module.exports = router;
