import { Row } from "react-bootstrap";
import Room from "./Room";

interface RoomsProps {
  rooms: Room[];
  user: string;
  joinRoom: (user: string, room: Room) => void;
}
const Rooms: React.FC<RoomsProps> = ({ rooms, user, joinRoom }) => {
  return (
    <>
      <h2 className="mb-4 mt-4 d-flex justify-content-center adaptative-title">
        Available Rooms
      </h2>

      <Row>
        {rooms.map((room, index) => (
          <Room
            key={room.id}
            room={room}
            userCount={room.connectedUsers}
            user={user}
            joinRoom={joinRoom}
          />
        ))}
      </Row>
    </>
  );
};

export default Rooms;
