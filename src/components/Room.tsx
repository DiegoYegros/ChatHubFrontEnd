import React, { memo, useState } from 'react';
import { Button, Col, Form, Modal } from 'react-bootstrap';

interface RoomProps {
  room: Room;
  userCount: number;
  user: string;
  joinRoom: (user: string, room: Room) => void;
}

const Room: React.FC<RoomProps> = memo(({ room, userCount, user, joinRoom }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");

  const handleShow = () => {
    if (!user || user.length === 0) {
      setShowModal(true);
    } else {
      joinRoom(user, room);
    }
  };

  const handleClose = () => {
    setInputName("");
    setShowModal(false);
  };

  const handleJoin = () => {
    setInputName("");
    setShowModal(false);
    joinRoom(inputName, room);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputName(e.target.value);
  };

  return (
    <>
      <Col xs={12} sm={6} md={4} lg={3} className="mb-3">
        <div
          className="card text-white bg-dark position-relative card-hoverable"
          style={{ width: '100%' }}
          onClick={handleShow}
        >
          <div className="card-body">
            <h5 className="card-title">{room.name}</h5>
          </div>
          <div className="position-absolute bottom-right">
            <small className="white-color">{userCount}/20</small>
          </div>
        </div>
      </Col>

      <Modal show={showModal} onHide={handleClose} className="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title className="white-color">Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formName">
            <Form.Control
              type="text"
              value={inputName}
              onChange={handleNameChange}
              placeholder="John, Anon, Tracy..."
              className="dark-input"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleJoin}
            disabled={inputName.length === 0}
          >
            Join
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default Room;