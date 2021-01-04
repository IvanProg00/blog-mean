const { validationResult } = require("express-validator");
const { formatErrors } = require("../other/functions");
const { BAD_REQUEST } = require("../../../config/status");
const { sendJSONError } = require("../other/json_messages");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = formatErrors(errors.array());
    res.status(BAD_REQUEST).json(sendJSONError(err));
    return;
  }
  next();
};
