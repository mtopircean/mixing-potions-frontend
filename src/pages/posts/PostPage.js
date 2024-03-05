import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import styles from "../../styles/PostPage.module.css";
import { faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

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
    {post && (
      <div>
        <Post {...post} />
        <div>
        <button onClick={handleEdit} className={styles["post-edit-button"]}>
          Edit <FontAwesomeIcon icon={faPenSquare} />
        </button>
        <button onClick={handleDelete} className={styles["post-delete-button"]}>
          Delete <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
      )}
      </div>
  );
};

export default PostPage;
