const { Router } = require("express");
const {
  getAllTags,
  getTag,
  createTag,
  changeTag,
  deleteTag,
} = require("../controllers/tags");
const { isRoot } = require("../validators/priveleges");
const { findUserByToken } = require("../validators/user");

const router = Router();

// GET - Get all tags
router.get("", getAllTags);

// GET - Get one tag
router.get("/:id", getTag);

// POST - Create tag
router.post("", findUserByToken, isRoot, createTag);

// PUT - Change tag
router.put("/:id", findUserByToken, isRoot, changeTag);

// DELETE - Delete tag
router.delete("/:id", findUserByToken, isRoot, deleteTag);

module.exports = router;
