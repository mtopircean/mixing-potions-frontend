import React, { useState, useEffect } from "react";
import styles from "../../styles/ProfilePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import Post from "../../pages/posts/Post";

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const { pk } = currentUser;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const { data: pageProfile } = await axiosReq.get(`/profiles/${pk}/`);
        setProfile(pageProfile);
        setLoading(false);

        const { data: postData } = await axiosReq.get(`/posts`);
        const userPostsData = postData.results.filter(
          (post) => post.owner === currentUser.username
        );
        setUserPosts(userPostsData);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching profile and posts:", error);
      }
    };

    fetchProfileAndPosts();
  }, [pk]);

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
              <h2>{profile.username}</h2>
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
                <h5>Email:</h5> <p>{profile.email}</p>
              </div>
            </Col>
          )}
        </Row>
      ) : (
        <div>Error: Profile not found</div>
      )}
      <hr></hr>
      <h4>My Posts:</h4>
      {userPosts && userPosts.length > 0 && (
        <Row xs={12} md={3} className="justify-content-between">
            {userPosts.map((post) => (
              <Col key={post.id} className="post-size mb-3">
              <Post {...post} />
              </Col>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default ProfilePage;
