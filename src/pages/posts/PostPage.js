import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/PostPage.module.css";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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

const PostPage = (props) => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState(null);
  const currentUser = useCurrentUser();
  const history = useHistory();
  const isCurrentUserOwner =
    currentUser && post && post.owner === currentUser.username;
  const [isFollowing] = useState(false);
  const [setError] = useState(null);

  /* Fetching post data */
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        const postData = response.data;
        console.log("Fetched post data:", postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError(error);
      }
    };

    console.log("ID:", id);
    fetchPost();
  }, [id, currentUser, setError]);

  /* Checking if current user is following post owner */

  /* Edit post function */
  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  /* Delete post function */
  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      toast.success("Post deleted successfully!");
      history.push("/");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  /* Confirming post deletion */
  const confirmDelete = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      handleDelete();
    }
  };

  /* Handling previous button click */
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  /* Handling next button click */
  const handleNextClick = () => {
    if (post && post.products) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, post.products.length - 1)
      );
    }
  };

  /* Handling comment submission */
  const handleCommentSubmitted = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [newComment, ...prevPost.comments],
      comment_count: prevPost.comment_count + 1,
    }));
  };

  /* Handling edit comment */
  const handleEditComment = (comment) => {
    console.log("Editing comment:", comment);
    setEditMode(true);
    setEditComment(comment);
  };

  /* Handling comment deletion */
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
        comment_count: prevPost.comment_count - 1,
      }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  /* Loading state */
  if (!post) {
    return <div>Loading...</div>;
  }

  /* Extracting unique body systems and conditions */
  const allBodySystems = post.products.flatMap(
    (product) => product.body_systems
  );
  const uniqueBodySystems = Array.from(new Set(allBodySystems));

  const allConditions = post.products.flatMap((product) => product.condition);

  const uniqueConditions = Array.from(new Set(allConditions));

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
                  <strong>{post.owner}</strong>
                </Link>
              </div>
            </div>

            {post.image && (
              <div className={styles.imageContainer}>
                <img
                  src={post.image}
                  alt="Post"
                  className="img-fluid"
                  style={{ width: "100%", maxHeight: "100%" }}
                />
              </div>
            )}
            <Row>
              <Col md={6}>
                <Like
                  postId={id}
                  isLiked={post.like_id !== null}
                  likeCount={post.like_count}
                  likeId={post.like_id}
                />
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
          <h5 className={styles["post-description-detail"]}>Description</h5>
          <div className={styles.descriptionPost}>
            <p>{post.description}</p>
          </div>
          <hr />
          <div className={styles.CommentsAreaWrapper}>
            {post.products.map((product, index) => (
              <div key={index}>
                {index === 0 && (
                  <div className={"card-text " + styles.systemCondition}>
                    <h6>
                      <strong>Condition: </strong>
                      <span className={styles.listedSpecs}>
                        {uniqueConditions.join(", ")}
                      </span>
                    </h6>
                  </div>
                )}
                {index === 0 && (
                  <div className={"card-text " + styles.systemCondition}>
                    <h6>
                      <strong>Body Systems: </strong>
                      <span className={styles.listedSpecs}>
                        {uniqueBodySystems.join(", ")}
                      </span>
                    </h6>
                  </div>
                )}
              </div>
            ))}
          </div>
          <hr />
          <div>
            <h5
              className={`${styles["comments-detail"]} ${styles["CommentOwner"]}`}
            >
              Comments
            </h5>
            <div className={styles.CommentsAreaWrapper}>
              {post.comments &&
                post.comments.map((comment, index) => (
                  <div key={index} className={styles.Comment}>
                    <div className={styles.CommentOwner}>
                      <Link to={`/profile/${comment.owner_profile?.id}`}>
                        <strong>{comment.owner}</strong>
                      </Link>
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
                editMode={editMode}
                editComment={editComment}
                onCommentSubmitted={handleCommentSubmitted}
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
          <div className={styles["products-used-detail"]}>
            <h5 className={styles["products-used-detail"]}>Products Used</h5>
            {post && post.products && post.products.length > 0 ? (
              <div className="row">
                {post.products.map((product, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className={"card " + styles["products-used"]}>
                      <img
                        src={product.image}
                        className={`card-img-top ${styles.postImage}`}
                        alt={product.name}
                      />
                      <div className="card-body">
                        <h5 className="card-title"><strong>{product.name}</strong></h5>
                        <p className="card-text">
                          <strong>Condition: </strong>{product.condition.join(", ")}
                        </p>
                        <p className="card-text">
                        <strong>Body Systems: </strong>{product.body_systems.join(", ")}
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
