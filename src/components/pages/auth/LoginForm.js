import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Card, NavLink, Alert } from "react-bootstrap";
import axios from "axios";

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = loginData;
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = {
        email,
        password,
      };

      await axios.post("/dj-rest-auth/login/", data);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div className="login-register">
      <Row>
        <Col md={6} className="d-flex flex-column">
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="text-center">Login:</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="login-button"
                >
                  Login
                </Button>
                {errors?.non_field_errors?.map((message, idx) => (
                  <Alert key={idx} variant="warning" className="mt-3">
                    {message}
                  </Alert>
                ))}
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col
          md={6}
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <h5 id="register-login">Don`t have an account yet.</h5>
          <NavLink to="/register">REGISTER</NavLink>
        </Col>
      </Row>
    </div>
  );
};

export default LoginForm;
