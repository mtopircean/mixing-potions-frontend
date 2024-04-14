import React, { useState, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import style from '../styles/CreateComment.module.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { axiosRes } from '../api/axiosDefaults';
import { toast } from 'react-toastify';

// CreateComment component to handle comment creation and editing
function CreateComment(props) {
    const [commentText, setCommentText] = useState('');
    const currentUser = useContext(CurrentUserContext);
    const [editMode, setEditMode] = useState(false);
    const [editCommentId, setEditCommentId] = useState(null);

    useEffect(() => {
        if (props.editComment && props.editComment.id) {
            setEditMode(true);
            setEditCommentId(props.editComment.id);
            setCommentText(props.editComment.comment_text);
        }

        return () => {};
    }, [props.editComment]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (commentText.trim() === '') {
            toast.error('Your comment is empty!');
            return;
        }

        try {
            if (editMode && editCommentId) {
                await axiosRes.put(`/comments/${editCommentId}/`, {
                    post: props.postId,
                    comment_text: commentText,
                });
                const updatedComment = {
                    id: editCommentId,
                    comment_text: (
                        <>
                            <strong>Updated comment: </strong>
                            <br />
                            {commentText}
                        </>
                    ),
                };
                toast.success(
                    'Comment updated successfully! Refresh page for old comment to disappear or edit the comment again.'
                );
                props.onCommentSubmitted(updatedComment);
                setEditMode(false);
                setEditCommentId(null);
            } else {
                const { data } = await axiosRes.post('/comments/', {
                    post: props.postId,
                    comment_text: commentText,
                });
                toast.success('Comment added successfully!');
                props.onCommentSubmitted(data);
            }
        } catch (error) {
            console.error('Error submitting post:', error);
        }
    };

    const handleCancel = () => {
        setCommentText('');
        setEditMode(false);
        setEditCommentId(null);
        if (props.onCancelEdit) {
            props.onCancelEdit();
        }
    };

    return (
        <div>
            {currentUser && (
                <Form onSubmit={handleSubmit} className={style.commentForm}>
                    <Form.Group controlId="commentTextArea">
                        <Form.Control
                            as="textarea"
                            value={commentText}
                            onChange={(event) =>
                                setCommentText(event.target.value)
                            }
                            placeholder="Add your comment..."
                            rows="3"
                        />
                    </Form.Group>
                    <Button type="submit" className={style.commentButton}>
                        {props.editMode ? 'Update comment' : 'Add comment'}
                    </Button>
                    {props.editMode && (
                        <Button
                            onClick={handleCancel}
                            className={style.cancelButton}
                        >
                            Cancel
                        </Button>
                    )}
                </Form>
            )}
        </div>
    );
}

export default CreateComment;
