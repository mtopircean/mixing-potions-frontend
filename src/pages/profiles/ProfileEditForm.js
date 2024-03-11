import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const ProfileEditForm = () => {
  return (
    <Row className="justify-content-center">
      <h4 className="mb-4">Modify my account details/password:</h4>
      <Col md={8}>
        <Form>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control 
            type="text" 
            name="username" 
            placeholder="Type updated details..."
            />
          </Form.Group>
          <Form.Group controlId="nickname">
              <Form.Label>Nickname</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                placeholder="Type updated details..."
              />
            </Form.Group>
          <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
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
        </Form>
      </Col>
    </Row>
  );
};

export default ProfileEditForm;
