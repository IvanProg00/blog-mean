const { Router } = require("express");
const {
  getAllEntries,
  getEntry,
  createEntry,
  changeEntry,
  deleteEntry,
} = require("../controllers/entries");
const { findUserByToken } = require("../validators/user");
const { isRoot } = require("../validators/priveleges");
const router = Router();

// GET - get all entries
router.get("", getAllEntries);

// GET - Get one entry
router.get("/:id", getEntry);

// POST - Create entry
router.post("", findUserByToken, createEntry);

// PUT - Change entry
router.put("/:id", findUserByToken, changeEntry);

// DELETE - Delete entry
router.delete("/:id", findUserByToken, isRoot, deleteEntry);

module.exports = router;
