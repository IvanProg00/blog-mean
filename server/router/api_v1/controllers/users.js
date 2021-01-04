const {
  sendJSON,
  sendJSONAndToken,
  sendJSONError,
} = require("../other/json_messages");
const { createObjOfSchema, cryptPassword } = require("../other/functions");
const Users = require("../../../models/Users");
const {
  INCORRECT_ID,
  USER_DELETED,
  USER_CHANGED,
  USER_CANT_DELETED,
  USER_CANT_CHANGED,
  USER_CREATED,
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
    if (err || !user) {
      res.status(BAD_REQUEST).json(sendJSONError(err));
      return;
    }
    res.status(CREATED).json(sendJSONAndToken(USER_CREATED, getJWT(user._id)));
  });
};

const changeUser = async (req, res) => {
  if (!req.next?.userEqualToken) {
    res.status(BAD_REQUEST).json(sendJSONError(USER_CANT_CHANGED));
    return;
  }
  const updateUser = createObjOfSchema(CHANGE_USER, req);

  Users.findByIdAndUpdate(
    req.next?.user?.id,
    { $set: updateUser },
    (err, user) => {
      if (err || !user) {
        res.status(BAD_REQUEST);
        res.json(sendJSONError(err));
        return;
      }
      res.status(CHANGED);
      res.json(sendJSON(USER_CHANGED));
    }
  );
};

const deleteUser = async (req, res) => {
  if (!req.next?.userEqualToken) {
    res.status(BAD_REQUEST).json(sendJSONError(USER_CANT_DELETED));
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
