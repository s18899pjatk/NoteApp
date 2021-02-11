import React, { useEffect } from "react";
import { getNote } from "../services/note";

function NoteDetails() {
  useEffect(() => {
    getNote();
  }, []);

  const getNote = async () => {
    try {
      const noteId = this.props.match.params.id;
    } catch (error) {
      if (error.response && error.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  return <div></div>;
}

export default NoteDetails;
