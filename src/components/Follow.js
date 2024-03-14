import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FollowButton = ({ ownerId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowUser = async () => {
    try {
      const response = await axios.post("/followers/", { followed: ownerId });
      setIsFollowing(true);
      toast.success(`You are now following this user!`);
    } catch (error) {
      console.error("Error following user:", error);
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

  return (
    <>
      {isFollowing ? (
        <Button variant="secondary" onClick={handleUnfollowUser}>
          Following...
        </Button>
      ) : (
        <Button variant="primary" onClick={handleFollowUser}>
          Follow <FontAwesomeIcon icon={faCirclePlus} />
        </Button>
      )}
    </>
  );
};

export default FollowButton;