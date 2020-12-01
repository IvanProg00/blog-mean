const crypto = require("crypto");
const { CRYPT_KEY } = require("../../config");

module.exports = {
  createObjOfSchema: (keys, req) => {
    const obj = {};

    for (let i of keys) {
      obj[i] = req.body[i];
    }

    return obj;
  },
  cryptPassword: (password) =>
    crypto.createHmac("sha256", CRYPT_KEY).update(password).digest("hex"),
};
