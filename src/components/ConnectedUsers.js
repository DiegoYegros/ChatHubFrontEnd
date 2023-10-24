const ConnectedUsers = ({users}) => 

    <div className="justify-content-center">
            <div className='user-list'>
                <h4>Connected users</h4>
                {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
            </div>
    </div>


export default ConnectedUsers;
