import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import styles from "../styles/PostCreator.module.css";

const PostCreator = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  return (
    <div className={styles["post-creator-container"]}>
      <NavLink to="/posts/create" className={styles["post-creator-button"]}>
        <span>Add post</span>
        <FontAwesomeIcon icon={faSquarePlus} />
      </NavLink>
    </div>
  );
};

export default PostCreator;
