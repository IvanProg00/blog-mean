const { createObjOfSchema, formatErrors } = require("../other/functions");
const { sendJSON, sendJSONError } = require("../other/json_messages");
const Entries = require("../../../models/Entries");
const Users = require("../../../models/Users");
const Tags = require("../../../models/Tags");

const {
  ENTRY_CREATED,
  ENTRY_CHANGED,
  ENTRY_NOT_FOUND,
  ENTRY_DELETED,
  ENTRY_CANT_CHANGED,
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

  for (let i = entries.length - 1; i >= 0; i--) {
    let entryHasInfo = false;

    const user = await getUser(entries[i]?.usersId);
    if (!user) {
      entryHasInfo = true;
    }
    const tag = await getTag(entries[i]?.tagsId);
    if (!tag && !entryHasInfo) {
      entryHasInfo = true;
    }

    if (entryHasInfo) {
      dropEntry(entries[i]._id);
      entries = [...entries.slice(0, i), ...entries.slice(i + 1)];
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
      dropEntry(entry);
      return;
    }
    const user = await getUser(entry.usersId);
    if (!user) {
      entryNotFound(res);
      // dropEntry(id);
      dropEntry(entry);
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
      res.status(BAD_REQUEST);
      res.json(sendJSONError(err));
      return;
    }
    res.status(CREATED);
    res.json(sendJSON(ENTRY_CREATED));
  });
};

const changeEntry = async (req, res) => {
  if (!req.next?.userEqualToken) {
    res.status(BAD_REQUEST).json(sendJSONError(ENTRY_CANT_CHANGED));
    return;
  }

  const updateEntry = createObjOfSchema(CHANGE_ENTRY, req);
  Entries.findByIdAndUpdate(
    updateEntry._id,
    { $set: updateEntry },
    (err, entry) => {
      if (err || !entry) {
        res.status(BAD_REQUEST).json(sendJSONError(err));
        return;
      }
      res.status(CHANGED).json(sendJSON(ENTRY_CHANGED));
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
    res.json(sendJSON(ENTRY_DELETED));
  });
};

async function getUser(id) {
  let resUser;
  resUser = await Users.findById(id, ONE_USER);
  return resUser;
}

async function getTag(id) {
  let resTag;
  resTag = await Tags.findById(id, ONE_TAG);
  return resTag;
}

function entryNotFound(res) {
  res.status(BAD_REQUEST);
  res.json(sendJSONError(ENTRY_NOT_FOUND));
}

function dropEntry(entryId) {
  Entries.findByIdAndDelete(entryId, (err) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(`Entry with id ${entryId} deleted.`);
  });
}

module.exports = {
  getAllEntries,
  getEntry,
  createEntry,
  changeEntry,
  deleteEntry,
};
