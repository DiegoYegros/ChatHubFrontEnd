import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './App.css';
import Lobby from './components/Lobby';
import Chat from './components/Chat';

const App = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState();
  const [users, setUsers] = useState([]);
  const joinRoom = async (user, room) => {
    try {
      const connection = new HubConnectionBuilder()
      .withUrl("http://localhost:5293/chat")
      .configureLogging(LogLevel.Information)
      .build();


      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      })
      connection.on("ReceiveMessage", (user, message) => {
        setMessages(messages => [...messages, {user, message}]);
      });
      connection.onclose(e => {
        setConnection();
        setRoom();
        setMessages([]);
        setUsers([]);
        
        
      })
      await connection.start();
      await connection.invoke("JoinRoom", {user, room});
      setConnection(connection);
      setRoom(room);
    } catch (e){
      console.log(e);
    }
  }
  const closeConnection = async () => {
        try {
            await connection.stop();
        }
         catch (e){
            console.log(e);
        }
    }
  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e){
      console.log(e);
    }
  }

  return <div className='app'>
      <h2>{room == null ?  "Select a name & room" : "Current room: "+room}</h2>
      
      {!connection ? <Lobby joinRoom={joinRoom} /> : <Chat messages = {messages} sendMessage = {sendMessage}
        closeConnection = {closeConnection}
        users = {users}
      />}
      
  </div>
}

export default App;
