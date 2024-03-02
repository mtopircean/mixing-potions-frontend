import React, { useState } from "react";
import { Card, Media } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Post.module.css";
import logo from "../../assets/logo.png";
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
    profile_id,
    title,
    content,
    image,
    created_at,
    like_count,
    comment_count,
    comments,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const toggleComments = () => {
    setIsExpanded(!isExpanded);
  };

  console.log("Comments:", comments);

  return (
    <Card className={`${styles.Post} mb-3`}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
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
          {isExpanded && (
            <div className={styles.ExpandedComments}>
              {comments.map((comment, index) => (
                <div key={index}>
                  <p key={index}>{comment.comment_text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;
