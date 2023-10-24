import { Button, Row, Col, Container } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import ConnectedUsers from "./ConnectedUsers";

const Chat = ({ messages, sendMessage, closeConnection, users, currentUser, room }) => (
    <Container>
        <Row className="chat-container">
            {/* Connected Users */}
            <Col lg={2  } className="d-none d-lg-block">  {/* This line has been modified */}
                <ConnectedUsers users={users} />
            </Col>

            {/* Chat */}
            <Col lg={12} md={12} className="chat d-flex flex-column">
                <Row className="align-items-center"> 
                    <Col xs={8} md={10}>
                        <h2 className="mb-4 mt-4">Current room: {room}</h2>
                    </Col>
                    <Col xs={4} md={2} className="text-end"> 
                        <Button variant='danger' onClick={() => closeConnection()}>
                            Leave Room
                        </Button>
                    </Col>
                </Row>
                <MessageContainer messages={messages} currentUser={currentUser} />
                <SendMessageForm sendMessage={sendMessage} />
            </Col>
        </Row>
    </Container>
)

export default Chat;

