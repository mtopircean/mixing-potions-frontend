import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/PostPage.module.css";
import {
  faPenSquare,
  faTrashAlt,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CreateComment from "../../components/CreateComment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Like from "../../components/Like";
import Follow from "../../components/Follow";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState(null);
  const currentUser = useCurrentUser();
  const history = useHistory();
  const isCurrentUserOwner =
    currentUser && post && post.owner === currentUser.username;
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likeId, setLikeId] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        const postData = response.data;
        console.log("Fetched post data:", postData);
        setPost(postData);
        setLikeCount(postData.like_count);
        if (currentUser) {
          setIsLiked(
            postData.likes.some((like) => like.owner_id === currentUser.id)
          );
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    console.log("ID:", id);
    fetchPost();
  }, [id]);

  useEffect(() => {
    const checkFollowing = async () => {
      try {
        const response = await axios.get(`/followers/${post.owner_id}/check`);
        setIsFollowing(response.data.following);
      } catch (error) {
        console.error("Error checking follow status:", error);
      }
    };

    if (currentUser && post) {
      checkFollowing();
    }
  }, [currentUser, post]);

  const handleFollowUser = async () => {
    try {
      const response = await axios.post("/followers/", {
        followed: post.owner_id,
      });
      setIsFollowing(true);
      toast.success(`You are now following ${post.owner}`);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnfollowUser = async () => {
    try {
      const response = await axios.delete(`/followers/${post.owner_id}`);
      setIsFollowing(false);
      toast.success(`You have unfollowed ${post.owner}`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      toast.success("Post deleted successfully!");
      history.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      handleDelete();
    }
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNextClick = () => {
    if (post && post.products) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, post.products.length - 1)
      );
    }
  };

  const handleCommentSubmitted = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [newComment, ...prevPost.comments],
    }));
  };

  const handleEditComment = (comment) => {
    console.log("Editing comment:", comment);
    setEditMode(true);
    setEditComment(comment);
  };

  const handleCommentDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`/comments/${commentId}/`);
      toast.success("Comment deleted successfully!");
      const updatedComments = post.comments.filter(
        (comment) => comment.id !== commentId
      );
      setPost((prevPost) => ({
        ...prevPost,
        comments: updatedComments,
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  const uniqueBodySystems = Array.from(
    new Set(post.products.flatMap((product) => product.body_systems))
  );
  const uniqueConditions = Array.from(
    new Set(post.products.flatMap((product) => product.condition))
  );

  return (
    <div>
      <Row>
        <Col md={6}>
          <div className="arrow-button">
            {isCurrentUserOwner && (
              <Button
                onClick={handleEdit}
                className={styles["post-edit-button"]}
              >
                Edit <FontAwesomeIcon icon={faPenSquare} />
              </Button>
            )}
            {isCurrentUserOwner && (
              <Button
                onClick={confirmDelete}
                className={styles["post-delete-button"]}
              >
                Delete <FontAwesomeIcon icon={faTrashAlt} />
              </Button>
            )}
          </div>
          <div>
            <div className="text-center">
              <div>
                <h4 className={styles["post-title-detail"]}>{post.title}</h4>
                <br />
                <span className={styles["by-title"]}> by.........</span>
                <Link
                  to={`/profile/${post.owner_id}`}
                  className={styles.usernameLink}
                >
                  {post.owner}
                </Link>
              </div>
            </div>
            {post.image && (
              <img
                src={post.image}
                alt="Post Image"
                className="img-fluid"
                style={{ width: "100%", maxHeight: "100%" }}
              />
            )}
            <Row>
              <Col md={6}>
                <div className={styles.LikesSection}>
                <Like
                  postId={id}
                  isLiked={isLiked}
                  likeCount={likeCount}
                  likeId={likeId}
                />
                </div>
              </Col>
              <div className="col-md-6 d-flex justify-content-end">
              {isFollowing ? (
                <Link to="/profile" className={styles.following}>
                  Following...
                </Link>
              ) : (
                <Follow ownerId={post.owner_id} />
              )}
            </div>
            </Row>
          </div>
        </Col>
        <Col md={6}>
          <div className={styles.descriptionPost}>
            <h5 className={styles["post-description-detail"]}>Description</h5>
            <p>{post.description}</p>
          </div>
          <div className={styles.CommentsAreaWrapper}>
            {post.products.map((product, index) => (
              <div key={index}>
                <p className="card-text">
                  <h6>Condition: <span className={styles.listedSpecs}>{product.condition.join(", ")}</span></h6>
                </p>
                <p className="card-text">
                  <h6>Body Systems: <span className={styles.listedSpecs}>{product.body_systems.join(", ")}</span></h6>
                  
                </p>
              </div>
            ))}
          </div>
          <hr />
          <div>
            <div className={styles.CommentsAreaWrapper}>
              <h5
                className={`${styles["comments-detail"]} ${styles["CommentOwner"]}`}
              >
                Comments
              </h5>
              {post.comments &&
                post.comments.map((comment, index) => (
                  <div key={index} className={styles.Comment}>
                    <div className={styles.CommentOwner}>
                    <Link to={`/profile/${comment.owner_profile.id}`}>{comment.owner}</Link>
                    {console.log("Owner ID:", comment.owner_id)}
                      {currentUser &&
                        currentUser.username === comment.owner && (
                          <span className={styles.CommentBubble}>
                            <Button
                              className={styles["edit-button"]}
                              onClick={() => handleEditComment(comment)}
                            >
                              Edit <FontAwesomeIcon icon={faPenSquare} />
                            </Button>
                            <Button
                              className={styles["delete-button"]}
                              onClick={() => handleCommentDelete(comment.id)}
                            >
                              Delete <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                          </span>
                        )}
                    </div>
                    <p>{comment.comment_text}</p>
                    <hr />
                  </div>
                ))}
            </div>
            <div className={styles.AddComment}>
              <CreateComment
                postId={id}
                onCommentSubmitted={handleCommentSubmitted}
                editMode={editMode}
                editComment={editComment}
              />
            </div>
          </div>
        </Col>
      </Row>
      <hr></hr>
      <Row>
        <Col md={12}>
          <Col className="d-flex justify-content-between mb-3">
            {post && post.products.length > 2 && (
              <Button
                onClick={handlePrevClick}
                className={`${styles["arrow-button"]} ${styles["left-arrow"]}`}
              >
                <FaChevronLeft />
              </Button>
            )}
            {post &&
              post.products.length > 2 &&
              currentIndex + 2 < post.products.length && (
                <Button
                  onClick={handleNextClick}
                  className={`${styles["arrow-button"]} ${styles["right-arrow"]}`}
                >
                  <FaChevronRight />
                </Button>
              )}
          </Col>
          <div>
            <h5 className={styles["products-used-detail"]}>Products Used</h5>
            {post && post.products && post.products.length > 0 ? (
              <div className="row">
                {post.products.map((product, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="card">
                      {console.log("Product data:", product)}
                      <img
                        src={product.image}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">
                          Condition: {product.condition.join(", ")}
                        </p>
                        <p className="card-text">
                          Body Systems: {product.body_systems.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products used for this post.</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PostPage;
