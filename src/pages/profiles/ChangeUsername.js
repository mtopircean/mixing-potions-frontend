import React, { useState, useEffect } from "react";
import { Col, Form, Row, Button, Container } from "react-bootstrap";
import styles from "../../styles/ProfileEditForm.module.css";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from "react-toastify";
import { axiosRes } from "../../api/axiosDefaults";

const ChangeUsername = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (currentUser?.profile_id?.toString() !== id) {
      history.push(`/`);
    } else {
      setUsername(currentUser.username);
    }
  }, [currentUser, history, id]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosRes.put("/dj-rest-auth/user/", { username });
      const response = await axiosRes.get("/dj-rest-auth/user/");

      setCurrentUser(response.data);
      toast.success("Username was updated");
      history.push(`/profile/${id}/`);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Username is already taken or the same as the current one. Please choose a different one.");
      } else {
        console.error("Error updating username:", error);
        toast.error("An error occurred while updating the username.");
      }
    }
  };

  const handleCancel = () => {
    history.push(`/profile/${id}/`);
  };

  if (!currentUser) {
    return <Redirect to="/login/" />;
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <h4 className="mb-4 mt-4 text-center">Modify username:</h4>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="username">
              <Form.Label>
                <span className={styles.editFormLabel}>Username:</span>{" "}
                {username ||
                  "Data was not submitted. Populate your profile."}
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="Type updated username..."
              />
            </Form.Group>
            <Col md={12} className={styles.profileFormButtons}>
              <Button
                variant="primary"
                type="submit"
                className={styles.profileSave}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                className={styles.profileCancel}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeUsername;
