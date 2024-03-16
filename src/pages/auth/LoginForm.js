import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { Form, Button, Row, Col, Card, Alert } from "react-bootstrap";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";
import registerImage from '../../assets/register.jpg';
import styles from "../../styles/LoginRegisterPage.module.css"

function LoginForm() {
  const setCurrentUser = useSetCurrentUser();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { username, password } = loginData;

  const [errors, setErrors] = useState({});

  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", loginData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  const handleChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className={`${styles["login-register"]} ${styles["login-container"]}`}>
      <Row>
        <Col md={6} className="d-flex flex-column">
          <Card className={styles["login-card"]}>
            <Card.Body>
              <Card.Title className="text-center">Login:</Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicusername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors.username?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

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
                {errors.password?.map((message, idx) => (
                  <Alert key={idx} variant="warning">
                    {message}
                  </Alert>
                ))}

                <Button
                  variant="primary"
                  type="submit"
                  className={styles["login-button"]}
                >
                  Login
                </Button>
                {errors.non_field_errors?.map((message, idx) => (
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
          <NavLink to="/register" className={styles["register-link"]}>REGISTER</NavLink>
        </Col>
      </Row>
    </div>
  );
}

export default LoginForm;
