import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';

const Rooms = ({ rooms, user, joinRoom }) => {
    const [showModal, setShowModal] = useState(false);
    const [inputName, setInputName] = useState('');
    const [room, setRoom] = useState();
    const nameInputRef = useRef(null);

    useEffect(() => {
        if (showModal) {
            nameInputRef.current.focus();
        }
    }, [showModal]);

    const handleShow = (currentRoom) => {
        if (!user || user.length === 0){
            setShowModal(true)
            setRoom(currentRoom)
        }
        else{
            joinRoom(user, currentRoom);
        }
    };

    const handleClose = () => {
        setInputName('');
        setShowModal(false);
    }
    const handleJoin = () => {
        setInputName('');
        setShowModal(false);
        joinRoom(inputName, room);
    }

    const handleNameChange = (e) => setInputName(e.target.value);

    return (
        <>
            <h2 className="mb-4 mt-4">Available Rooms</h2>
            <Row>
                {rooms.map((roomArray, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <div 
                            className="card text-white bg-dark position-relative card-hoverable"
                            style={{width: '100%'}}
                            onClick={() => handleShow(roomArray[0].room)}>
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

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your name</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Control 
                                ref={nameInputRef}
                                type="text" 
                                value={inputName} 
                                onChange={handleNameChange} 
                                placeholder="John, Anon, Tracy" 
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleJoin}
                            disabled={inputName.length === 0}>
                        Join
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Rooms;
