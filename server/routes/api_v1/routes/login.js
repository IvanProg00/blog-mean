const { Router } = require("express");
const router = Router();

const Users = require("../../../models/Users");
const { cryptPassword } = require("../functions");
const { sendJSONAndToken, sendJSONError } = require("../json_messages");
const { USER_NOT_FOUND, SIGN_IN } = require("../../../messages");
const { getJWT } = require("../authorization");

router.post("", async (req, res) => {
  const user = {
    username: req.body?.username,
    password: req.body?.password,
  };

  if (!(user?.username && user?.password)) {
    res.status(400);
    res.json(sendJSONError("Username and Password are required"));
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
});

module.exports = router;
