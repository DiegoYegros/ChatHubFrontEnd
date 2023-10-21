import { Button } from "react-bootstrap"
import { useState } from "react";
import { Form} from "react-bootstrap";
import Rooms from "./Rooms";
const Lobby = ({joinRoom, rooms}) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();
    return <><Form className='lobby'
        onSubmit={e => {
            e.preventDefault();
            joinRoom(user, room);
            }}
    >
        <Form.Group>
            <Form.Control className="mb-1 dark-input" placeholder='name' onChange={e => setUser(e.target.value)}/>
            <Form.Control className="mb-2 dark-input" placeholder='room' onChange={e => setRoom(e.target.value)}/>
        </Form.Group>
        <Button variant='success' type='submit' disabled={!user || !room}>
            Join
        </Button>
    </Form>
    <Rooms rooms={rooms}/>
    </>

}
export default Lobby;