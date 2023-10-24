import { Dropdown } from "react-bootstrap";
const ConnectedUsersDropdown = ({users}) => (
    <Dropdown className="d-flex justify-content-end">
        <Dropdown.Toggle variant="primary">
            {users.length === 1 ? users.length+ " user" : users.length+ " users" }
        </Dropdown.Toggle>

        <Dropdown.Menu>
            {users.map((user, index) => (
                <Dropdown.Item key={index}>{user}</Dropdown.Item>
            ))}
        </Dropdown.Menu>
    </Dropdown>
)

export default ConnectedUsersDropdown;
