import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Note({ item, onDelete, isDetailed }) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>
            {isDetailed && <Card.Title>{item.title}</Card.Title>}
            {!isDetailed && <Link to={`/note/${item._id}`}>{item.title}</Link>}
          </Card.Title>
          {isDetailed && (
            <Card.Subtitle className="mb-2 text-muted">
              Version: {item.version}
            </Card.Subtitle>
          )}
          {isDetailed && <Card.Text>{item.content}</Card.Text>}
          {
            <Card.Subtitle className="mb-2 text-muted">
              {"Created: " +
                item.created.split("T")[0] +
                " " +
                item.created
                  .split("T")[1]
                  .substring(0, item.modified.split("T")[1].length - 5)}
            </Card.Subtitle>
          }
          <Card.Subtitle className="mb-2 text-muted">
            {"Modified: " +
              item.modified.split("T")[0] +
              " " +
              item.modified
                .split("T")[1]
                .substring(0, item.modified.split("T")[1].length - 5)}
          </Card.Subtitle>
          {!isDetailed && (
            <Link className="btn btn-primary m-1" to={`/notes/${item._id}`}>
              Edit
            </Link>
          )}
          {!isDetailed && (
            <Button variant="danger" onClick={() => onDelete(item)}>
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Note;
