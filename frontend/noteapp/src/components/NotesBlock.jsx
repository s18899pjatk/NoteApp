import React from "react";
import { CardColumns } from "react-bootstrap";
import Note from "./Note";

function NotesBlock({ notes, handleDelete }) {
  return (
    <div>
      <CardColumns>
        {notes &&
          notes.map((note) => (
            <Note key={note._id} item={note} onDelete={handleDelete} />
          ))}
      </CardColumns>
    </div>
  );
}

export default NotesBlock;
