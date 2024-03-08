import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

function CreateComment(props) {
  const [commentText, setCommentText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <h5>Add a Comment</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="commentTextArea">
          <Form.Control
            as="textarea"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Add your comment..."
            rows="4"
          />
        </Form.Group>
        <Button type="submit">Add comment</Button>
      </Form>
    </div>
  );
}

export default CreateComment;
