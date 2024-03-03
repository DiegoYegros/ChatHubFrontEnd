import { Button, Col, Container, Row } from "react-bootstrap";
import ConnectedUsersDropdown from "./ConnectedUsersDropdown";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";


interface ChatProps {
  messages: Message[];
  sendMessage: (message: string, imageData: string) => void;
  closeConnection: () => void;
  users: string[];
  currentConnectionId: string | null;
  room: string;
}

const Chat: React.FC<ChatProps> = ({
  messages,
  sendMessage,
  closeConnection,
  users,
  currentConnectionId,
  room
}) => (
  <Container>
    <Row className="chat-container ">
      <Col lg={12} md={12} className="chat d-flex flex-column p-0">
        <Row className="align-items-center mb-2">
          <Col xs={6} md={8} p-0 className="p-0">
            <h2 className="mb-4 mt-4 room-title">Room: {room}</h2>
          </Col>
          <Col xs={3} md={2} className="text-end p-0">
            <Button
              variant="danger"
              onClick={() => closeConnection()}
              className="leave-room-btn"
            >
              Leave Room
            </Button>
          </Col>
          <Col xs={3} md={2} className="p-0">
            <ConnectedUsersDropdown
              users={users}
              className="connected-users-dropdown text-end"
            />
          </Col>
        </Row>
        <MessageContainer
          messages={messages}
          currentConnectionId={currentConnectionId}
        />
        <SendMessageForm sendMessage={sendMessage} />
      </Col>
    </Row>
  </Container>
);

export default Chat;
