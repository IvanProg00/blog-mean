const { Router } = require("express");
const {
  getAllEntries,
  getEntry,
  createEntry,
  changeEntry,
  deleteEntry,
} = require("../controllers/entries");
const router = Router();

// GET - get all entries
router.get("", getAllEntries);

// GET - Get one entry
router.get("/:id", getEntry);

// POST - Create entry
router.post("", createEntry);

// PUT - Change entry
router.put("/:id", changeEntry);

// DELETE - Delete entry
router.delete("/:id", deleteEntry);

module.exports = router;
