const { Router } = require("express");
const { createUser, getUserByToken } = require("../controllers/login");
const router = Router();

// GET - Get user by token
router.get("/:token", getUserByToken);

// POST - Create user
router.post("", createUser);

module.exports = router;
