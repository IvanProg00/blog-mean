const crypto = require("crypto");
const { CRYPT_KEY } = require("../../config/config");
const { UNIQUE_VALUES } = require("../../config/messages");

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
};
