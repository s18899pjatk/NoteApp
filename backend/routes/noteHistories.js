const { NoteHistory } = require("../models/noteHistory");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const validateId = require("../middlewares/validateId");

router.get("/", async (req, res) => {
  const notehist = await NoteHistory.find().select("-__v").sort("noteId");
  res.send(notehist);
});

router.get("/:id", validateId, async (req, res) => {
  const notehist = await NoteHistory.findById(req.params.id).select("-__v");

  if (!notehist)
    return res
      .status(404)
      .send("The note history with the given ID was not found.");

  res.send(notehist);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const noteHistory = new NoteHistory({
    noteId: req.body.noteId,
    notes: req.body.notes,
  });

  await noteHistory.save();
  res.send(noteHistory);
});

router.put("/:id", validateId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const noteHistory = await NoteHistory.findByIdAndUpdate(
    req.params.id,
    {
      noteId: req.body.noteId,
      notes: req.body.notes,
    },
    { new: true }
  );

  if (!noteHistory)
    return res.status(404).send("The note with the given ID was not found.");

  res.send(noteHistory);
});

router.delete("/:id", validateId, async (req, res) => {
  const noteHistory = await NoteHistory.findByIdAndRemove(req.params.id);

  if (!noteHistory)
    return res
      .status(404)
      .send("The note history with the given ID was not found.");

  res.send(noteHistory);
});

function validate(noteHistory) {
  const schema = {
    noteId: Joi.string().required(),
    notes: Joi.array().required(),
  };

  return Joi.validate(noteHistory, schema);
}

module.exports = router;
