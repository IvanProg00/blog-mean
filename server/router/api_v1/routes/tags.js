const { Router } = require("express");
const {
  getAllTags,
  getTag,
  createTag,
  changeTag,
  deleteTag,
} = require("../controllers/tags");
const { isRoot } = require("../other/priveleges");
const { findUserByToken } = require("../other/user");
const validateTag = require("../validators/tags");
const errorsValidation = require("../validators/errors_validation");

const router = Router();

// GET - Get all tags
router.get("", getAllTags);

// GET - Get one tag
router.get("/:id", getTag);

// POST - Create tag
router.post(
  "",
  findUserByToken,
  isRoot,
  validateTag.createTag,
  errorsValidation,
  createTag
);

// PUT - Change tag
router.put(
  "/:id",
  findUserByToken,
  isRoot,
  validateTag.changeTag,
  errorsValidation,
  changeTag
);

// DELETE - Delete tag
router.delete("/:id", findUserByToken, isRoot, deleteTag);

module.exports = router;
