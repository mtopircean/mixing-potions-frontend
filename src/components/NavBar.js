import React, { useContext } from "react";
import { Container, NavDropdown } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { CurrentUserContext } from "../../src/App";

const NavBar = () => {
  const currentUser = useContext(CurrentUserContext);
  const loggedInIcons = (
    <>
      {currentUser?.username}
    {currentUser?.profile?.image ? (
      <img src={currentUser.profile.image} alt="Profile" onError={(e) => { e.target.src = ''; }} />
    ) : (
      <img src="https://res.cloudinary.com/dgcwnjoh4/image/upload/v1704397319/default_profile_duvxwt.jpg" alt="Profile" width={40}/>
    )}
    </>
  );
  const loggedOutIcons = (
    <>
      <NavLink to="/login" className="nav-link">
        Join/Login <FontAwesomeIcon icon={faUser} />
      </NavLink>
    </>
  );
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
            {currentUser ? loggedInIcons : loggedOutIcons}
            <NavDropdown
              title={<FontAwesomeIcon icon={faBars} />}
              id="basic-nav-dropdown"
            >
              <div id="menu-items">
                <NavDropdown.Item>
                  <NavLink to="/" className="nav-link-menu">
                    Home
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/about" className="nav-link-menu">
                    About
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/team" className="nav-link-menu">
                    Join our team
                  </NavLink>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <NavLink to="/contact" className="nav-link-menu">
                    Contact
                  </NavLink>
                </NavDropdown.Item>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default NavBar;
