import { Container, NavDropdown } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <Container>
      <Navbar expand="md" fixed="top" className="navbar-container">
        <Navbar.Brand href="#home">
          <div className="logo-container">
            <img src={logo} alt="logo" height="120" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
          <NavDropdown title={<FontAwesomeIcon icon={faBars} />} id="basic-nav-dropdown">
          <div id="menu-items">
          <NavDropdown.Item href="#">Home</NavDropdown.Item>
          <NavDropdown.Item href="#">About</NavDropdown.Item>
          <NavDropdown.Item href="#">Join our team</NavDropdown.Item>
          <NavDropdown.Item href="#">Contact</NavDropdown.Item>
          </div>
          </NavDropdown>
            <Nav.Link href="#link">Join/Login <FontAwesomeIcon icon={faUser} /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default App;