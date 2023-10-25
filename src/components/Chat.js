import { Button, Row, Col, Container } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import ConnectedUsersDropdown from "./ConnectedUsersDropdown";

const Chat = ({ messages, sendMessage, closeConnection, users, currentConnectionId, room }) => (
    <Container>
        <Row className="chat-container">
            {/* Chat */}
            <Col lg={12} md={12} className="chat d-flex flex-column">
                <Row className="align-items-center mb-2"> 
                    <Col xs={6} md={8}>
                        <h2 className="mb-4 mt-4 room-title">Room: {room}</h2>
                    </Col>
                    <Col xs={3} md={2} className="text-end"> 
                        <Button variant='danger' onClick={() => closeConnection()}
                            className="leave-room-btn">
                            Leave Room
                        </Button>
                    </Col>
                    <Col xs={3} md={2}>
                        <ConnectedUsersDropdown users={users} className="connected-users-dropdown text-end"/>
                    </Col>
                </Row>
                <MessageContainer messages={messages} currentConnectionId={currentConnectionId} />
                <SendMessageForm sendMessage={sendMessage} />
            </Col>
        </Row>
    </Container>
)

export default Chat;
