const crypto = require("crypto");
const { CRYPT_KEY } = require("../../../config/config");
const { UNIQUE_VALUES } = require("../../../config/messages");

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

    for (let error of errors) {
      errorsFormatted[error?.param] = error?.msg;
    }

    return errorsFormatted;
  },
};
