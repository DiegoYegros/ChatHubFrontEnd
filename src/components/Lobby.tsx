import { HubConnection } from "@microsoft/signalr";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ConnectionStatusBox from "./ConnectionStatusBox";
import Rooms from "./Rooms";

interface LobbyProps {
  joinRoom: (user: string, room: string) => object;
  rooms: string[];
  connection: HubConnection | null;
  connectionError: boolean;
  onRetryConnection: () => Promise<void>;
}

const Lobby: React.FC<LobbyProps> = ({
  joinRoom,
  rooms,
  connection,
  connectionError,
  onRetryConnection,
}) => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem 0',
  };

  const headingStyle = {
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
    color: '#e1dfdf',
  };

  const inputStyle = {
    marginBottom: '0.5rem',
    backgroundColor: '#333',
    color: '#e1dfdf',
    border: '1px solid #555',
  };

  const inputProps = {
    style: inputStyle,
    className: 'custom-input',
  };

  const buttonStyle = {
    width: '100%',
    marginBottom: '1.5rem',
  };

  // Custom styles for placeholder
  const customPlaceholderStyle = `
    .custom-input::placeholder {
      color: #a0a0a0 !important;
      opacity: 1 !important;
    }
    .custom-input:-ms-input-placeholder {
      color: #a0a0a0 !important;
    }
    .custom-input::-ms-input-placeholder {
      color: #a0a0a0 !important;
    }
  `;

  return (
    <Container fluid style={containerStyle}>
      <style>{customPlaceholderStyle}</style>
      <ConnectionStatusBox
        isConnected={!!connection}
        onErrorClick={() => connectionError ? onRetryConnection : false}
        connectionError={connectionError}
      />
      <Row className="justify-content-center w-100">
        <Col xs={12} sm={10} md={8} lg={6} xl={5}>
          <h2 style={headingStyle}>Select a room or join an existing one</h2>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              joinRoom(user, room);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Control
                size="lg"
                placeholder="Enter your name"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                {...inputProps}
              />
              <Form.Control
                size="lg"
                placeholder="Enter room name"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                {...inputProps}
                style={{ ...inputStyle, marginBottom: '1rem' }}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              style={buttonStyle}
              disabled={!user || !room}
            >
              Join
            </Button>
          </Form>
          <Rooms rooms={rooms} user={user} joinRoom={joinRoom} />
        </Col>
      </Row>
    </Container>
  );
};

export default Lobby;
