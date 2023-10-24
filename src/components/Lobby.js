import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Rooms from "./Rooms";

const Lobby = ({ joinRoom, rooms }) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();

    return (<Container>
            <h2 className="mb-4 mt-4">Select a room or join an existing one</h2>

                    <Form
                        className='lobby'
                        onSubmit={e => {
                            e.preventDefault(); 
                            joinRoom(user, room);
                        }}
                    >
                        <Form.Group>
                            <Form.Control 
                                size="lg"
                                className="mb-1 dark-input" 
                                placeholder='name' 
                                onChange={e => setUser(e.target.value)}
                            />
                            <Form.Control 
                                size="lg"
                                className="mb-2 dark-input" 
                                placeholder='room' 
                                onChange={e => setRoom(e.target.value)}
                            />
                        </Form.Group>
                        <Button 
                            variant='success' 
                            type='submit' 
                            disabled={!user || !room}
                            block
                        >
                            Join
                        </Button>
                    </Form>
            <Rooms rooms={rooms} user={user} joinRoom = {joinRoom}/>
            </Container>
    );
}

export default Lobby;
