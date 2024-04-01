import React, { useEffect, useState } from "react";
import Post from "./Post";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { axiosReq } from "../../api/axiosDefaults";
import BodySystemPanel from "../../components/BodySystemPanel";
import { FaThumbsUp, FaSyncAlt } from "react-icons/fa";
import styles from "../../styles/PostsPage.module.css";
import { MdClear } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterState, setFilter] = useState("");
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likeCounts, setLikeCounts] = useState({});

  /* Effect for fetching posts when selected body systems or current page change */
  useEffect(() => {
    fetchPosts();
  }, [selectedBodySystems, currentPage]);

  useEffect(() => {
    fetchLikeCounts();
  }, []);

  /* Function to fetch posts from the server */
   const fetchPosts = async () => {
    try {
      let query = "/posts?page=" + currentPage;
      if (selectedBodySystems.length > 0) {
        const systemsQuery = selectedBodySystems.join(",");
        query += `&body_systems=${systemsQuery}`;
      }

      const { data } = await axiosReq.get(query);
      const newPosts = data.results.filter(
        (newPost) =>
          !posts.some((existingPost) => existingPost.id === newPost.id)
      );
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setHasLoaded(true);
      setHasMore(!!data.next);
    } catch (err) {
      console.log(err);
    }
  };

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

      console.log("Like Counts:", likeCounts);
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
  const filterPosts = (post) => {
    const { title, description, owner, products, conditions } = post;
    const searchQuery = filterState.toLowerCase().trim();

    return (
      title.toLowerCase().includes(searchQuery) ||
      description.toLowerCase().includes(searchQuery) ||
      owner.toLowerCase().includes(searchQuery) ||
      products.some((product) =>
        product.name.toLowerCase().includes(searchQuery)
      )
    );
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
              type="text"
              placeholder="Search posts..."
              value={filterState}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          {/* Body System Panel for Filtering */}
          <BodySystemPanel
            selectedBodySystems={selectedBodySystems}
            toggleBodySystem={toggleBodySystem}
          />
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={6} id="postsContainer">
          {/* Infinite Scroll for Posts */}
          <InfiniteScroll
            dataLength={posts.length}
            next={() => setCurrentPage(currentPage + 1)}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={<h4 className="text-center">No more posts</h4>}
          >
            {posts
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

                const searchMatch = filterState ? filterPosts(post) : true;

                return userMatch && bodySystemMatch && searchMatch;
              })
              .map((post) => {
                try {
                  return <Post key={post.id} {...post} setPosts={setPosts} />;
                } catch (error) {
                  console.error("Error rendering post:", error);
                  return null;
                }
              })}
          </InfiniteScroll>
        </Col>
        <Col className="py-2 p-0 p-lg-2" lg={3}>
          {/* Display most liked users */}
          {hasLoaded && posts.length > 0 && (
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
    </Container>
  );
}

export default PostsPage;
