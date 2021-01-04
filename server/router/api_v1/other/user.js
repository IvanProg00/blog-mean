const {
  TOKEN_NOT_FOUND,
  TOKEN_INCORRECT,
  USER_NOT_FOUND,
  ENTRY_NOT_FOUND,
} = require("../../../config/messages");
const { JWT_KEY } = require("../../../config/config");
const jwt = require("jsonwebtoken");
const { sendJSONError } = require("./json_messages");
const Users = require("../../../models/Users");
const Entries = require("../../../models/Entries");
const { BAD_REQUEST } = require("../../../config/status");

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
  validateUserEqualToken(req, _, next) {
    const tokenId = req.next?.user?._id.toString();
    const id = req.params?.id;
    if (tokenId !== id) {
      req.next.userEqualToken = false;
    } else {
      req.next.userEqualToken = true;
    }
    next();
  },
  validateEntryUserEqualToken(req, _, next) {
    const tokenId = req.next?.user?._id.toString();
    Entries.findById(req.params?.id, (err, user) => {
      if (err || !user) {
        res.status(BAD_REQUEST).json(sendJSONError(ENTRY_NOT_FOUND));
        return;
      }
      const id = user?.usersId.toString();
      if (tokenId !== id) {
        req.next.userEqualToken = false;
      } else {
        req.next.userEqualToken = true;
      }
      next();
    });
  },
};

function validateId(tokenId, id) {
  if (tokenId === id) {
    return true;
  }
  return false;
}
