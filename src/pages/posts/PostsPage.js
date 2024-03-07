import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Container, Row, Col, Button } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import BodySystemPanel from "../../components/BodySystemPanel";
import { FaThumbsUp } from "react-icons/fa";
import styles from "../../styles/PostsPage.module.css";
import { MdClear } from "react-icons/md";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterState, setFilter] = useState("");
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let query = "/posts";
        if (selectedBodySystems.length > 0) {
          const systemsQuery = selectedBodySystems.join(",");
          query += `?body_systems=${systemsQuery}`;
        }

        const { data } = await axiosReq.get(query);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
    console.log("Selected Body Systems:", selectedBodySystems);
  }, [filterState, selectedBodySystems]);

  const sortByLikes = (posts) => {
    const userLikesCount = {};
    posts.forEach((post) => {
      const { owner, like_count } = post;
      if (!userLikesCount[owner]) {
        userLikesCount[owner] = 0;
      }
      userLikesCount[owner] += like_count || 0;
    });

    const sortedUsers = Object.keys(userLikesCount)
      .filter((user) => userLikesCount[user] > 0)
      .sort((a, b) => userLikesCount[b] - userLikesCount[a]);

    return sortedUsers.map((user, index) => ({
      id: index,
      owner: user,
      like_count: userLikesCount[user],
    }));
  };

  const clearFilter = () => {
    setSelectedUser(null);
    setSelectedBodySystems([]);
  };

  const handleUserClick = (username) => {
    setSelectedUser(username);
    const userFilter = `owner=${username}`;
    setFilter(userFilter);
  };

  const toggleBodySystem = (system) => {
    setSelectedBodySystems((prevSystems) =>
      prevSystems.includes(system)
        ? prevSystems.filter((s) => s !== system)
        : [...prevSystems, system]
    );
    console.log("Selected Body Systems:", selectedBodySystems);
  };

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={3}>
        <BodySystemPanel
          selectedBodySystems={selectedBodySystems}
          toggleBodySystem={toggleBodySystem}
        />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results
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
          <Container>
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={3}>
        {hasLoaded && posts.results.length > 0 && (
          <Container>
            <div style={{ textAlign: "center" }}>
              {selectedUser && (
                <div className={styles.selectedFilter}>
                  <span>{selectedUser}</span>
                  <Button variant="light" onClick={clearFilter}>
                    <MdClear color="red" />
                  </Button>
                </div>
              )}
              <h5 className={styles["liked-header"]}>
                <FaThumbsUp className={styles["like-user-icon"]} /> Most liked
                users:
              </h5>
              <hr></hr>
            </div>
            {sortByLikes(posts.results).map((user) => (
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
