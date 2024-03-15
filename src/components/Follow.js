import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Follow.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const FollowButton = ({ ownerId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUser = useCurrentUser();

  const handleFollowUser = async () => {
    if (!isFollowing) {
      try {
        const response = await axios.post("/followers/", { followed: ownerId });
        setIsFollowing(true);
        toast.success(`You are now following this user!`);
      } catch (error) {
        console.error("Error following user:", error);
      }
    } else {
      toast.info("You are already following this user.");
    }
  };

  const handleUnfollowUser = async () => {
    try {
      const response = await axios.delete(`/followers/${ownerId}`);
      setIsFollowing(false);
      toast.success(`You have unfollowed this user!`);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <>
      {isFollowing ? (
        <Button
          variant="secondary"
          onClick={handleUnfollowUser}
          className={styles.following}
        >
          Following...
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={handleFollowUser}
          className={styles.followButton}
        >
          Follow <FontAwesomeIcon icon={faCirclePlus} />
        </Button>
      )}
    </>
  );
};

export default FollowButton;
