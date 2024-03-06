import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";
import BodySystemPanel from "../../components/BodySystemPanel";
import { FaThumbsUp } from "react-icons/fa";
import styles from "../../styles/PostsPage.module.css";

function PostsPage({ message, filter = "" }) {
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axiosReq.get(`/posts/?${filter}`);
        setPosts(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchPosts();
  }, [filter, pathname]);

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
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={3}>
        <BodySystemPanel />
      </Col>
      <Col className="py-2 p-0 p-lg-2" lg={6}>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
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
              <h5 className={styles["liked-header"]}>
                <FaThumbsUp className={styles["like-user-icon"]} /> Most liked
                users:
              </h5>
              <hr></hr>
            </div>
            {sortByLikes(posts.results).map((user) => (
              <div key={user.owner}>
                <p>
                  <strong>{user.owner}</strong> has {user.like_count} likes
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
