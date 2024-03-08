import React, { useState, useContext  } from "react";
import { Button, Form } from "react-bootstrap";
import style from "../styles/CreateComment.module.css"
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function CreateComment(props) {
  const [commentText, setCommentText] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        <Button type="submit" className={style.commentButton}>Add comment</Button>
      </Form>
        )}
    </div>
  );
}

export default CreateComment;
