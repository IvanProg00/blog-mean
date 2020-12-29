const { Router } = require("express");
const router = Router();

const users = require("./routes/users");
const login = require("./routes/login");
const entries = require("./routes/entries");
const tags = require("./routes/tags");

router.use("/users", users);
router.use("/login", login);
router.use("/entries", entries);
router.use("/tags", tags);

module.exports = router;
