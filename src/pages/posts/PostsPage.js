import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Container, Row, Col, Button, Form, Spinner } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import BodySystemPanel from "../../components/BodySystemPanel";
import { FaThumbsUp, FaSyncAlt } from "react-icons/fa";
import styles from "../../styles/PostsPage.module.css";
import { MdClear } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router";

function PostsPage({ filter = "" }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [setFilter] = useState("");
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);
  const [likeCounts, setLikeCounts] = useState({});
  const [posts, setPosts] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(true);
  const { pathname } = useLocation();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Construct query parameters based on filter, query, and selectedBodySystems
        const queryParams = {
          ...(filter && { filter }),
          ...(query && { search: query }),
          ...(selectedBodySystems.length > 0 && { body_systems: selectedBodySystems.join(',') })
        };
  
        const { data } = await axiosReq.get('/posts/', { params: queryParams });

        // Filter posts based on selectedBodySystems
        const filteredPosts = selectedBodySystems.length > 0 ? data.results.filter(post => {
          return post.products.some(product => {
            return selectedBodySystems.some(system => product.body_systems.includes(system));
          });
        }) : data.results;
  
        setPosts({ ...data, results: filteredPosts });
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };
  
    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchPosts();
    }, 1000);
  
    // Cleanup function to clear the timer when component unmounts or dependencies change
    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, selectedBodySystems, pathname]);

  useEffect(() => {
    fetchLikeCounts();
  }, []);

  /*
  Responsible for fetching the like counts for each user across all posts.
  It iterates through all pages of posts, accumulates the like counts for each user, 
  and updates the state with the total like counts.
*/
  const fetchLikeCounts = async () => {
    try {
      const likeCounts = {};
      let currentPage = 1;
      while (true) {
        const { data } = await axiosReq.get(`/posts/?page=${currentPage}`);
        data.results.forEach((post) => {
          const owner = post.owner;
          const likeCount = post.like_count;
          if (likeCounts[owner]) {
            likeCounts[owner] += likeCount;
          } else {
            likeCounts[owner] = likeCount;
          }
        });
        if (!data.next) {
          break;
        }
        currentPage++;
      }

      setLikeCounts(likeCounts);
    } catch (err) {
      console.log(err);
    }
  };

  /* Function to clear all filters */
  const clearFilter = () => {
    setSelectedUser(null);
    setSelectedBodySystems([]);
    setFilter("");
  };

  /* Function to handle user click for filtering */
  const handleUserClick = (username) => {
    setSelectedUser(username);
  };

  /* Function to toggle body systems for filtering */
  const toggleBodySystem = (system) => {
    setSelectedBodySystems((prevSystems) =>
      prevSystems.includes(system)
        ? prevSystems.filter((s) => s !== system)
        : [...prevSystems, system]
    );
  };

  /* Function to sort users by likes */
  const sortByLikes = () => {
    return Object.keys(likeCounts)
      .filter((user) => likeCounts[user] > 0)
      .sort((a, b) => likeCounts[b] - likeCounts[a])
      .map((user, index) => ({
        id: index,
        owner: user,
        like_count: likeCounts[user],
      }));
  };

  /* Function to filter posts based on search query */
  const fetchMoreData = async (currentPosts, setPosts) => {
    try {
      const { data } = await axiosReq.get(currentPosts.next);
      setPosts((prevPosts) => ({
        results: [...prevPosts.results, ...data.results],
        next: data.next,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  /* Function to refresh the number of likes on the most liked */
  const handleRefreshLikes = () => {
    fetchLikeCounts();
  };

  return (
    <Container>
      <Row className="h-100">
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          <div className="mb-3">
            <Form.Control
              className="search-bar"
              onChange={(event) => setQuery(event.target.value)}
              type="text"
              placeholder="Search posts..."
              value={query}
            />
          </div>
          {/* Body System Panel for Filtering */}
          <BodySystemPanel
            selectedBodySystems={selectedBodySystems}
            toggleBodySystem={toggleBodySystem}
          />
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={6} id="postsContainer">
          {hasLoaded ? (
            posts.results.length ? (
              <InfiniteScroll
                children={posts.results.map((post) => (
                  <Post key={post.id} {...post} setPosts={setPosts} />
                ))}
                dataLength={posts.results.length}
                loader="Loading"
                hasMore={!!posts.next}
                next={() => fetchMoreData(posts, setPosts)}
              />
            ) : (
              <Container className="text-center">
                <p>No results</p>
              </Container>
            )
          ) : (
            <Container className="text-center">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Container>
          )}
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          {/* Display most liked users */}
          {posts.results.length > 0 && (
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
                  <Button variant="link" onClick={handleRefreshLikes}>
                    <FaSyncAlt />
                  </Button>
                </h5>
                <hr />
              </div>
              {sortByLikes().map((user) => (
                <div key={user.owner}>
                  <div
                    className={
                      selectedUser === user.owner ? styles.selectedUser : ""
                    }
                  >
                    <button
                      onClick={() => handleUserClick(user.owner)}
                      className={`${styles.mostLikedButton}`}
                    >
                      <strong>{user.owner}</strong>
                    </button>
                    has {user.like_count} likes
                  </div>
                </div>
              ))}
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default PostsPage;
