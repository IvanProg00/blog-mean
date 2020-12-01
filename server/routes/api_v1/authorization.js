const jwt = require("jsonwebtoken");

const { JWT_KEY} = require("../../config");
const { sendJSONError } = require("./functions");
const Users = require("../../models/Users");

module.exports = {
  getJWT: (userId) => jwt.sign({ userId }, JWT_KEY),
  async validateAuthorized(token, res) {
    let id;
    try {
      id = jwt.verify(token, JWT_KEY)?.userId;
    } catch (err) {
      res.json(sendJSONError("Token is incorrect"));
      console.error(err);
      return;
    }
    const user = await Users.findById(id);

    if (!user) {
      res.json(sendJSONError("You aren't authorized."));
      return;
    }

    return id;
  },
};
