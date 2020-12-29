const { Router } = require("express");
const {
  getAllTags,
  getTag,
  createTag,
  changeTag,
  deleteTag,
} = require("../controllers/tags");

const router = Router();

// GET - Get all tags
router.get("", getAllTags);

// GET - Get one tag
router.get("/:id", getTag);

// POST - Create tag
router.post("", createTag);

// PUT - Change tag
router.put("/:id", changeTag);

// DELETE - Delete tag
router.delete("/:id", deleteTag);

module.exports = router;
