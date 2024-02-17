import React, { useState } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    nickname: "",
    age: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
    about: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      console.log("Passwords are not matching");
      return;
    }
    if (formData.email !== formData.confirmEmail) {
      console.log("Emails are not matching");
      return;
    }
    try {
      const response = await axios.post("/api/register/", formData);
      console.log(response.data);
    } catch (error) {
      console.error("Failed registration", error);
    }
  };

  return(
    <Row>
      <Col
        className="d-flex justify-content-center align-items-center flex-column"
      >
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

              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter your first name" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter your last name" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formNickname">
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Will be displayed on your posts"
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your age(numeric only)"
                  name="age"
                  value={formData.age}
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

              <Form.Group controlId="formConfirmEmail">
                <Form.Label>Confirm Email address</Form.Label>
                <Form.Control type="email" 
                placeholder="Confirm your email" 
                name="confirmEmail"
                value={formData.confirmEmail}
                onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                type="password" 
                placeholder="Set a password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm your Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formAbout">
                <Form.Label>About</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Tell us more about yourself. Let everyone know how awesome you are!"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" 
              type="submit" 
              className="register-button">
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
