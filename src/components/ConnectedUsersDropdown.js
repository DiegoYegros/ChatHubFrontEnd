import { Dropdown } from "react-bootstrap";
const ConnectedUsersDropdown = ({ users }) => (
  <Dropdown align="end" className="d-flex justify-content-end">
    <Dropdown.Toggle variant="primary">
      {users.length === 1 ? users.length + " user" : users.length + " users"}
    </Dropdown.Toggle>

    <Dropdown.Menu className="dark-input-menu no-border">
      {users.map((user, index) => (
        <Dropdown.Item className="dark-input no-border" key={index}>
          {user}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default ConnectedUsersDropdown;
