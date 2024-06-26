import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import styles from '../../styles/LoginRegisterPage.module.css';

const RegisterForm = () => {
    const history = useHistory();

    // State for form data and errors
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });
    const { username, email, password1, password2 } = formData;

    const [errors, setErrors] = useState({});

    // Function to handle input change
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/dj-rest-auth/registration/', formData);
            history.push('/login');
        } catch (err) {
            if (err.response?.data?.email) {
                setErrors({ email: ['Email already exists.'] });
            } else {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Row className="align-items-center register-container">
            <Col sm={12} className="d-flex justify-content-center">
                <Card
                    className={`${styles['register-card']} ${styles['full-width']}`}
                >
                    <Card.Body>
                        <Card.Title className="text-center">
                            Register:
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your username"
                                    name="username"
                                    value={username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {errors.username?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            <Form.Group controlId="formEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    value={email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <Alert variant="warning">
                                        {errors.email[0]}
                                    </Alert>
                                )}
                            </Form.Group>
                            {errors.password1?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Set a password"
                                    name="password1"
                                    value={password1}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            {errors.password2?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}

                            <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm your Password"
                                    name="password2"
                                    value={password2}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                type="submit"
                                className={styles['register-button']}
                            >
                                Register
                            </Button>
                            {errors.non_field_errors?.map((message, idx) => (
                                <Alert
                                    key={idx}
                                    variant="warning"
                                    style={{ marginTop: '10px' }}
                                >
                                    {message}
                                </Alert>
                            ))}
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};

export default RegisterForm;
