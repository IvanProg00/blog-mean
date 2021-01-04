const Users = require("../../../models/Users");
const { cryptPassword, createObjOfSchema } = require("../other/functions");
const {
  sendJSONAndToken,
  sendJSONError,
  sendJSON,
} = require("../other/json_messages");
const {
  USER_NOT_FOUND,
  SIGN_IN,
  LOGIN_REQUIRED,
} = require("../../../config/messages");
const { getJWT } = require("../other/user");
const { BAD_REQUEST, OK } = require("../../../config/status");
const { LOGIN, ONE_USER } = require("../../../config/fields");

const getUserByToken = async (req, res) => {
  const userId = req.next?.user._id;

  Users.findById(userId, ONE_USER, (err, user) => {
    if (err || !user) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(USER_NOT_FOUND));
      return;
    }

    res.status(OK);
    res.json(sendJSON(user));
  });
};

const loginUser = (req, res) => {
  const user = createObjOfSchema(LOGIN, req);
  user.password = cryptPassword(user.password);

  Users.findOne(user, (err, user) => {
    if (err || !user) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError({ other: LOGIN_REQUIRED }));
      return;
    }
    res.status(OK);
    res.json(sendJSONAndToken(SIGN_IN, getJWT(user._id)));
  });
};

module.exports = {
  loginUser,
  getUserByToken,
};
