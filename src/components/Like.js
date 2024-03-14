import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Like.module.css";

const Like = ({
  postId,
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  const handleLike = async () => {
    try {
      const response = await axios.post(`/posts/${postId}/like`);
      setIsLiked(true);
      setLikeCount((prevCount) => prevCount + 1);
      toast.success("You liked this post!");
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axios.delete(`/posts/${postId}/like`);
      setIsLiked(false);
      setLikeCount((prevCount) => prevCount - 1);
      toast.success("You unliked this post!");
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <div className={styles.LikesSection}>
      {isLiked ? (
        <button onClick={handleUnlike}>
          Unlike <FontAwesomeIcon icon={faThumbsUp} />
        </button>
      ) : (
        <button onClick={handleLike}>
          Like <FontAwesomeIcon icon={faThumbsUp} />
        </button>
      )}
      <span>{likeCount}</span>
    </div>
  );
};

export default Like;
