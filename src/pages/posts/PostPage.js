import React from "react";
import Post from "./Post";
import styles from "../../styles/PostPage.module.css"
import { faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostPage = () => {

    const mockPostDetails = {
        owner: "John Doe",
        profile_id: "1",
        profile_image: "profile_image_url",
        title: "Lorem Ipsum",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "post_image_url",
        updated_at: "2024-03-02 12:00:00",
        comments_count: 10,
        likes_count: 20,
      };

      const handleEdit = () => {
        console.log("Edit button clicked");
      };

  return (
    <div>
    <Post
    owner={mockPostDetails.owner}
        profile_id={mockPostDetails.profile_id}
        profile_image={mockPostDetails.profile_image}
        title={mockPostDetails.title}
        content={mockPostDetails.content}
        image={mockPostDetails.image}
        updated_at={mockPostDetails.updated_at}
        comments_count={mockPostDetails.comments_count}
        likes_count={mockPostDetails.likes_count}
        like_id={mockPostDetails.like_id}
    />
    <div>
    <button onClick={handleEdit} className={styles['post-edit-button']}>Edit <FontAwesomeIcon icon={faPenSquare} /></button>
    <button onClick={handleEdit} className={styles['post-delete-button']}>Delete <FontAwesomeIcon icon={faTrashAlt} /></button>
    </div>
    </div>
  )
}

export default PostPage
