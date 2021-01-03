const {
  TOKEN_NOT_FOUND,
  TOKEN_INCORRECT,
} = require("../../../config/messages");
const { JWT_KEY } = require("../../../config/config");
const { USER_NOT_FOUND } = require("../../../config/messages");
const jwt = require("jsonwebtoken");
const { sendJSONError } = require("../json_messages");
const Users = require("../../../models/Users");

module.exports = {
  async findUserByToken(req, res, next) {
    const token = req.body?.token;
    if (!token) {
      res.status(400);
      res.json(sendJSONError(TOKEN_NOT_FOUND));
      return;
    }
    let id;
    try {
      id = jwt.verify(token, JWT_KEY)?.userId;
    } catch (err) {
      res.status(400);
      res.json(sendJSONError(TOKEN_INCORRECT));
      return;
    }
    const user = await Users.findById(id);

    if (!user) {
      res.status(400);
      res.json(sendJSONError(USER_NOT_FOUND));
      return;
    }

    req.next.user = user;
    next();
  },
  getJWT: (userId) => jwt.sign({ userId }, JWT_KEY),
};
