import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";

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

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {hasLoaded ? (
          <>
            {posts.results.length ? (
              posts.results.map((post) => (
                <Post key={post.id} {...post} setPosts={setPosts} />
              ))
            ) : (
              <Container>
                <h5>No result</h5>>
              </Container>
            )}
          </>
        ) : (
          <Container>
            <Asset spinner />
          </Container>
        )}
      </Col>
    </Row>
  );
}

export default PostsPage