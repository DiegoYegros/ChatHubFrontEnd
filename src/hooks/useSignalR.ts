import { useEffect, useState } from "react";
import {
  HubConnectionBuilder,
  LogLevel,
  HubConnection,
} from "@microsoft/signalr";
import { MessageObject } from "../types";

const useSignalR = () => {
  const URL: string = "http://localhost:5293/chat";
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const [rooms, setRooms] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [connectionError, setConnectionError] = useState<boolean>(false);

  const initConnection = async () => {
    try {
      const newConnection = new HubConnectionBuilder()
        .withUrl(URL)
        .configureLogging(LogLevel.Information)
        .build();
      newConnection.on("RoomsAndAmountOfPeople", setRooms);
      newConnection.on("UsersInRoom", setUsers);

      newConnection.on("ReceiveMessage", (username, messageObject) => {
        console.log(messageObject.imageData)
        let utcDate = new Date(messageObject.instant);
        let hours = utcDate.getHours();
        let minutes = utcDate.getMinutes();
        let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        let user = username + " " + formattedTime;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            user,
            message: messageObject.content,
            imageData: messageObject.imageData,
            connectionId: messageObject.connectionId,
          },
        ]);
      });

      newConnection.onclose((e) => {
        console.error("Connection closed", e);
        setConnection(null);
        setRooms([]);
        setMessages([]);
        setUsers([]);
        setConnectionError(true);
      });

      await newConnection.start();
      setConnection(newConnection);
    } catch (e) {
      console.error(e);
      setConnectionError(true);
    }
  };

  useEffect(() => {
    initConnection();
  }, []);

  const sendMessage = async (message: string, imageData: string) => {
    if (connection) {
      try {
        const messageObject = {
          Content: message,
          Instant: new Date().toISOString(),
          ConnectionId: connection.connectionId,
          ImageData: imageData,
        };
        await connection.invoke("SendMessage", messageObject);
      } catch (e) {
        console.error(e);
      }
    } else {
      throw Error("No active connection.");
    }
  };

  const joinRoom = async (user: string, room: string) => {
    if (connection) {
      await connection.invoke("JoinRoom", { user, room });
    } else {
      console.error("Connection not established yet.");
    }
  };

  return {
    connection,
    messages,
    rooms,
    users,
    connectionError,
    sendMessage,
    joinRoom,
    initConnection
  };
};

export default useSignalR;
