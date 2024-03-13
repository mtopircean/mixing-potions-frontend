import React, { useState, useEffect } from "react";
import { Button, Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Post.module.css";
import CreateComment from "../../components/CreateComment";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  faPenSquare,
  faTrashAlt,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  FaThumbsUp,
  FaComment,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const Post = (props) => {
  const {
    id,
    owner,
    owner_id,
    title,
    content,
    image,
    created_at,
    like_count,
    comment_count,
    profile_id,
    comments: initialComments,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState(initialComments);
  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState(null);
  const currentUser = useCurrentUser();
  const [ownerProfileImage, setOwnerProfileImage] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const fetchOwnerProfileImage = async () => {
      try {
        const response = await axios.get(`/posts/${owner_id}/`);
        setOwnerProfileImage(response.data.owner_image);
      } catch (error) {
        console.error("Error fetching owner image:", error);
      }
    };

    fetchOwnerProfileImage();
  }, [owner_id]);

  const toggleComments = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentSubmitted = (newComment) => {
    setComments([newComment, ...comments]);
    setEditMode(false);
    setEditComment(null);
  };

  const handleEditComment = (comment) => {
    setEditMode(true);
    setEditComment(comment);
  };

  const handleCommentDelete = async (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await axios.delete(`/comments/${commentId}/`);
      toast.success("Comment deleted successfully!");
      const updatedComments = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(updatedComments);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleFollowUser = async () => {
    try {
      const response = await axios.post("/followers/", { followed: owner_id });
      setIsFollowing(true);
      toast.success(`You are now following ${owner}`);
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <Card className={`${styles.Post} mb-3`}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profile/${owner_id}`} className={styles.usernameLink} >
            <Avatar src={ownerProfileImage} className={styles.avatarImage} />
            {owner}
          </Link>

          <div className="d-flex align-items-center">
            <span>{created_at}</span>
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
      </Card.Body>
      <Card.Footer className={styles.PostFooter}>
        <div className={styles.LikesSection}>
          <FaThumbsUp />
          <span>{like_count}</span>
        </div>
        {currentUser && currentUser.username !== owner && (
          <>
            {isFollowing ? (
              <Link to="/profile" className={styles.following}>
                Following...
              </Link>
            ) : (
              <Button
                onClick={handleFollowUser}
                className={styles.followButton}
              >
                Follow <FontAwesomeIcon icon={faCirclePlus} />
              </Button>
            )}
          </>
        )}
        <div className={styles.CommentsSection}>
          <span>{comment_count}</span>
          <FaComment />
          <button onClick={toggleComments}>
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </Card.Footer>
      {isExpanded && (
        <div className={styles.ExpandedComments}>
          <CreateComment
            key={comments.length}
            postId={id}
            comments={comments}
            editMode={editMode}
            editComment={editComment}
            onCommentSubmitted={handleCommentSubmitted}
          />
          <div className={styles.CommentsAreaWrapper}>
            {comments
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((comment, index) => (
                <div key={index} className={styles.CommentsArea}>
                  <h6 className={styles.CommentOwner}>
                    <strong>{comment.owner}</strong>
                    {currentUser && currentUser.username === comment.owner && (
                      <span className={styles.CommentBubble}>
                        <Button
                          className={styles["edit-button"]}
                          onClick={() => handleEditComment(comment)}
                          activeClassName={styles["active"]}
                        >
                          Edit <FontAwesomeIcon icon={faPenSquare} />
                        </Button>
                        <Button
                          className={styles["delete-button"]}
                          onClick={() => handleCommentDelete(comment.id)}
                        >
                          Delete <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                      </span>
                    )}
                  </h6>
                  <p>{comment.comment_text}</p>
                  <hr />
                </div>
              ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default Post;
