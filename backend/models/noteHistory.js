const mongoose = require("mongoose");
const { noteSchema } = require("./note");

const noteHistorySchema = new mongoose.Schema({
  noteId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  notes: [
    {
      type: noteSchema,
      required: true,
    },
  ],
});

const NoteHistory = mongoose.model("NoteHistory", noteHistorySchema);

exports.NoteHistory = NoteHistory;
exports.noteHistorySchema = noteHistorySchema;
