import React, { useState, useEffect } from "react";
import Post from "./Post";
import styles from "../../styles/PostPage.module.css";
import { faCreditCard, faPenSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { response } from "msw";

const PostPage = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fectshPost = async () => {
      try {
        const response = await fetch(`/posts/`);
        const postData = await response.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error)
      }
    };

    fectshPost();
  }, []);

  const handleEdit = () => {
    console.log("Edit button clicked");
  };

  return (
    <div>
      <Post {...post} />
      <div>
        <button onClick={handleEdit} className={styles["post-edit-button"]}>
          Edit <FontAwesomeIcon icon={faPenSquare} />
        </button>
        <button onClick={handleEdit} className={styles["post-delete-button"]}>
          Delete <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default PostPage;
