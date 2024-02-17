import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/ProfilePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`/profiles/`);
        console.log("Profile data:", response.data);
        setProfile(response.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return <div>Loading data.......</div>;
  }

  const handleDelete = () => {
    if (window.confirm("Please confirm deletion of your profile!")) {
      console.log("Deleting profile");
    }
  };

  return (
    <Container>
      {profile ? (
        <Row>
          <Col md={6} className={styles["profile-header"]}>
            <div className={styles["header-ranking"]}>
              <img
                src={profile.image}
                alt="Profile"
                className={styles["profile-image"]}
              />
              <h4>
                Ranking:{" "}
                <span className={styles["user-ranking"]}>
                  {profile.user_status}
                </span>
              </h4>
            </div>
          </Col>
          <Col md={6} className={styles["name-header"]}>
            <div>
              <h2>
                {profile.first_name} {profile.last_name}
              </h2>
              <div className={styles["edit-delete-buttons"]}>
                <NavLink
                  to="/edit-profile"
                  className={styles["edit-button"]}
                  activeClassName={styles["active"]}
                >
                  Edit <FontAwesomeIcon icon={faPenToSquare} />
                </NavLink>
                <button
                  className={styles["delete-button"]}
                  onClick={handleDelete}
                >
                  Delete <FontAwesomeIcon icon={faTrashCan} />
                </button>
              </div>
            </div>
            <button
              onClick={toggleExpanded}
              className={styles["profile-button"]}
            >
              {expanded ? "▲" : "▼"}
            </button>
          </Col>
          <hr></hr>
          {expanded && (
            <Col xs={12}>
              <div className={styles["profile-detail"]}>
                <h5>Age:</h5>
                <p>{profile.age}</p>
              </div>
              <div className={styles["profile-detail"]}>
                <h5>About:</h5> <p>{profile.about}</p>
              </div>
              <div className={styles["profile-detail"]}>
                <h5>Nickname:</h5> <p>{profile.nickname}</p>
              </div>
              <div className={styles["profile-detail"]}>
                <h5>Email:</h5> <p>{profile.email}</p>
              </div>
              <div className={styles["profile-detail"]}>
                <h5>Phone Number:</h5> <p>{profile.phone_number}</p>
              </div>
            </Col>
          )}
        </Row>
      ) : (
        <div>Error: Profile not found</div>
      )}
    </Container>
  );
};

export default ProfilePage;
