import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import {
    faWhatsapp,
    faFacebook,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { NavLink } from 'react-router-dom';
import styles from "../styles/Footer.module.css"

// Component rendering footer with links and icons
function App() {
    return (
        <Container>
            <footer className={styles.footer}>
                <Row>
                    <Col xs={4} className="(styles.[text-left]}">
                        <div className={styles.gdpr}>
                            <NavLink to="/gdpr">GDPR</NavLink>
                        </div>
                    </Col>
                    <Col xs={4} className="text-center">
                        <div className={styles.join}>
                            <a
                                href="https://beta-doterra.myvoffice.com/cosminatopircean/#/contactUs"
                                target="blank"
                                rel="noreferrer"
                            >
                                Join Us <FontAwesomeIcon icon={faPlus} />
                            </a>
                        </div>
                    </Col>
                    <Col xs={4} className="text-right">
                        <div className={styles.social}>
                            <a
                                href="https://wa.me/+353876403084"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faWhatsapp} />
                            </a>
                            <a
                                href="https://www.facebook.com/gherasim.cosmina"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a
                                href="https://www.instagram.com/cosminatopircean/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA%3D%3D"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </footer>
        </Container>
    );
}

export default App;
