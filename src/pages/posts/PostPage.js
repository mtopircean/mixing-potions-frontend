import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/PostPage.module.css";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostPage = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = useCurrentUser();
  const history = useHistory();
  const isCurrentUserOwner = currentUser && post && post.owner === currentUser.username;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/posts/${id}`);
        const postData = response.data;
        console.log("Fetched post data:", postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    console.log("ID:", id);
    fetchPost();
  }, [id]);

  const handleEdit = () => {
    history.push(`/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}/`);
      toast.success("Post deleted successfully!");
      history.push("/")
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

  if (!post) {
    return <div>Loading...</div>;
  }

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
            <h4 className={styles["post-title-detail"]}>{post.title}</h4>
            {post.image && (
              <img
                src={post.image}
                alt="Post Image"
                className="img-fluid"
                style={{ width: "100%", maxHeight: "100%" }}
              />
            )}
          </div>
        </Col>
        <Col md={6}>
          <h5 className={styles["post-description-detail"]}>Description</h5>
          <p>{post.description}</p>
          <div>
            <h5 className={styles["comments-detail"]}>Comments</h5>
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index}>
                  <p> {comment.owner}</p>
                  <p>{comment.comment_text}</p>
                </div>
              ))}
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
