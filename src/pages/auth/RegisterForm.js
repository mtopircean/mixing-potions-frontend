import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", formData);
      history.push("/profile-personals");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Col className="d-flex justify-content-center align-items-center flex-column">
        <Card className="register-card">
          <Card.Body>
            <Card.Title className="text-center">Register:</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Set a password"
                  name="password1"
                  value={formData.password1}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your Password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                className="register-button"
              >
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default RegisterForm;
