import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/Follow.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const FollowButton = ({ ownerId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const currentUser = useCurrentUser();

  useEffect(() => {
  }, [currentUser, ownerId]);

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

  if (!currentUser) {
    return null;
  }

  console.log("currentUser:", currentUser);


  return (
    <>
      {isFollowing ? (
         <Link to={`/profile/${currentUser.pk}`} className={styles.following}>
         Following...
       </Link>
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
