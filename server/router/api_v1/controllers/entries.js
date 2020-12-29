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
  ENTRY_CANT_DELETED,
  USER_NOT_FOUND,
} = require("../../../messages");
const { ROOT_PRIVELEGES } = require("../../../config/config");

const schemaFields = ["_id", "title", "text", "tagsId"];
const schemaFieldsOnSave = ["usersId", "tagsId"];
const showEntriesFields = { __v: 0 };
const showUserFields = { __v: 0, password: 0 };
const showTagsField = { __v: 0 };

const getAllEntries = async (_, res) => {
  let isCorrect = true;
  let entries = await Entries.find({}, showEntriesFields);

  for (let i in entries) {
    let addUser = {};
    let addTag = {};

    await Users.findById(entries[i].usersId, showUserFields, (err, user) => {
      if (err) {
        res.status(400);
        res.json(sendJSONError(USER_NOT_FOUND));
        isCorrect = false;
        return;
      }
      addUser = user;
    });

    await Tags.findById(entries[i].tagsId, showTagsField, (err, tag) => {
      if (err) {
        res.status(400);
        res.json(sendJSONError(TAG_NOT_FOUND));
        isCorrect = false;
        return;
      }
      addTag = tag;
    });

    if (isCorrect) {
      entries[i].usersId = addUser;
      entries[i].tagsId = addTag;
    }
  }

  res.status(200);
  res.json(sendJSON(entries));
};

const getEntry = async (req, res) => {
  const id = req.params.id;

  Entries.findById(id, showEntriesFields, async (err, entry) => {
    if (err) {
      res.status(400);
      res.json(sendJSONError(INCORRECT_ID));
      return;
    }
    if (!entry) {
      res.status(400);
      res.json(sendJSONError(ENTRY_NOT_FOUND));
      return;
    }

    await Users.findById(entry.usersId, showEntriesFields, (err, user) => {
      if (err) {
        res.status(400);
        res.json(sendJSONError(USER_NOT_FOUND));
        entry = false;
      }
      entry.usersId = user;
    });
    await Tags.findById(entry.tagsId, showEntriesFields, (err, tag) => {
      if (err) {
        res.status(400);
        res.json(sendJSONError(USER_NOT_FOUND));
        entry = false;
      }
      entry.tagsId = tag;
    });

    if (entry) {
      res.status(200);
      res.json(sendJSON(entry));
    } else {
      res.json(sendJSONError(ENTRY_NOT_FOUND));
    }
  });
};

const createEntry = async (req, res) => {
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
};

const changeEntry = async (req, res) => {
  const user = await findUserByToken(req.body?.token, res);
  if (!user) {
    return;
  }

  const updateEntry = createObjOfSchema(schemaFields, req);

  Entries.findByIdAndUpdate(
    updateEntry._id,
    { $set: updateEntry },
    (err, entry) => {
      if (err) {
        res.json(sendJSONError(err));
        return;
      }
      res.json(sendJSON(ENTRY_CHANGED));
    }
  );
};

const deleteEntry = async (req, res) => {
  const user = await findUserByToken(req.body?.token, res);
  if (!user) {
    return;
  }

  if (user.privelages < ROOT_PRIVELEGES) {
    res.status(400);
    res.json(sendJSONError(ENTRY_CANT_DELETED));
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
};

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  changeEntry,
  deleteEntry,
};
