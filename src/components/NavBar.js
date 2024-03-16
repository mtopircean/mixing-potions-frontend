import React from "react";
import { Container, NavDropdown } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const handleLogout = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const loggedInIcons = (
    <>
      <NavDropdown
        title={
          currentUser?.profile_image ? (
            <>
              <Avatar
                src={currentUser.profile_image}
                text="Profile"
                height={80}
                width={80}
                className="avatar-image"
              />
              {currentUser.username}
            </>
          ) : (
            currentUser?.username
          )
        }
      >
        <NavDropdown.Item className="user-menu">
          <div>
            <NavLink to="/" className="user-link-menu" onClick={handleLogout}>
              Logout
            </NavLink>
          </div>
          <div>
            <NavLink
              to={`/profile/${currentUser?.profile_id}`}
              className="user-link-menu"
            >
              Profile
            </NavLink>
          </div>
        </NavDropdown.Item>
      </NavDropdown>
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
                  <a
                    href="https://beta-doterra.myvoffice.com/cosminatopircean/#/joinTeam"
                    className="nav-link-menu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join our team
                  </a>
                </NavDropdown.Item>
                <NavDropdown.Item>
                  <a
                    href="https://beta-doterra.myvoffice.com/cosminatopircean/#/contactUs"
                    className="nav-link-menu"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Contact
                  </a>
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
