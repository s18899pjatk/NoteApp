const { NoteHistory } = require("../models/noteHistory");
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

module.exports = router;
