const express = require("express");
const app = express();
const config = require("config");
const db = config.get("db");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const notes = require("./routes/notes");
const noteHistories = require("./routes/noteHistories");

const port = 8000 || config.get("port");

app.use(cors());
app.use("/notes", jsonParser, notes);
app.use("/noteHistories", jsonParser, noteHistories);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connected to ${db}...`))
  .catch((err) => console.error(err));

const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;
