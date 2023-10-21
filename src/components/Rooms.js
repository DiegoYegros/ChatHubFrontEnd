const Rooms = ({ rooms }) => {
    return (
        <div>
            {rooms.map((roomArray, index) => (
                <div key={index}>
                    Room Name: {roomArray[0].room} 
                    <br />
                    Number of People: {roomArray.length}
                </div>
            ))}
        </div>
    );
}
export default Rooms;
