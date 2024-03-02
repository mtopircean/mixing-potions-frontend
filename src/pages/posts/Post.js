import React from "react";
import { Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Post.module.css';
import logo from '../../assets/logo.png';
import { FaThumbsUp, FaComment  } from "react-icons/fa";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    title,
    content,
    image,
    created_at,
    likes_count,
    comments,
    comments_count,
  } = props;

  return (
    <Card className={`${styles.Post} mb-3`}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image || logo} height={55} />
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
          <span>{likes_count}</span>
        </div>
        <div className={styles.CommentsSection}>
        <FaComment />
          <span>{comments_count}</span>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default Post;
