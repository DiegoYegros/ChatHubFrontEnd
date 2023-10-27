import { HubConnectionBuilder, LogLevel, HubConnection } from "@microsoft/signalr";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import "./App.css";
import Lobby from "./components/Lobby";
import Chat from "./components/Chat";
import React from "react";

type MessageObject = {
  user: string;
  message: string;
  connectionId: string;
};

const App: React.FC = () => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const [room, setRoom] = useState<string | null>();
  const [rooms, setRooms] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [user, setUser] = useState<string | null>();
  const [connectionError, setConnectionError] = useState<boolean>(false);

  const initConnection = async () => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://chathub-hsrb.onrender.com/chat")
        .configureLogging(LogLevel.Information)
        .build();
      newConnection.on("RoomsAndAmountOfPeople", (updatedRooms) => {
        setRooms(updatedRooms);
      });
      newConnection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      newConnection.on("ReceiveMessage", (username, messageObject) => {
        let utcDate = new Date(messageObject.instant);
        let hours = utcDate.getHours();
        let minutes = utcDate.getMinutes();
        let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        let user = username + " " + formattedTime;
        setMessages((messages) => [
          ...messages,
          {
            user,
            message: messageObject.content,
            connectionId: messageObject.connectionId,
          },
        ]);
      });

      newConnection.onclose((e) => {
        console.error("Connection closed", e);
        setConnection(null);
        setRoom(null);
        setMessages([]);
        setUsers([]);
        initConnection();
      });

      await newConnection.start();
      console.log("Connection id: " + newConnection.connectionId);
      setConnection(newConnection);
      console.log("Connection created");
    } catch (e) {
      console.error(e);
      setConnectionError(true);
    }
  };
  useEffect(() => {
    initConnection();
  }, []);

  const joinRoom = async (user: string, room: string) => {
    try {
      if (connection) {
        await connection.invoke("JoinRoom", { user, room });
        setRoom(room);
        setUser(user);
      } else {
        console.error("Connection not established yet.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const closeConnection = async () => {
    if (connection) {
      try {
        await connection.stop();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const sendMessage = async (message: string, imageData: string) => {
    try {
      if (!connection){
        throw Error("No hay una conexión.");
      }
      const messageObject = {
        Content: message,
        Instant: new Date().toISOString(),
        ConnectionId: connection.connectionId,
        ImageData: imageData,
      };
      await connection.invoke("SendMessage", messageObject);
    } catch (e) {
      console.log(e);
    }
  };

   return (
    <>
      {!room ? (
        <Lobby
          joinRoom={joinRoom}
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
          currentConnectionId={connection ? connection.connectionId : ''}
          room={room}
        />
      )}
    </>
  );
};

export default App;
