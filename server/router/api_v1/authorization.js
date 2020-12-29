const jwt = require("jsonwebtoken");

const { JWT_KEY } = require("../../config/config");
const { sendJSONError } = require("./json_messages");
const Users = require("../../models/Users");
const {
  TOKEN_NOT_FOUND,
  TOKEN_INCORRECT,
  USER_NOT_FOUND,
} = require("../../messages");

module.exports = {
  getJWT: (userId) => jwt.sign({ userId }, JWT_KEY),
  async validateAuthorized(token, res) {
    if (!token) {
      res.json(sendJSONError(TOKEN_NOT_FOUND));
      res.status(400);
      return;
    }
    let id;
    try {
      id = jwt.verify(token, JWT_KEY)?.userId;
    } catch (err) {
      res.json(sendJSONError(TOKEN_INCORRECT));
      res.status(400);
      return;
    }
    const user = await Users.findById(id);

    if (!user) {
      res.json(sendJSONError(USER_NOT_FOUND));
      res.status(400);
      return;
    }

    return id;
  },
};
