const crypto = require("crypto");
const { CRYPT_KEY } = require("../../config");
const { UNIQUE_VALUES, TOKEN_NOT_FOUND } = require("../../messages");
const Users = require("../../models/Users");
const { validateAuthorized } = require("./authorization");
const { sendJSONError } = require("./json_messages");

module.exports = {
  createObjOfSchema: (keys, req) => {
    const obj = {};

    for (let i of keys) {
      obj[i] = req.body[i];
    }

    return obj;
  },
  cryptPassword: (password) => {
    return crypto
      .createHmac("sha256", CRYPT_KEY)
      .update(password)
      .digest("hex");
  },
  formatErrors(errors) {
    const errorsFormatted = {};

    if (errors?.keyPattern) {
      for (let key in errors?.keyPattern) {
        errorsFormatted[key] = UNIQUE_VALUES[key];
      }
      return errorsFormatted;
    }

    errors = errors.errors;

    for (let key in errors) {
      errorsFormatted[key] = errors[key]?.kind;
    }

    return errorsFormatted;
  },
  async findUserByToken(token, res) {
    let user;
    if (token) {
      user = await Users.findById(await validateAuthorized(token, res));
    }
    if (!user) {
      res.status(400);
      res.json(sendJSONError(TOKEN_NOT_FOUND));
      return;
    }
    return user;
  },
};
