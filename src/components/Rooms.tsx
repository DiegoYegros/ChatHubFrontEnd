import "bootstrap/dist/css/bootstrap.min.css";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";


interface Props {
  rooms: string[];
  user: string;
  joinRoom: (user: string, room: string) => void;

}
const Rooms: React.FC<Props> = ({ rooms, user, joinRoom }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [inputName, setInputName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const nameInputRef = useRef<any>(null);

  useEffect(() => {
    if (showModal) {
      nameInputRef.current.focus();
    }
  }, [showModal]);

  const handleFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (inputName.length > 0) {
      handleJoin();
    }
  };
  const handleShow = (currentRoom: string) => {
    if (!user || user.length === 0) {
      setShowModal(true);
      setRoom(currentRoom);
    } else {
      joinRoom(user, currentRoom);
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

  const handleNameChange = (e: { target: { value: SetStateAction<string>; }; }) => setInputName(e.target.value);

  return (
    <>
      <h2 className="mb-4 mt-4 d-flex justify-content-center adaptative-title">
        Available Rooms
      </h2>
      <Row>
        {rooms.map((roomArray: any, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
            <div
              className="card text-white bg-dark position-relative card-hoverable"
              style={{ width: "100%" }}
              onClick={() => handleShow(roomArray[0].room)}
            >
              <div className="card-body">
                <h5 className="card-title">{roomArray[0].room}</h5>
              </div>
              <div className="position-absolute bottom-right">
                <small className="white-color">{roomArray.length}/20</small>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose} className="dark-modal">
        <Modal.Header closeButton>
          <Modal.Title className="white-color">Enter your name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formName">
              <Form.Control
                ref={nameInputRef}
                type="text"
                value={inputName}
                onChange={handleNameChange}
                placeholder="John, Anon, Tracy..."
                className="dark-input"
              />
            </Form.Group>
          </Form>
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
};

export default Rooms;
