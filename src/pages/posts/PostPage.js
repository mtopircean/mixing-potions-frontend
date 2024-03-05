import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import styles from "../../styles/PostPage.module.css";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

const PostPage = () => {
  const [post, setPost] = useState([null]);
  const { id } = useParams();
  console.log("postId:", id);

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

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    console.log("Edit button clicked");
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  return (
    <div>
      <Row>
        <Col md={6}>
          <div>
            <Button onClick={handleEdit} className={styles["post-edit-button"]}>
              Edit <FontAwesomeIcon icon={faPenSquare} />
            </Button>
            <Button
              onClick={handleDelete}
              className={styles["post-delete-button"]}
            >
              Delete <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </div>
          <div>
            {post.image && (
              <img
                src={post.image}
                alt="Post Image"
                className="img-fluid"
                style={{ maxWidth: "400px", maxHeight: "400px" }}
              />
            )}
          </div>
        </Col>
        <Col md={6}>
          <h4>Description</h4>
          <p>{post.title}</p>
          <div>
            {post.comments &&
              post.comments.map((comment, index) => (
                <div key={index}>
                  <p> {comment.owner}</p>
                  <p>{comment.comment_text}</p>
                </div>
              ))}
          </div>

          <p>{post.description}</p>
          <h4>Products Used</h4>
        </Col>
      </Row>
    </div>
  );
};

export default PostPage;
