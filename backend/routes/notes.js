const { Note } = require("../models/note");
const Joi = require("joi");
const express = require("express");
const router = express.Router();
const validateId = require("../middlewares/validateId");

router.get("/", async (req, res) => {
  const notes = await Note.find().select("-__v").sort("title");
  res.send(notes);
});

router.get("/:id", validateId, async (req, res) => {
  const note = await Note.findById(req.params.id).select("-__v");

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");

  res.send(note);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const note = new Note({
    title: req.body.title,
    content: req.body.content,
  });

  await note.save();
  res.send(note);
});

router.put("/:id", validateId, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const oldNote = await Note.findById(req.params.id).select("-__v");

  const note = await Note.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content,
      version: ++oldNote.version,
      modified: Date.now(),
    },
    { new: true }
  );

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");

  res.send(note);
});

router.delete("/:id", validateId, async (req, res) => {
  const note = await Note.findByIdAndRemove(req.params.id);

  if (!note)
    return res.status(404).send("The note with the given ID was not found.");

  res.send(note);
});

function validate(note) {
  const schema = {
    title: Joi.string().min(1).max(20).required(),
    content: Joi.string().min(1).max(20).required(),
  };

  return Joi.validate(note, schema);
}

module.exports = router;
