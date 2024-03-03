import { HubConnection } from "@microsoft/signalr";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Rooms from "./Rooms";


interface LobbyProps {
  joinRoom: (user: string, room: string) => object;
  rooms: string[];
  connection: HubConnection | null;
  connectionError: boolean;
  onRetryConnection: () => Promise<void>;
}

const Lobby : React.FC<LobbyProps> = ({
  joinRoom,
  rooms,
  connection,
  connectionError,
  onRetryConnection,
}) => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  interface ConnectionStatusBoxProps {
    isConnected: boolean;
    onErrorClick: () => false | (() => Promise<void>);
  }
  const ConnectionStatusBox: React.FC<ConnectionStatusBoxProps> = ({ isConnected, onErrorClick }) => {
    return (
      <div
        className={`card position-fixed top-0 end-0 mt-3 me-3 p-3 connection-status rounded ${
          isConnected
            ? "bg-success"
            : connectionError
            ? "bg-danger card-hoverable-error"
            : "bg-secondary"
        }`}
        style={{
          width: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: connectionError ? "pointer" : "default",
        }}
        onClick={onErrorClick}
        title={connectionError ? "Retry connection" : "Connected"}
      >
        {isConnected ? (
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm-1 17.414l-4.293-4.293-1.414 1.414 5.707 5.707 9.293-9.293-1.414-1.414-7.879 7.879z" />
          </svg>
        ) : connectionError ? (
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios/50/error--v1.png"
            alt="error--v1"
          />
        ) : (
          <div style={{ display: "flex", gap: "4px" }}>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container
      style={{
        height: "calc(100vh - 40px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ConnectionStatusBox
        isConnected={!!connection}
        onErrorClick={() => connectionError ? onRetryConnection : false}
      />
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <h2 className="d-flex justify-content-center adaptative-title">
            Select a room or join an existing one
          </h2>
          <Form
            className="lobby"
            onSubmit={(e) => {
              e.preventDefault();
              joinRoom(user, room);
            }}
          >
            <Form.Group>
              <Form.Control
                size="lg"
                className="mb-1 dark-input"
                placeholder="name"
                onChange={(e) => setUser(e.target.value)}
              />
              <Form.Control
                size="lg"
                className="mb-2 dark-input"
                placeholder="room"
                onChange={(e) => setRoom(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100"
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
