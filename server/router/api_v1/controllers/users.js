const {
  sendJSON,
  sendJSONAndToken,
  sendJSONError,
} = require("../json_messages");
const {
  createObjOfSchema,
  formatErrors,
  cryptPassword,
} = require("../functions");
const { getJWT } = require("../validators/user");
const Users = require("../../../models/Users");
const {
  USER_CREATED,
  INCORRECT_ID,
  USER_DELETED,
  USER_CHANGED,
  USER_CANT_DELETED,
} = require("../../../config/messages");
const {
  OK,
  BAD_REQUEST,
  CREATED,
  DELETED,
  CHANGED,
} = require("../../../config/status");
const {
  ALL_USERS,
  ONE_USER,
  CREATE_USER,
  CHANGE_USER,
} = require("../../../config/fields");

const getAllUsers = async (_, res) => {
  const users = await Users.find({}, ALL_USERS);
  res.status(OK);
  res.json(sendJSON(users));
};

const getUser = async (req, res) => {
  const id = req.params.id;
  Users.findById(id, ONE_USER, (err, user) => {
    if (err || !user) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(INCORRECT_ID));
      return;
    }
    res.status(OK);
    res.json(sendJSON(user));
  });
};

const createUser = (req, res) => {
  const newUser = createObjOfSchema(CREATE_USER, req);
  const user = new Users(newUser);
  user.password = cryptPassword(user.password);

  user.save((err, user) => {
    if (err) {
      err = formatErrors(err);
      res.status(BAD_REQUEST);
      res.json(sendJSONError(err));
      return;
    }
    res.status(CREATED);
    res.json(sendJSONAndToken(USER_CREATED, getJWT(user._id)));
  });
};

const changeUser = async (req, res) => {
  const id = req.next?.user?._id;
  if (tokenId !== id) {
    res.status(BAD_REQUEST);
    res.json(sendJSONError(USER_CANT_DELETED));
    return;
  }
  const updateUser = createObjOfSchema(CHANGE_USER, req);

  Users.findByIdAndUpdate(id, { $set: updateUser }, (err, user) => {
    if (err || !user) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(err));
      return;
    }
    res.status(CHANGED);
    res.json(sendJSON(USER_CHANGED));
  });
};

const deleteUser = async (req, res) => {
  const tokenId = req.next?.user?._id.toString();
  const id = req.params?.id;
  if (tokenId !== id) {
    res.status(BAD_REQUEST);
    res.json(sendJSONError(USER_CANT_DELETED));
    return;
  }

  Users.findByIdAndDelete(id, (err, user) => {
    if (err || !user) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(err));
      return;
    }
    res.status(DELETED);
    res.json(sendJSON(USER_DELETED));
  });
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  changeUser,
  deleteUser,
};
