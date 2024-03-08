import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Lobby from "./components/Lobby";
import useSignalR from "./hooks/useSignalR";
import "./models/Message";
const App: React.FC = () => {
  const {
    connection,
    messages,
    rooms,
    users,
    connectionError,
    sendMessage,
    joinRoom,
    initConnection,
  } = useSignalR();
  const [room, setRoom] = useState<Room>();
  const [, setUser] = useState<string | null>();

  const handleJoinRoom = async (user: string, room: Room) => {
    await joinRoom(user, room);
    console.log(room);
    setRoom(room);
    setUser(user);
  };

  const closeConnection = async () => {
    if (connection) {
      await connection.stop();
      setRoom(undefined);
      initConnection();
    }
  };

  return (
    <>
      {!room ? (
        <Lobby
          joinRoom={handleJoinRoom}
          rooms={rooms}
          connection={connection}
          connectionError={connectionError}
          onRetryConnection={initConnection}
        />
      ) : (
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          closeConnection={closeConnection}
          users={users}
          currentConnectionId={connection ? connection.connectionId : ""}
          room={room}
        />
      )}
    </>
  );
};

export default App;
