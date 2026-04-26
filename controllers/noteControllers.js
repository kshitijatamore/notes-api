const Note = require("../models/Note");

// CREATE NOTE
exports.createNote = async (req, res) => {
    try {
        if (!req.body.title || !req.body.content) {
    return res.status(400).json({ error: "Title and content required" });
         }
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
            user: req.user.id
        });

        await note.save();

        res.json({ message: "Note created", note });
    } catch {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
};

// GET NOTES
exports.getNotes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;

        const notes = await Note.find({ user: req.user.id })
            .skip((page - 1) * limit)
            .limit(limit);

        res.json(notes);

    } catch {
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not allowed" });
        }

        // ✅ Safe update
        if (req.body.title) note.title = req.body.title;
        if (req.body.content) note.content = req.body.content;

        await note.save();

        res.json({ message: "Note updated", note });

    } catch (err) {
        console.log(err); // 👈 VERY IMPORTANT (see real error)
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE NOTE
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        // Check if note exists
        if (!note) {
            return res.status(404).json({ error: "Note not found" });
        }

        // 🔐 Check ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(403).json({ error: "Not allowed" });
        }

        await note.deleteOne();

        res.json({ message: "Note deleted" });

    } catch {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.searchNotes = async (req, res) => {
    try {
        const query = req.query.query;

        if (!query) {
            return res.status(400).json({ error: "Search query required" });
        }

        const notes = await Note.find({
            user: req.user.id,
            $or: [
                { title: { $regex: query, $options: "i" } },
                { content: { $regex: query, $options: "i" } }
            ]
        });

        res.json(notes);

    } catch (err) {
        console.log(err); // 👈 VERY IMPORTANT
        res.status(500).json({ error: "Server error" });
    }
};