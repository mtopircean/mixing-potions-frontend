import React from "react";
import { Container, NavDropdown } from "react-bootstrap";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBars,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  

  const handleLogout = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      window.location.href = "/";
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
        <NavDropdown.Item
          as="a"
          href="/"
          className="user-link-menu"
          onClick={handleLogout}
        >
          Logout
        </NavDropdown.Item>
        <NavDropdown.Item
          as={Link}
          to={`/profile/${currentUser?.profile_id}`}
          className="user-link-menu"
        >
          Profile
        </NavDropdown.Item>
      </NavDropdown>
    </>
  );

  const loggedOutIcons = (
    <>
      <Link to="/login" className="nav-link">
        Join/Login <FontAwesomeIcon icon={faUser} />
      </Link>
    </>
  );

  return (
    <Container>
      <Navbar fixed="top" className="navbar-container">
        <Navbar.Brand as={Link} to="/">
          <div className="logo-container">
            <img src={logo} alt="logo" height="120" />
          </div>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {currentUser ? loggedInIcons : loggedOutIcons}
            <NavDropdown
              title={<FontAwesomeIcon icon={faBars} />}
              id="basic-nav-dropdown"
            >
              <div id="menu-items">
                <NavDropdown.Item as="a" href="/" className="nav-link-menu">
                  Home
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to={currentUser ? "/posts/create" : "/login"}
                  className="nav-link-menu"
                  rel="noopener noreferrer"
                >
                  Create Post <FontAwesomeIcon icon={faSquarePlus} />
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
