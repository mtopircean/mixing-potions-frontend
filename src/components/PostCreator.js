import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const PostCreator = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) return null;

  return (
    <NavLink to="/posts/create" className="user-link-menu">
      Add Post
      <FontAwesomeIcon icon={faPen} style={{ marginLeft: "5px" }} />
    </NavLink>
  );
};

export default PostCreator;
