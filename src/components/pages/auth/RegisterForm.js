import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

const RegisterForm = () => {
  <Row>
    <Col
      md={6}
      className="d-flex justify-content-center align-items-center flex-column"
    >
      <Card className="register-card">
        <Card.Body>
          <Card.Title className="text-center">Register:</Card.Title>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter your username" />
            </Form.Group>

            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your first name" />
            </Form.Group>

            <Form.Group controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your last name" />
            </Form.Group>

            <Form.Group controlId="formNickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                placeholder="Will be displayed on your posts"
              />
            </Form.Group>

            <Form.Group controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your age(numeric only)"
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>

            <Form.Group controlId="formConfirmEmail">
              <Form.Label>Confirm Email address</Form.Label>
              <Form.Control type="email" placeholder="Confirm your email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Set a password" />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your Password"
              />
            </Form.Group>

            <Form.Group controlId="formAbout">
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Tell us more about yourself. Let everyone know how awesome you are!"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="register-button">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  </Row>;
};

export default RegisterForm;
