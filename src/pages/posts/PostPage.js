import React from "react";
import Post from "./Post";
import styles from "../../styles/PostPage.module.css"
import { faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostPage = () => {

      const handleEdit = () => {
        console.log("Edit button clicked");
      };

  return (
    <div>
    <Post
    />
    <div>
    <button onClick={handleEdit} className={styles['post-edit-button']}>Edit <FontAwesomeIcon icon={faPenSquare} /></button>
    <button onClick={handleEdit} className={styles['post-delete-button']}>Delete <FontAwesomeIcon icon={faTrashAlt} /></button>
    </div>
    </div>
  )
}

export default PostPage
