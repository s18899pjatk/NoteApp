import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import NotesBlock from "../components/NotesBlock";
import { getNotes, deleteNote } from "../services/note";
import Select from "../components/Select";
import _ from "lodash";

function Notes() {
  const [notes, setNotes] = useState();
  const options = [
    { _id: 1, name: "title" },
    { _id: 2, name: "created" },
    { _id: 3, name: "modified" },
  ];

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = async () => {
    let { data: p } = await getNotes();
    setNotes(p);
    return p;
  };

  const handleDelete = async (note) => {
    const originalNotes = notes;
    const Notes = originalNotes.filter((n) => n._id !== note._id);
    setNotes(Notes);

    try {
      await deleteNote(note._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This note has already been deleted.");
      }
      setNotes(originalNotes);
    }
  };

  const handleSort = (option) => {
    const order = option === "title" ? "asc" : "desc";
    const sorted = _.orderBy(notes, option, order);
    setNotes(sorted);
  };

  return (
    <div>
      <main className="cardBox">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-2">
            <div style={{ marginBottom: "50px", color: "white" }}>
              <Select
                name="Sort"
                label="Sort By"
                options={options}
                onChange={handleSort}
              />
            </div>
            <Link className="btn btn-dark" to="/notes/new">
              Create note
            </Link>
          </div>
          <div className="col-10">
            <NotesBlock notes={notes} handleDelete={handleDelete} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notes;
