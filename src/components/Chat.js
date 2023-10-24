import { Button, Row, Col } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import ConnectedUsers from "./ConnectedUsers";

const Chat = ({ messages, sendMessage, closeConnection, users, currentUser }) => (
    <>
    <div className="chat-container">
        <div className="connected-users">
                <ConnectedUsers users={users} />
            </div>
        <div className="chat d-flex flex-column">
            <Col xs={12} md={12} lg={12}>
                <div className="leave-room text-end  top-0 end-0">
                    <Button variant='danger' onClick={() => closeConnection()}>
                        Leave Room
                    </Button>
                </div>
            </Col>
            <MessageContainer messages={messages} currentUser={currentUser} />
            <SendMessageForm sendMessage={sendMessage} />
        </div>
            
    </div>
    </>
)

export default Chat;
