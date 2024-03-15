import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Like.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { axiosReq } from "../api/axiosDefaults";

const Like = ({
  postId,
  isLiked: initialIsLiked,
  likeCount: initialLikeCount,
  likeId,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const currentUser = useCurrentUser();

  useEffect(() => {
    setLikeCount(initialLikeCount);
  }, [initialLikeCount]);

  const handleLike = async () => {
    if (!isLiked) {
      try {
        console.log("postId:", postId);
        const response = await axios.post(`/likes/`, { post: postId });
        setIsLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
        toast.success("You liked this post!");
        console.log("Response data:", response.data);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    } else {
      toast.info("You've already liked this post.");
    }
  };
  

  const handleUnlike = async () => {
    if (isLiked) {
      try {
        console.log("Like ID:", likeId);
        const response = await axiosReq.delete(`/likes/${likeId}/`);
        setIsLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
        toast.success("You unliked this post!");
      } catch (error) {
        console.error("Error unliking post:", error.response ? error.response.data : error);
      }
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
