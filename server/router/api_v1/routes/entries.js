const { Router } = require("express");
const {
  getAllEntries,
  getEntry,
  createEntry,
  changeEntry,
  deleteEntry,
} = require("../controllers/entries");
const { findUserByToken, validateEntryUserEqualToken } = require("../other/user");
const { isRoot } = require("../other/privileges");
const validateEntry = require("../validators/entries");
const errorsValidation = require("../validators/errors_validation");

const router = Router();

// GET - get all entries
router.get("", getAllEntries);

// GET - Get one entry
router.get("/:id", getEntry);

// POST - Create entry
router.post(
  "",
  findUserByToken,
  validateEntry.createEntry,
  errorsValidation,
  createEntry
);

// PUT - Change entry
router.put(
  "/:id",
  findUserByToken,
  validateEntry.changeEntry,
  errorsValidation,
  validateEntryUserEqualToken,
  changeEntry
);

// DELETE - Delete entry
router.delete("/:id", findUserByToken, isRoot, deleteEntry);

module.exports = router;
