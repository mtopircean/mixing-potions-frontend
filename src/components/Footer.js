import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink } from "react-router-dom";

function App() {
  return (
    <Container>
      <footer className="footer">
        <Row>
          <Col xs={4} className="text-left">
            <div className="gdpr">
              <NavLink to="gdpr">GDPR</NavLink>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="join">
              <a
                href="https://beta-doterra.myvoffice.com/cosminatopircean/#/contactUs"
                target="blank"
              >
                Join Us <FontAwesomeIcon icon={faPlus} />
              </a>
            </div>
          </Col>
          <Col xs={4} className="text-right">
            <div className="social">
              <a href="https://wa.me/+353876403084" target="_blank">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a
                href="https://www.facebook.com/gherasim.cosmina"
                target="_blank"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a
                href="https://www.instagram.com/cosminatopircean/?utm_source=ig_web_button_share_sheet&igshid=OGQ5ZDc2ODk2ZA%3D%3D"
                target="_blank"
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
