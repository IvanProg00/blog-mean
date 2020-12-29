const Users = require("../../../models/Users");
const { cryptPassword, createObjOfSchema } = require("../functions");
const {
  sendJSONAndToken,
  sendJSONError,
  sendJSON,
} = require("../json_messages");
const {
  USER_NOT_FOUND,
  SIGN_IN,
  LOGIN_REQUIRED,
} = require("../../../messages");
const { getJWT, validateAuthorized } = require("../authorization");
const loginKeys = ["username", "password"];

const createUser = async (req, res) => {
  const user = createObjOfSchema(loginKeys, req);

  if (!(user?.username && user?.password)) {
    res.status(400);
    res.json(sendJSONError(LOGIN_REQUIRED));
    return;
  }

  user.password = cryptPassword(user.password);

  const detectedUser = await Users.findOne(user, { _id: 1 });
  if (!detectedUser) {
    res.status(400);
    res.json(sendJSONError(USER_NOT_FOUND));
    return;
  }
  res.json(sendJSONAndToken(SIGN_IN, getJWT(detectedUser._id)));
};

const getUserByToken = async (req, res) => {
  const userId = await validateAuthorized(req.params?.token, res);
  if (!userId) return;

  Users.findById(userId, (err, user) => {
    if (err) {
      res.status(400);
      res.json(sendJSONError(USER_NOT_FOUND));
      return;
    }

    res.status(200);
    res.json(sendJSON(user));
  });
};

module.exports = {
  createUser,
  getUserByToken,
};
