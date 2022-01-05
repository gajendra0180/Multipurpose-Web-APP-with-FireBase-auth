import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import "./Folder.css";
export default function Folder({ folder }) {
  return (
      <Button
        to={{
          pathname: `/folder/${folder.id}`,
          state: { folder: folder },
        }}
        variant="success"
        size="lg"
        className="hover:text-green-600  py-2 px-4 border text-4xl rounded "
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.463)",
        }}
        as={Link}
      >
        {folder.name}
      </Button>
  );
}
