import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import styles from "../../styles/ProfileEditForm.module.css";

const ProfileEditForm = () => {
  return (
    <>
      <Row className="justify-content-center">
        <h4 className="mb-4">Modify my account details/password:</h4>
        <Col md={8}>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="nickname">
              <Form.Label>Nickname:</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age:</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control
                type="text"
                name="phone_number"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>About me:</Form.Label>
              <Form.Control
                as="textarea"
                name="about"
                rows={6}
                placeholder="Write a short description about yourself"
              />
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="new_password"
                placeholder="Enter new password"
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm New Password:</Form.Label>
              <Form.Control
                type="password"
                name="confirm_password"
                placeholder="Confirm new password"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={8} className={styles.profileFormButtons}>
          <Button variant="primary" type="submit" className={styles.profileSave}>
            Save
          </Button>
          <Button variant="secondary" className={styles.profileCancel}>Cancel</Button>
        </Col>
      </Row>
    </>
  );
};

export default ProfileEditForm;
