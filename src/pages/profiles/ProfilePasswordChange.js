import React, { useEffect, useState } from "react";
import { Col, Form, Row, Button, Alert } from "react-bootstrap";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePasswordChange = () => {
  const history = useHistory();
  const { id } = useParams();
  const currentUser = useCurrentUser();

  const [userData, setUserData] = useState({
    new_password1: "",
    new_password2: "",
  });

  const { new_password1, new_password2 } = userData;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
    }
  }, [currentUser, history, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/password/change/", userData);
      toast.success("Password successfully changed!");
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <>
      <Row className="justify-content-center">
        <h4 className="mb-4 mt-4">Change your password</h4>
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="newPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                value={new_password1}
                onChange={handleChange}
                name="new_password1"
                placeholder="Enter new password"
              />
              {errors?.new_password1 && (
                <Alert variant="danger">{errors.new_password1}</Alert>
              )}
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm New Password:</Form.Label>
              <Form.Control
                type="password"
                value={new_password2}
                onChange={handleChange}
                name="new_password2"
                placeholder="Confirm new password"
              />
              {errors?.new_password2 && (
                <Alert variant="danger">{errors.new_password2}</Alert>
              )}
            </Form.Group>
            <Col md={8}>
              <Button variant="primary" type="submit">
                Change Password
              </Button>
              <Button variant="secondary" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePasswordChange;
