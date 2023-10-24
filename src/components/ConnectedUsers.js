import { Container, Row, Col } from 'react-bootstrap';

const ConnectedUsers = ({users}) => 
<Container>
    <Row className="justify-content-center">
            <div className='user-list'>
                <h4>Connected users</h4>
                {users.map((u, idx) => <h6 key={idx}>{u}</h6>)}
            </div>
    </Row>
</Container>

export default ConnectedUsers;
