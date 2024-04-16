import React from 'react';
import { Container, NavDropdown } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import logo from '../assets/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faBars,
    faSquarePlus,
} from '@fortawesome/free-solid-svg-icons';
import {
    useCurrentUser,
    useSetCurrentUser,
} from '../contexts/CurrentUserContext';
import axios from 'axios';
import Avatar from './Avatar';
import { Link } from 'react-router-dom';
import { removeTokenTimestamp } from '../utils/utils';
import { useHistory } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';

// NavBar component displaying navigation bar
const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const history = useHistory();

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/logout/');
            setCurrentUser(null);
            removeTokenTimestamp();
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleLogoClick = () => {
        if (location.pathname === '/') {
            window.location.reload();
        } else {
            history.push('/');
        }
    };

    // Render icons based on user authentication status
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
                                className={styles.avatarImage}
                                aria-label="Avatar Image"
                            />
                            <span className={styles.username}>
                                {currentUser.username}
                            </span>
                        </>
                    ) : (
                        currentUser?.username
                    )
                }
            >
                <NavDropdown.Item
                    as="a"
                    href="/"
                    className={styles.userLinkMenu}
                    onClick={handleLogout}
                    aria-label="Logout"
                >
                    Logout
                </NavDropdown.Item>
                <NavDropdown.Item
                    as={Link}
                    to={`/profile/${currentUser?.profile_id}`}
                    className={styles.userLinkMenu}
                    aria-label="Profile"
                >
                    Profile
                </NavDropdown.Item>
            </NavDropdown>
        </>
    );

    const loggedOutIcons = (
        <>
            <Link to="/login" className={styles.navLink} aria-label="Login">
                Join/Login <FontAwesomeIcon icon={faUser} />
            </Link>
        </>
    );

    return (
        <Container>
            <Navbar fixed="top" className={styles.navbarContainer}>
                <Navbar.Brand as={Link} to="/" onClick={handleLogoClick}>
                    <div className={styles.logoContainer}>
                        <img src={logo} alt="logo" height="120" />
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse className={styles.basicNavbarNav}>
                    <Nav className="ml-auto">
                        {currentUser ? loggedInIcons : loggedOutIcons}
                        <NavDropdown
                            title={<FontAwesomeIcon icon={faBars} className={styles.customFontAwesomeIcon}/>}
                            className={`${styles.basicNavDropdown} ${currentUser ? styles.loggedInDropdown : ''}`}
                            aria-label="Menu Arrow"
                        >
                            <div className={styles.menuItems}>
                                <NavDropdown.Item
                                    as="a"
                                    href="/"
                                    className={styles.navLinkMenu}
                                    aria-label="Home"
                                >
                                    Home
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    as={Link}
                                    to={
                                        currentUser ? '/posts/create' : '/login'
                                    }
                                    className={styles.navLinkMenu}
                                    rel="noopener noreferrer"
                                    aria-label="Create Post"
                                >
                                    Create Post{' '}
                                    <FontAwesomeIcon icon={faSquarePlus} />
                                </NavDropdown.Item>
                            </div>
                        </NavDropdown>
                        <style>
                            {`
                                .dropdown-menu.show {
                                    border: none;
                                }
                            `}
                        </style>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default NavBar;
