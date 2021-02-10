const { Note } = require("./models/note");
const { NoteHistory } = require("./models/noteHistory");

const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");

const notes = [
  {
    title: "Products",
    content: "mushroms, potatos,bananas",
    version: 1.1,
    history: [
      {
        title: "Products",
        content: "mushroms, potatos and smth else",
        version: 1.0,
      },
    ],
  },
  {
    title: "Reminder",
    content: "8:00 dentist apointment",
    version: 1.0,
    history: null,
  },
  {
    title: "Technologies",
    content: "html,css,js",
    version: 1.2,
    history: [
      {
        title: "Technologies",
        content: "html,css",
        version: 1.1,
      },
      {
        title: "Technologies",
        content: "html",
        version: 1.0,
      },
    ],
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
      version: note.version,
    }).save();
    await new NoteHistory({
      noteId,
      notes: note.history,
    }).save();
  }

  mongoose.disconnect();

  console.info("Seeded");
}

seed();
