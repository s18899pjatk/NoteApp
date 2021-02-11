import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Note({ item, onDelete }) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            <Link to={`/note/${item._id}`}>{item.title}</Link>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Version: {item.version}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {"Modified: " +
              item.modified.split("T")[0] +
              " " +
              item.modified
                .split("T")[1]
                .substring(0, item.modified.split("T")[1].length - 5)}
          </Card.Subtitle>
          <Link className="btn btn-primary m-1" to={`/notes/${item._id}`}>
            Edit
          </Link>
          <Button variant="danger" onClick={() => onDelete(item)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Note;
