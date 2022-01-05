import React, { useState } from "react";
import { Button, Container, Modal, Form } from "react-bootstrap";
import { database } from "../Firebase";
import { useAuth } from "../Contexts/AuthContext";
import { ROOT_FOLDER } from "../Hooks/useFolder";

const AddFolderButton = ({ currentFolder }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];

    if (currentFolder != ROOT_FOLDER)
      path.push({ name: currentFolder.name, id: currentFolder.id });

    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path:path,
      createdAt: database.getCurrentTimeStamp(),
    });

    setName("");
    closeModal();
  }

  return (
    <Container fluid className="flex flex-col">
      <div className="flex justify-end p-5 ">
        <Button onClick={openModal} variant="info" size="lg">
          Add Folder
        </Button>
      </div>
      <Modal show={open} onHide={closeModal}>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={closeModal}>
              Close
            </Button>
            <Button variant="warning" type="submit">
              Add Folder
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AddFolderButton;
