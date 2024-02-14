import { Container } from "react-bootstrap";
import "./App.css";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../src/assets/logo.png";

function App() {
  return (
    <Container>
      <Navbar expand="md" fixed="top">
        <Navbar.Brand href="#home">
          <div className="logo-container">
            <img src={logo} alt="logo" height="120" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default App;
