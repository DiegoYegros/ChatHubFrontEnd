import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import ConnectedUsersDropdown from "./ConnectedUsersDropdown";
import MessageContainer from "./MessageContainer";
import SendMessageForm from "./SendMessageForm";
import Message from "../models/Message";

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
}) => {
  const containerStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const roomTitleStyle: React.CSSProperties = {
    color: '#e1dfdf',
    margin: '0',
    fontSize: '1.5rem',
  };

  const rightSectionStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const buttonStyle: React.CSSProperties = {
    width: '120px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <Container fluid style={containerStyle}>
      <Row className="chat-container">
        <Col className="chat d-flex flex-column p-0">
          <div style={headerStyle}>
            <h2 style={roomTitleStyle}>{room}</h2>
            <div style={rightSectionStyle}>
              <ConnectedUsersDropdown users={users} className="connected-users-dropdown text-end" />
              <Button
                variant="danger"
                onClick={closeConnection}
                style={buttonStyle}
              >
                Leave Room
              </Button>
            </div>
          </div>
          <MessageContainer
            messages={messages}
            currentConnectionId={currentConnectionId}
          />
          <SendMessageForm sendMessage={sendMessage} />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
