const express = require("express");
const router = express.Router();

const { createNote, getNotes, updateNote, deleteNote, searchNotes} = require("../controllers/noteControllers");
const auth = require("../middleware/auth");

router.post("/notes", auth, createNote);
router.get("/notes/search", auth, searchNotes);
router.get("/notes", auth, getNotes);
router.put("/notes/:id", auth, updateNote);
router.delete("/notes/:id", auth, deleteNote);

module.exports = router;
