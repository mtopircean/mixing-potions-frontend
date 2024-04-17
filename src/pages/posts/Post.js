import React, { useState, useEffect } from 'react';
import { Button, Card, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../../components/Avatar';
import styles from '../../styles/Post.module.css';
import CreateComment from '../../components/CreateComment';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import { faPenSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Like from '../../components/Like';

import { FaComment, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
        comments: initialComments,
        like_id,
    } = props;

    const [isExpanded, setIsExpanded] = useState(false);
    const [comments, setComments] = useState(initialComments);
    const [editMode, setEditMode] = useState(false);
    const [editComment, setEditComment] = useState(null);
    const currentUser = useCurrentUser();
    const [ownerProfileImage, setOwnerProfileImage] = useState(null);
    // Used to determine if the post is liked by the current user
    const [isLiked] = useState(like_id !== null);
    // Used to keep track of the number of likes on the post
    const [likeCount] = useState(like_count);
    const noComments = comments.length === 0;

    // Fetch owner's profile image when owner_id changes
    useEffect(() => {
        let isMounted = true;
        const fetchOwnerProfileImage = async () => {
            if (!owner_id) {
                return;
            }
            try {
                const response = await axios.get(`/posts/${id}/`);
                if (isMounted) {
                    const ownerProfileImage = response.data.owner_image;
                    setOwnerProfileImage(ownerProfileImage);
                }
                const ownerProfileImage = response.data.owner_image;
                setOwnerProfileImage(ownerProfileImage);
            } catch (error) {
                console.error('Error fetching owner image:', error);
            }
        };

        fetchOwnerProfileImage();

        return () => {
            isMounted = false;
        };
    }, [owner_id, id]);

    // Toggle comments expansion
    const toggleComments = () => {
        setIsExpanded(!isExpanded);
    };

    // Handle new comment submission
    const handleCommentSubmitted = (newComment) => {
        setComments([newComment, ...comments]);
        setEditMode(false);
        setEditComment(null);
    };

    // Handle editing a comment
    const handleEditComment = (comment) => {
        setEditMode(true);
        setEditComment(comment);
    };

    const handleCommentDelete = async (commentId) => {
        const confirmDelete = window.confirm(
            'Are you sure you want to delete this comment?'
        );
        if (!confirmDelete) {
            return;
        }
        try {
            await axios.delete(`/comments/${commentId}/`);
            toast.success('Comment deleted successfully!');
            const updatedComments = comments.filter(
                (comment) => comment.id !== commentId
            );
            setComments(updatedComments);
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Handling canceling edit mode
    const handleCancelEdit = () => {
        setEditMode(false);
        setEditComment(null);
    };

    return (
        <Card className={`${styles.Post} mb-3`}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link
                        to={`/profile/${owner_id}`}
                        className={styles.usernameLink}
                    >
                        <Avatar
                            src={ownerProfileImage}
                            className={styles.avatarImage}
                        />
                        {owner}
                    </Link>

                    <div className="d-flex align-items-center">
                        <span>{created_at}</span>
                    </div>
                </Media>
            </Card.Body>
            <div className={styles.imageContainer}>
                <Link to={`/posts/${id}`}>
                    <Card.Img
                        src={image}
                        alt={title}
                        className={styles.postImage}
                    />
                </Link>
            </div>
            <Card.Body>
                {title && (
                    <Card.Title className="text-center">{title}</Card.Title>
                )}
                {content && <Card.Text>{content}</Card.Text>}
            </Card.Body>
            <Card.Footer className={styles.PostFooter}>
                <div className={styles.LikesSection}>
                    <Like
                        postId={id}
                        isLiked={isLiked}
                        likeCount={likeCount}
                        likeId={like_id}
                    />
                </div>
                <div className={styles.CommentsSection}>
                    {noComments ? (
                        <FaComment style={{ color: 'grey' }} />
                    ) : (
                        <FaComment />
                    )}
                    <button onClick={toggleComments}>
                        {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>
            </Card.Footer>
            {isExpanded && (
                <div className={styles.ExpandedComments}>
                    <CreateComment
                        postId={id}
                        editMode={editMode}
                        editComment={editComment}
                        onCommentSubmitted={handleCommentSubmitted}
                        onCancelEdit={handleCancelEdit}
                    />
                    <div className={styles.CommentsAreaWrapper}>
                        {comments
                            .slice()
                            .sort(
                                (a, b) =>
                                    new Date(b.created_at) -
                                    new Date(a.created_at)
                            )
                            .map((comment, index) => (
                                <div
                                    key={index}
                                    className={styles.CommentsArea}
                                >
                                    <h6 className={styles.CommentOwner}>
                                        <Link
                                            to={`/profile/${comment.owner_profile?.id}`}
                                        >
                                            <strong>{comment.owner}</strong>
                                        </Link>
                                        {currentUser &&
                                            currentUser.username ===
                                                comment.owner && (
                                                <span
                                                    className={
                                                        styles.CommentBubble
                                                    }
                                                >
                                                    <Button
                                                        className={
                                                            styles[
                                                                'edit-button'
                                                            ]
                                                        }
                                                        onClick={() =>
                                                            handleEditComment(
                                                                comment
                                                            )
                                                        }
                                                    >
                                                        Edit{' '}
                                                        <FontAwesomeIcon
                                                            icon={faPenSquare}
                                                        />
                                                    </Button>
                                                    <Button
                                                        className={
                                                            styles[
                                                                'delete-button'
                                                            ]
                                                        }
                                                        onClick={() =>
                                                            handleCommentDelete(
                                                                comment.id
                                                            )
                                                        }
                                                    >
                                                        Delete{' '}
                                                        <FontAwesomeIcon
                                                            icon={faTrashAlt}
                                                        />
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
