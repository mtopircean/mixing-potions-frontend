import React from "react";
import ProductsPanel from "../../components/ProductsPanel";
import { Container, Row, Col } from "react-bootstrap";

function PostCreateForm() {
  return (
    <Container>
      <Row>
      <Col></Col>
        <Col sm={6}>
          <ProductsPanel />
        </Col>
      </Row>
    </Container>
  );
}

export default PostCreateForm;
