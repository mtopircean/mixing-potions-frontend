import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function App() {
  return (
    <Container>
      <footer className="footer">
        <Col xs={12}>
          <hr></hr>
        </Col>
        <Row>
          <Col xs={4} className="text-left">
            <div className="gdpr">
              <a href="#">GDPR</a>
            </div>
          </Col>
          <Col xs={4} className="text-center">
            <div className="join">
              <a href="#">
                Join Us <FontAwesomeIcon icon={faPlus} />
              </a>
            </div>
          </Col>
          <Col xs={4} className="text-right">
            <div className="social">
              <a href="#">
                <FontAwesomeIcon icon={faWhatsapp} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}

export default App;
