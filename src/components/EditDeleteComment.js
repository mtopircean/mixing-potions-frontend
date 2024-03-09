import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

const EditDeleteComment = ({ onEditClick, onDeleteClick }) => {
  return (
    <ButtonGroup className="mb-2">
      <Button onClick={onEditClick} variant="primary">
        Update
      </Button>
      <Button onClick={onDeleteClick} variant="danger">
        Delete
      </Button>
    </ButtonGroup>
  );
};

export default EditDeleteComment;
