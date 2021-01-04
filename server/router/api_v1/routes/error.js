const { Router } = require("express");
const { NOT_FOUND } = require("../../../config/status");
const { sendJSONError } = require("../other/json_messages");
const router = Router();

router.use((_, res) => {
  res.status(NOT_FOUND).json(sendJSONError("Api Not Found."));
});

module.exports = router;
