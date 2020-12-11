const { Router } = require("express");
const router = Router();

const { sendJSON, sendJSONError } = require("../json_messages");
const {
  createObjOfSchema,
  cryptPassword,
  formatErrors,
} = require("../functions");
const { getJWT, validateAuthorized } = require("../authorization");
const Users = require("../../../models/Users");
const {
  USER_CREATED,
  INCORRECT_ID,
  USER_NOT_FOUND,
  USER_DELETED,
  USER_CHANGED,
} = require("../../../messages");

const schemaFields = ["username", "password", "email"];
const showAllFields = { username: 1, email: 1 };
const showOneField = { __v: 0 };

router.get("", async (req, res) => {
  const users = await Users.find({}, showAllFields);
  res.json(sendJSON(users));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Users.findById(id, showOneField, (err, entry) => {
    if (err) {
      res.status(400);
      res.json(sendJSONError(INCORRECT_ID));
      return;
    }
    if (entry) {
      res.json(sendJSON(entry));
    } else {
      res.json(sendJSONError(USER_NOT_FOUND));
    }
  });
});

router.post("", (req, res) => {
  const newUser = createObjOfSchema(schemaFields, req);
  const user = new Users(newUser);

  let err = user.validateSync();
  const passwdErr = validatePassword(user.password);
  if (passwdErr) {
    if (passwdErr) {
      if (!err) {
        err = {
          errors: {}
        }
      }
      err.errors = { ...passwdErr, ...err.errors };
    }
  }
  if (err) {
    res.status(400);
    res.json(sendJSONError(formatErrors(err)));
    return;
  }
  user.password = cryptPassword(newUser?.password.toString());

  user.save((err, user) => {
    if (err) {
      err = formatErrors(err);
      res.status(400);
      res.json(sendJSONError(err));
      return;
    }
    res.status(201);
    res.json(sendJSON({ message: USER_CREATED, token: getJWT(user._id) }));
  });
});

router.put("/:id", (req, res) => {
  const id = validateAuthorized(req.params?.token, res);
  if (id) {
    const updateEntry = createObjOfSchema(schemaFields, req);

    Users.findByIdAndUpdate(id, { $set: updateEntry }, (err) => {
      if (err) {
        res.json(sendJSONError(err));
        return;
      }
      res.json(sendJSON(USER_CHANGED));
    });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params?.id;

  Users.findByIdAndDelete(id, (err, entry) => {
    if (err) {
      res.json(sendJSONError(err));
      return;
    }
    if (!entry) {
      res.json(sendJSONError(USER_NOT_FOUND));
      return;
    }
    res.json(sendJSON(USER_DELETED));
  });
});

function validatePassword(pass) {
  const minPasswordLength = 6;
  const maxPasswordLength = 18;
  if (pass < minPasswordLength || pass > maxPasswordLength) {
    return {
      password: {
        kind: `Password must be minimum ${minPasswordLength} and maximum ${maxPasswordLength} length`,
      },
    };
  }
}

module.exports = router;
