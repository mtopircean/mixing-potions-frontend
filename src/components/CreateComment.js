import React, { useState, useContext, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../styles/CreateComment.module.css";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { axiosRes } from "../api/axiosDefaults";
import { toast } from 'react-toastify';


function CreateComment(props) {
  const [commentText, setCommentText] = useState("");
  const currentUser = useContext(CurrentUserContext);
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);

  useEffect(() => {
    if (props.editComment && props.editComment.id) {
      setEditMode(true);
      setEditCommentId(props.editComment.id);
      setCommentText(props.editComment.comment_text);
    }

    return() => {
      
    }
  }, [props.editComment]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editMode && editCommentId) {
        console.log("Inside handleSubmit");
        console.log("Data to be sent in PUT request:", {
          comment_text: commentText
        });
        await axiosRes.put(`/comments/${editCommentId}/`, {
          post: props.postId,
          comment_text: commentText
      });
      toast.success("Comment updated successfully!");
      props.onCommentSubmitted({ id: editCommentId, comment_text: commentText });
      setEditMode(false);
      setEditCommentId(null);
    } else {
      console.log("Adding new comment");
      const { data } = await axiosRes.post("/comments/", {
        post: props.postId,
        comment_text: commentText
      });
      toast.success("Comment added successfully!");
      props.onCommentSubmitted(data);
    }
    } catch (error) {
      console.error("Error submitting post:", error);
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
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Add your comment..."
              rows="3"
            />
          </Form.Group>
          <Button type="submit" className={style.commentButton}>
            {editMode ? "Update comment" : "Add comment"}
          </Button>
          
        </Form>
      )}
    </div>
  );
}

export default CreateComment;
