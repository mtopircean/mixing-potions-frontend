import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import styles from "../../styles/ProfileEditForm.module.css";

const ProfilePasswordChange = () => {
  


  return (
    <>
      <Row className="justify-content-center">
        <h4 className="mb-4 mt-4">Change your password</h4>
        <Col md={8}>
          <Form>
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
            Change Password
          </Button>
          <Button variant="secondary" className={styles.profileCancel}>Cancel</Button>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePasswordChange;