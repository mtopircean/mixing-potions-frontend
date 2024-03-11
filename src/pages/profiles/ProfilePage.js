import React, { useState, useEffect } from "react";
import styles from "../../styles/ProfilePage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
  faCircleMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosReq } from "../../api/axiosDefaults";
import axios from "axios";
import Post from "../../pages/posts/Post";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const currentUser = useCurrentUser();
  const { pk } = currentUser;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);

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

        const response = await axios.get(`/followers`);
        if (response.status === 200) {
          setFollowedUsers(response.data.results);
        } else {
          throw new Error("Failed to fetch followed users");
        }
      } catch (error) {
        setLoading(false);
        console.error(
          "Error fetching profile, posts, and followed users:",
          error
        );
        return <div>Error: Failed to load data. Please try again later.</div>;
      }
    };

    fetchProfileAndPosts();
  }, [pk, currentUser.username]);

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

  const unfollowUser = async (followedUserId) => {
    try {
      await axios.delete(`/followers/${followedUserId}`);
      setFollowedUsers((prevFollowerdUsers) =>
        prevFollowerdUsers.filter((user) => user.id !== followedUserId)
      );
      toast.success("User unfollowed successfully!");
    } catch (error) {
      console.error("Error unfollowing user:", error);
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
                  to={`/profiles/${profile.id}/edit`}
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
                <h5>Email:</h5>
                <p>{profile.email}</p>
                </div>
                <div className={styles["profile-detail"]}>
                  <h5>Nickname:</h5>
                  <p>{profile.nickname}</p>
                </div>
                <div className={styles["profile-detail"]}>
                  <h5>First name:</h5>
                  <p>{profile.first_name}</p>
                </div>
                <div className={styles["profile-detail"]}>
                  <h5>Last name:</h5>
                  <p>{profile.last_name}</p>
                </div>
                <div className={styles["profile-detail"]}>
                <h5>Age:</h5>
                <p>{profile.age}</p>
                </div>
                <div className={styles["profile-detail"]}>
                <h5>Phone Number:</h5>
                <p>{profile.phone_number}</p>
                </div>
                <div className={styles["text-center"]}>
                <h5>About:</h5>
                <p>{profile.about}</p>
                </div>
            </Col>
          )}
        </Row>
      ) : (
        <div>Error: Profile not found</div>
      )}
      <hr></hr>

      {userPosts && userPosts.length > 0 && (
        <Row>
          <Col xs={12} md={6} className="justify-content-center">
            <h4>My Posts:</h4>
            <Row>
              {userPosts.map((post) => (
                <Col xs={12} md={6} key={post.id} className="post-size mb-3">
                  <Post {...post} />
                </Col>
              ))}
            </Row>
          </Col>
          <Col xs={12} md={6}>
            <div
              className={`${styles["followed-users"]} d-flex flex-column justify-content-center`}
            >
              <h4 className="text-center">Followed Users:</h4>
              <div>
                {followedUsers.map((user) => (
                  <Row key={user.id} className="align-items-center">
                    <Col xs={8}>
                      <p key={user.id}>{user.followed_name}</p>
                    </Col>
                    <Col xs={4}>
                      <Button
                        onClick={() => unfollowUser(user.id)}
                        className={styles.unfollowUser}
                      >
                        <span>Unfollow</span>{" "}
                        <FontAwesomeIcon icon={faCircleMinus} />
                      </Button>
                    </Col>
                  </Row>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ProfilePage;
