import React, { useState, useEffect } from "react";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Post.module.css";
import CreateComment from "../../components/CreateComment";
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
    pk,
    title,
    content,
    image,
    created_at,
    like_count,
    comment_count,
    comments: initialComments,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const [comments, setComments] = useState(initialComments);

  const toggleComments = () => {
    setIsExpanded(!isExpanded);
  };

  const handleCommentSubmitted = (newComment) => {
    console.log("New comment:", newComment);
    setComments([newComment, ...comments]);
  };

  return (
    <Card className={`${styles.Post} mb-3`}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${pk}/`}>
            <Avatar />
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
            onCommentSubmitted={handleCommentSubmitted}
          />
          <div className={styles.CommentsAreaWrapper}>
            {comments
              .slice()
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .map((comment, index) => (
                <div key={index} className={styles.CommentsArea}>
                  <h6>
                    <strong>{comment.owner}</strong>:
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
