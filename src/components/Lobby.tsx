import { HubConnection } from "@microsoft/signalr";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ConnectionStatusBox from "./ConnectionStatusBox";
import Rooms from "./Rooms";

interface LobbyProps {
  joinRoom: (user: string, room: Room) => object;
  rooms: Room[];
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
  const [room, setRoom] = useState<Room>();

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
        onErrorClick={() => (connectionError ? onRetryConnection : false)}
        connectionError={connectionError}
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
              if (room) {
                const roomObject: Room = {
                  name: room.name,
                  id: "",
                  connectedUsers: 0,
                };
                joinRoom(user, roomObject);
              }
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
                onChange={(e) => {
                  const room: Room = {
                    name: e.target.value,
                    id: "",
                    connectedUsers: 0,
                  };
                  setRoom(room);
                }}
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
