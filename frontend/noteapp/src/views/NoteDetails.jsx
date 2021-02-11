import React, { useEffect, useState } from "react";
import { getNote } from "../services/note";
import { getNoteHistory } from "../services/history";
import { useParams } from "react-router-dom";
import Note from "../components/Note";
import VersionTable from "../components/versionTable";

function NoteDetails() {
  const [note, setNote] = useState(null);
  const [versions, setVersions] = useState(null);

  const params = useParams();

  useEffect(() => {
    retreiveNote();
    retreiveVersions();
  }, []);

  const retreiveNote = async () => {
    try {
      const n = await getNote(params.id);
      setNote(n.data);
    } catch (error) {
      if (error.response && error.response.status === 404)
        params.history.replace("/not-found");
    }
  };

  const retreiveVersions = async () => {
    try {
      const v = await getNoteHistory(params.id);
      setVersions(v.data.notes);
    } catch (error) {
      if (error.response && error.response.status === 404)
        params.history.replace("/not-found");
    }
  };

  return (
    <div className="cardBox">
      {note && <Note key={note._id} item={note} isDetailed={true} />}
      {versions && (
        <div className="historyTable">
          <h1>History</h1>
          <VersionTable versions={versions} />
        </div>
      )}
    </div>
  );
}

export default NoteDetails;
