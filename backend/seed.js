const { Note } = require("./models/note");
const { NoteHistory } = require("./models/noteHistory");

const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

const notes = [
  {
    title: "Languages",
    content: "html,css,js",
  },
  {
    title: "Users",
    content: "1,2,3",
  },
];

async function seed() {
  await mongoose
    .connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log(`Connected to ${db}...`))
    .catch((err) => console.error(err));

  await Note.deleteMany({});
  await NoteHistory.deleteMany({});

  for (let note of notes) {
    const { _id: noteId } = await new Note({
      title: note.title,
      content: note.content,
    }).save();
    await new NoteHistory({
      noteId,
      notes: [],
    }).save();
  }

  mongoose.disconnect();

  console.info("Seeded");
}

seed();
