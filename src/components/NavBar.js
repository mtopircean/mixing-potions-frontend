import { Container, NavDropdown } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <Container>
      <Navbar fixed="top" className="navbar-container">
        <Navbar.Brand>
          <NavLink to="/">
          <div className="logo-container">
            <img src={logo} alt="logo" height="120" />
          </div>
          </NavLink>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <NavDropdown
              title={<FontAwesomeIcon icon={faBars} />}
              id="basic-nav-dropdown"
            >
              <div id="menu-items">
                <NavDropdown.Item>
                  <NavLink to="/" className="nav-link-menu">Home</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/about" className="nav-link-menu">About</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                <NavLink to="/team" className="nav-link-menu">Join our team</NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/contact" className="nav-link-menu">Contact</NavLink>
                  </NavDropdown.Item>
              </div>
            </NavDropdown>
            <NavLink to="/login" className="nav-link">
              Join/Login <FontAwesomeIcon icon={faUser} />
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default App;
