import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

const Rooms = ({ rooms }) => {
    return (
        <Container>
            <h2 className="mb-4 mt-4">Available Rooms</h2>
            <Row>
                {rooms.map((roomArray, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-3">
                        <div className="card text-white bg-dark position-relative" style={{width: '100%'}}>
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
        </Container>
    );
}

export default Rooms;
