import React from "react";
import ProductsPanel from "../../components/ProductsPanel";
import { Container, Row, Col } from "react-bootstrap";
import BodySytemPanel from "../../components/BodySystemPanel";

function PostCreateForm() {
  return (
    <Container>
      <Row>
      <Col></Col>
        <Col sm={6}>
          <BodySytemPanel />
          <ProductsPanel />
        </Col>
      </Row>
    </Container>
  );
}

export default PostCreateForm;
