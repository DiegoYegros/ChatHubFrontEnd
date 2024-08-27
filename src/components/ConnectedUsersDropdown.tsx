import { Dropdown } from "react-bootstrap";

interface ConnectedUsersDropdownProps {
  users: string[];
  className: string;
}

const ConnectedUsersDropdown: React.FC<ConnectedUsersDropdownProps> = ({ users, className }) => (
  <Dropdown>
    <Dropdown.Toggle variant="secondary" id="dropdown-basic" className={className}>
      {users.length} User{users.length !== 1 ? 's' : ''}
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
