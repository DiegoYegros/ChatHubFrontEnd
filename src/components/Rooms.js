import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Rooms = ({ rooms }) => {
    return (
        <div>
            <h2 className="mb-4 mt-4">Available Rooms</h2>
            <div className="d-flex flex-wrap justify-content-start">
                {rooms.map((roomArray, index) => (
                    <div key={index} className="card m-2 position-relative" style={{width: '18rem'}}>
                        <div className="card-body">
                            <h5 className="card-title">{roomArray[0].room}</h5>
                        </div>
                        <div className="card position-absolute bottom-0 end-0">
                            <small className="text-muted">{roomArray.length}/20</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rooms;
