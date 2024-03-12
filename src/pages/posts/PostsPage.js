import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import BodySystemPanel from "../../components/BodySystemPanel";
import { FaThumbsUp } from "react-icons/fa";
import styles from "../../styles/PostsPage.module.css";
import { MdClear } from "react-icons/md";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterState, setFilter] = useState("");
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);
  const [showClearButton, setShowClearButton] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let query = "/posts";
        if (selectedBodySystems.length > 0) {
          const systemsQuery = selectedBodySystems.join(",");
          query += `?body_systems=${systemsQuery}`;
        }

        const { data } = await axiosReq.get(query);
        setPosts(data.results);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [selectedBodySystems]);

  const clearFilter = () => {
    setSelectedUser(null);
    setSelectedBodySystems([]);
    setFilter("");
  };

  const handleUserClick = (username) => {
    setSelectedUser(username);
  };

  const toggleBodySystem = (system) => {
    setSelectedBodySystems((prevSystems) =>
      prevSystems.includes(system)
        ? prevSystems.filter((s) => s !== system)
        : [...prevSystems, system]
    );
    setShowClearButton(true);
  };

  const sortByLikes = () => {
    const userLikesCount = posts.reduce((acc, post) => {
      const { owner, like_count } = post;
      acc[owner] = (acc[owner] || 0) + (like_count || 0);
      return acc;
    }, {});

    return Object.keys(userLikesCount)
      .filter((user) => userLikesCount[user] > 0)
      .sort((a, b) => userLikesCount[b] - userLikesCount[a])
      .map((user, index) => ({
        id: index,
        owner: user,
        like_count: userLikesCount[user],
      }));
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={3}>
        <div className="mb-3">
          <Form.Control
            className="search-bar"
            type="text"
            placeholder="Search posts..."
            value={filterState}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <BodySystemPanel
          selectedBodySystems={selectedBodySystems}
          toggleBodySystem={toggleBodySystem}
        />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        {hasLoaded ? (
          <>
            {posts.length ? (
              posts
                .filter((post) => {
                  const userMatch = selectedUser
                    ? post.owner === selectedUser
                    : true;
                  const bodySystemMatch =
                    selectedBodySystems.length > 0
                      ? post.products.some((product) =>
                          product.body_systems.some((system) =>
                            selectedBodySystems.includes(system)
                          )
                        )
                      : true;

                  return userMatch && bodySystemMatch;
                })
                .map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))
            ) : (
              <Container>
                <h5>No result</h5>
              </Container>
            )}
          </>
        ) : (
          <Container className="text-center">
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={3}>
        {hasLoaded && posts.length > 0 && (
          <Container>
            <div className="mb-3">
              <Button className={styles.followedButtons}>Follosed user posts</Button>
            </div>
            <div style={{ textAlign: "center" }}>
              {selectedUser && (
                <div className={styles.selectedFilter}>
                  <span>{selectedUser}</span>
                  <Button variant="light" onClick={() => clearFilter("user")}>
                    <MdClear color="red" />
                  </Button>
                </div>
              )}
              <h5 className={styles["liked-header"]}>
                <FaThumbsUp className={styles["like-user-icon"]} /> Most liked
                users:
              </h5>
              <hr />
            </div>
            {sortByLikes().map((user) => (
              <div key={user.owner}>
                <p
                  className={
                    selectedUser === user.owner ? styles.selectedUser : ""
                  }
                >
                  <a href="#" onClick={() => handleUserClick(user.owner)}>
                    <strong>{user.owner} </strong>
                  </a>
                  has {user.like_count} likes
                </p>
              </div>
            ))}
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage;
