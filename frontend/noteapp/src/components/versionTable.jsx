import React from "react";
import { Table } from "react-bootstrap";

const VersionTable = ({ versions }) => {
  const count = 0;
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th># Version</th>
          <th>Title</th>
          <th>Content</th>
          <th>Modified</th>
        </tr>
      </thead>
      <tbody>
        {versions.map((item) => (
          <tr
            key={(((1 + Math.random()) * 0x10000) | 0)
              .toString(16)
              .substring(1)}
          >
            <td>{item.version}</td>
            <td>{item.title}</td>
            <td>{item.content}</td>
            <td>
              {item.modified.split("T")[0] +
                " " +
                item.modified
                  .split("T")[1]
                  .substring(0, item.modified.split("T")[1].length - 5)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VersionTable;
