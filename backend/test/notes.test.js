const { response } = require("express");
const request = require("supertest"),
  app = require("../index"),
  assert = require("assert").strict;

var note = {
  title: "Pizza",
  content: "pepperoni",
};

describe("POST /notes", () => {
  it("creates new note", (done) => {
    request(app)
      .post("/notes")
      .send(note)
      .set("Accept", "application/json")
      .expect(200)
      .then((response) => {
        assert.equal(response.body.version, 1);
        assert.equal(response.body.title, "Pizza");
        note = response.body;
        done();
      })
      .catch((err) => done(err));
  });
});

describe("GET /notes", () => {
  it("gets all the notes", (done) => {
    request(app)
      .get("/notes")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        assert.ok(response.body.length > 0);
        done();
      })
      .catch((err) => done(err));
  });
});

describe("GET /notes/:id", () => {
  it("ensure note was created", (done) => {
    request(app)
      .get("/notes/" + note._id)
      .expect(200)
      .expect("Content-Type", /json/)
      .then((response) => {
        assert.equal(response.body.title, "Pizza");
        assert.notEqual(response.body.title, "Languages");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("GET /noteHistories", () => {
  it("ensure all the version histories were created", (done) => {
    request(app)
      .get("/noteHistories")
      .expect(200)
      .then((response) => {
        assert.equal(response.body[0].notes.length, 0);
        done();
      })
      .catch((err) => done(err));
  });
});

describe("GET /noteHistories/:id", () => {
  it("ensure all the version histories were created", (done) => {
    request(app)
      .get("/noteHistories/" + note._id)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.noteId, note._id);
        assert.notEqual(response.body.noteId, response.body._id);
        done();
      })
      .catch((err) => done(err));
  });
});

describe("PUT /notes/:id", () => {
  it("updates existing note and adds version to history", (done) => {
    var noteEdit = { title: "Large pizza", content: "large pepperoni" };
    request(app)
      .put("/notes/" + note._id)
      .send(noteEdit)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.version, 2);
        assert.equal(response.body.title, "Large pizza");
        note = response.body;

        // ensure that new hisotry instance was added
        request(app)
          .get("/noteHistories/" + note._id)
          .expect(200)
          .then((response) => {
            assert.equal(response.body.notes.length, 1);
          })
          .catch((err) => done(err));
        done();
      })
      .catch((err) => done(err));
  });
});

describe("DELETE /notes/:id", () => {
  it("deletes existing note and its history", (done) => {
    request(app)
      .delete("/notes/" + note._id)
      .expect(200)
      .then((response) => {
        assert.equal(response.body.version, 2);

        // ensure that new hisotry instance deleted added
        request(app)
          .get("/noteHistories/" + note._id)
          .expect(404)
          .expect("The note history with the given Note ID was not found.")
          .catch((err) => done(err));
        done();
      })
      .catch((err) => done(err));
  });
});
