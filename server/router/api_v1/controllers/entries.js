const { createObjOfSchema, formatErrors } = require("../functions");
const { sendJSON, sendJSONError } = require("../json_messages");
const Entries = require("../../../models/Entries");
const Users = require("../../../models/Users");
const Tags = require("../../../models/Tags");

const {
  ENTRY_CREATED,
  ENTRY_CHANGED,
  TAG_DELETED,
  ENTRY_NOT_FOUND,
} = require("../../../config/messages");
const {
  BAD_REQUEST,
  OK,
  CREATED,
  DELETED,
  CHANGED,
} = require("../../../config/status");
const {
  ALL_ENTRIES,
  ONE_ENTRY,
  ONE_USER,
  ONE_TAG,
  CHANGE_ENTRY,
  CREATE_ENTRY,
} = require("../../../config/fields");

const getAllEntries = async (_, res) => {
  let entries = await Entries.find({}, ALL_ENTRIES);

  for (let i in entries) {
    const user = await getUser(entries[i].usersId);
    if (!user) {
      continue;
    }
    const tag = await getTag(entries[i].tagsId);
    if (!tag) {
      continue;
    }

    entries[i].usersId = user;
    entries[i].tagsId = tag;
  }

  res.status(OK);
  res.json(sendJSON(entries));
};

const getEntry = (req, res) => {
  const id = req.params.id;

  Entries.findById(id, ONE_ENTRY, async (err, entry) => {
    if (err || !entry) {
      entryNotFound(res);
      return;
    }
    const tag = await getTag(entry.tagsId);
    if (!tag) {
      entryNotFound(res);
      return;
    }
    const user = await getUser(entry.usersId);
    if (!user) {
      entryNotFound(res);
      return;
    }

    entry.tagsId = tag;
    entry.usersId = user;
    res.status(OK);
    res.json(sendJSON(entry));
  });
};

const createEntry = async (req, res) => {
  const user = req.next?.user;

  const newEntry = createObjOfSchema(CREATE_ENTRY, req);
  newEntry.usersId = user._id;
  const entry = new Entries(newEntry);

  entry.save((err) => {
    if (err) {
      formatErrors(err);
      res.status(BAD_REQUEST);
      res.json(sendJSONError(errorsFormatted));
      return;
    }
    res.status(CREATED);
    res.json(sendJSON(ENTRY_CREATED));
  });
};

const changeEntry = async (req, res) => {
  const updateEntry = createObjOfSchema(CHANGE_ENTRY, req);

  Entries.findByIdAndUpdate(
    updateEntry._id,
    { $set: updateEntry },
    (err, entry) => {
      if (err || !entry) {
        res.status(BAD_REQUEST);
        res.json(sendJSONError(err));
        return;
      }
      res.status(CHANGED);
      res.json(sendJSON(ENTRY_CHANGED));
    }
  );
};

const deleteEntry = async (req, res) => {
  const id = req.params?.id;

  Entries.findByIdAndDelete(id, (err, entry) => {
    if (err || !entry) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(err));
      return;
    }
    res.status(DELETED);
    res.json(sendJSON(TAG_DELETED));
  });
};

function getUser(id) {
  return new Promise((res, rej) => {
    Users.findById(id, ONE_USER, (err, user) => {
      if (err) {
        rej(err);
        return;
      }
      res(user);
    });
  });
}

async function getTag(id) {
  let resTag;
  await Tags.findById(id, ONE_TAG, (err, tag) => {
    if (err) {
      return;
    }
    resTag = tag;
  });
  return resTag;
}

function entryNotFound(res) {
  res.status(BAD_REQUEST);
  res.json(sendJSONError(ENTRY_NOT_FOUND));
}

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  changeEntry,
  deleteEntry,
};
