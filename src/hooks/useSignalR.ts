import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { useEffect, useState } from "react";

const useSignalR = () => {
  const URL: string = process.env.REACT_APP_SIGNALR_URL;
    const [connection, setConnection] = useState<HubConnection | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
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
      newConnection.on("ReceiveMessage", (username, message) => {
        let utcDate = new Date(message.instant);
        let localTime = utcDate.toLocaleTimeString();
        let time = localTime.substring(0, localTime.indexOf(" ")).split(":");
        let hours = time[0]
        let minutes = time[1]
        let formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        let user = username + " " + formattedTime;
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            user,
            instant: message.Instant,
            message: message.content,
            imageData: message.imageData,
            connectionId: message.connectionId,
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
          Instant: new Date().toUTCString(),
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
