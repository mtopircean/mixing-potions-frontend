import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import styles from "../../styles/ProfileEditForm.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const ProfileEditForm = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [formData, setFormData] = useState(
    {
      username: "",
      nickname: "",
      first_name: "",
      last_name: "",
      age: "",
      phone_number: "",
      about: "",
    });

    useEffect(() => {
const fetchProfileData = async () => {
  try {
    const response = await axios.get(`/profiles/${id}/`);
    const profileData = response.data;
    console.log("Profile Data:", profileData);
    setFormData(profileData);
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }
};

fetchProfileData();

  }, [id]);


  return (
    <>
      <Row className="justify-content-center">
        <h4 className="mb-4 mt-4">Modify my account details/password:</h4>
        <Col md={8}>
          <Form>
            <Form.Group controlId="username">
              <Form.Label>Username: {formData.username || "Data was not submitted. Populate your profile."}</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="nickname">
              <Form.Label>Nickname: {formData.nickname || "Data was not submitted. Populate your profile."}</Form.Label>
              <Form.Control
                type="text"
                name="nickname"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="firstName">
              <Form.Label>First Name: {formData.first_name || "Data was not submitted. Populate your profile."}</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name: {formData.last_name || "Data was not submitted. Populate your profile."}</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="age">
              <Form.Label>Age: {formData.age || "Data was not submitted. Populate your profile."}</Form.Label>
              <Form.Control
                type="number"
                name="age"
                placeholder="Type updated details..."
              />
            </Form.Group>
            <Form.Group controlId="phoneNumber">
              <Form.Label>Phone Number: {formData.phone_number || "Data was not submitted. Populate your profile."}</Form.Label>
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
                placeholder={formData.about || "Data was not submitted. Populate your profile."}
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
