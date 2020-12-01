const { Router } = require("express");
const router = Router();

const { sendJSON, sendJSONError } = require("../json_messages");
const { createObjOfSchema } = require("../functions");
const Tags = require("../../../models/Tags");
const { INCORRECT_ID, TAG_NOT_FOUND, TAG_DELETED, TAG_CREATED, TAG_CHANGED } = require("../../../messages");

const schemaFields = ["title"];
const showAllFields = { title: 1 };
const showOneField = { __v: 0 };

router.get("", async (_, res) => {
  const users = await Tags.find({}, showAllFields);

  res.json(sendJSON(users));
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  Tags.findById(id, showOneField, (err, entry) => {
    if (err) {
      res.json(sendJSONError(INCORRECT_ID));
      return;
    }
    if (entry) {
      res.json(sendJSON(entry));
    } else {
      res.json(sendJSONError(TAG_NOT_FOUND));
    }
  });
});

router.post("", (req, res) => {
  const newTag = createObjOfSchema(schemaFields, req);
  console.log(newTag);
  const tag = new Tags(newTag);

  tag.save((err) => {
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
    res.json(sendJSON(TAG_CREATED));
  });
});

router.put("/:id", (req, res) => {
  const updateTag = createObjOfSchema(schemaFields, req);

  Tags.findByIdAndUpdate(id, { $set: updateTag }, (err) => {
    if (err) {
      res.json(sendJSONError(err));
      return;
    }
    res.json(sendJSON(TAG_CHANGED));
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params?.id;

  Tags.findByIdAndDelete(id, (err, entry) => {
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
