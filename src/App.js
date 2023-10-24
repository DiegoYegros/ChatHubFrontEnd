import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import Lobby from './components/Lobby';
import Chat from './components/Chat';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const initConnection = async () => {
        try {
            const newConnection = new HubConnectionBuilder()
                .withUrl("https://chathub-hsrb.onrender.com/chat")
                .configureLogging(LogLevel.Information)
                .build();
            newConnection.on("RoomsAndAmountOfPeople", updatedRooms => {
                    setRooms(updatedRooms);
            });
            newConnection.on("UsersInRoom", (users) => {
                setUsers(users);
            });

            newConnection.on("ReceiveMessage", (user, message) => {
                  let utcDate = new Date(message.instant);
                  let localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
                  let hours = localDate.getHours().toString().padStart(2, '0');
                  let minutes = localDate.getMinutes().toString().padStart(2, '0'); 
                  let formattedTime = `${hours}:${minutes}`;
                setMessages(messages => [...messages, { user, message: message.content }]);
            });

            newConnection.onclose(e => {
                console.error("Connection closed", e);
                setConnection(null);
                setRoom(null);
                setMessages([]);
                setUsers([]);
                initConnection()
            });

            await newConnection.start();
            console.log("Connection id: "+ newConnection.connectionId)
            setConnection(newConnection);
            console.log("Connection created")
        } catch (e) {
            console.error(e);
        }
    };
    initConnection();
}, []);


  const joinRoom = async (user, room) => {
    try {
        if (connection) {
            await connection.invoke("JoinRoom", { user, room });
            console.log("joined room with connection id:" + connection.connectionId)
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

    const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e){
      console.log(e);
    }
  }

  return <div className='app'>
      <h2 className='mb-2'>{room == null ?  "Create or Join room" : "Current room: "+room}</h2>
      
      {!room ? <Lobby joinRoom={joinRoom} rooms={rooms} /> : <Chat messages = {messages} sendMessage = {sendMessage}
        closeConnection = {closeConnection}
        users = {users}
        currentUser={user}
      />}
      
  </div>
}

export default App;
