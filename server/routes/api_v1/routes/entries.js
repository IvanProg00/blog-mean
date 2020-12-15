const { Router } = require("express");
const router = Router();

const { createObjOfSchema, findUserByToken } = require("../functions");
const { sendJSON, sendJSONError } = require("../json_messages");
const Entries = require("../../../models/Entries");
const Users = require("../../../models/Users");
const Tags = require("../../../models/Tags");

const {
  INCORRECT_ID,
  ENTRY_CREATED,
  ENTRY_CHANGED,
  TAG_NOT_FOUND,
  TAG_DELETED,
  ENTRY_NOT_FOUND,
  USER_NOT_FOUND,
} = require("../../../messages");

const schemaFields = ["title", "text"];
const schemaFieldsOnSave = ["usersId", "tagsId"];
const showAllFields = { title: 1, usersId: 1, tagsId: 1 };
const showEntriesFields = { __v: 0 };
const showUserFields = { __v: 0, password: 0 };
const showTagsField = { __v: 0 };

router.get("", async (_, res) => {
  let isCorrect = true;
  let entries = await Entries.find({}, showAllFields);

  for (let i in entries) {
    await Users.findById(entries[i].usersId, showUserFields, (err, user) => {
      if (err) {
        res.status(400);
        res.json(sendJSONError(USER_NOT_FOUND));
        isCorrect = false;
        return;
      }
      entries[i].usersId = user;
    });

    await Tags.findById(entries[i].tagsId, showTagsField, (err, tag) => {
      if (err) {
        res.status(400);
        res.json(sendJSONError(TAG_NOT_FOUND));
        isCorrect = false;
        return;
      }
      entries[i].tagsId = tag;
    });

    if (!entries) {
      entries = [];
      return;
    }
  }

  res.status(200);
  res.json(sendJSON(entries));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  Entries.findById(id, showEntriesFields, (err, entry) => {
    if (err) {
      res.json(sendJSONError(INCORRECT_ID));
      return;
    }
    Users.findById(entry.usersId, showEntriesFields);
    if (entry) {
      res.status(200);
      console.log(entry);
      res.json(sendJSON(entry));
    } else {
      res.json(sendJSONError(ENTRY_NOT_FOUND));
    }
  });
});

router.post("", async (req, res) => {
  const user = await findUserByToken(req.body?.usersId, res);
  if (!user) {
    return;
  }

  const newEntry = createObjOfSchema(
    [...schemaFields, ...schemaFieldsOnSave],
    req
  );
  newEntry.usersId = user._id;

  const entry = new Entries(newEntry);

  entry.save((err) => {
    if (err) {
      res.status(400);
      const errors = err.errors;
      const errorsFormatted = {};
      for (let key in errors) {
        errorsFormatted[key] = errors[key]?.kind;
      }
      res.json(sendJSONError(errorsFormatted));
      return;
    }
    res.status(201);
    res.json(sendJSON(ENTRY_CREATED));
  });
});

router.put("/:id", async (req, res) => {
  const user = await findUserByToken(req.body?.token, res);
  if (!user) {
    return;
  }

  const updateEntry = createObjOfSchema(schemaFields, req);

  Entries.findByIdAndUpdate(id, { $set: updateEntry }, (err, entry) => {
    if (err) {
      res.json(sendJSONError(err));
      return;
    }
    res.json(sendJSON(ENTRY_CHANGED));
  });
});

router.delete("/:id", async (req, res) => {
  const user = await findUserByToken(req.body?.token, res);
  if (!user) {
    return;
  }
  const id = req.params?.id;

  Entries.findByIdAndDelete(id, (err, entry) => {
    if (err) {
      res.json(sendJSONError(err));
      return;
    }
    if (!entry) {
      res.json(sendJSONError(TAG_NOT_FOUND));
      return;
    }
    res.json(sendJSON(TAG_DELETED));
  });
});

module.exports = router;
