const { sendJSON, sendJSONError } = require("../json_messages");
const { createObjOfSchema, formatErrors } = require("../functions");
const Tags = require("../../../models/Tags");
const {
  INCORRECT_ID,
  TAG_DELETED,
  TAG_CREATED,
  TAG_CHANGED,
} = require("../../../config/messages");
const {
  ALL_TAGS,
  ONE_TAG,
  CREATE_TAG,
  CHANGE_TAG,
} = require("../../../config/fields");
const {
  BAD_REQUEST,
  CREATED,
  CHANGED,
  OK,
  DELETED,
} = require("../../../config/status");

const getAllTags = async (_, res) => {
  const tags = await Tags.find({}, ALL_TAGS);

  res.json(sendJSON(tags));
};

const getTag = (req, res) => {
  const id = req.params?.id;

  Tags.findById(id, ONE_TAG, (err, tag) => {
    if (err || !tag) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(INCORRECT_ID));
      return;
    }
    res.status(OK);
    res.json(sendJSON(tag));
  });
};

const createTag = async (req, res) => {
  const newTag = createObjOfSchema(CREATE_TAG, req);
  const tag = new Tags(newTag);

  tag.save((err) => {
    if (err) {
      const errors = formatErrors(err);
      res.status(BAD_REQUEST);
      res.json(sendJSONError(errors));
      return;
    }
    res.status(CREATED);
    res.json(sendJSON(TAG_CREATED));
  });
};

const changeTag = async (req, res) => {
  const updateTag = createObjOfSchema(CHANGE_TAG, req);

  Tags.findByIdAndUpdate(req.params?.id, { $set: updateTag }, (err, tag) => {
    if (err || !tag) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(err));
      return;
    }
    res.status(CHANGED);
    res.json(sendJSON(TAG_CHANGED));
  });
};

const deleteTag = async (req, res) => {
  const id = req.params?.id;

  Tags.findByIdAndDelete(id, (err, tag) => {
    if (err || !tag) {
      res.status(BAD_REQUEST);
      res.json(sendJSONError(err));
      return;
    }
    res.status(DELETED);
    res.json(sendJSON(TAG_DELETED));
  });
};

module.exports = {
  getAllTags,
  getTag,
  createTag,
  changeTag,
  deleteTag,
};
