import React, { useState } from "react";
import ProductsPanel from "../../components/ProductsPanel";
import { Container, Row, Col } from "react-bootstrap";
import BodySytemPanel from "../../components/BodySystemPanel";
import Asset from "../../components/Asset";

function PostCreateForm() {
  const [selectedBodySystems, setSelectedBodySystems] = useState([]);

  const toggleBodySystem = (system) => {
    if (selectedBodySystems.includes(system)) {
      setSelectedBodySystems(
        selectedBodySystems.filter((item) => item !== system)
      );
    } else {
      setSelectedBodySystems([...selectedBodySystems, system]);
    }
  };

  return (
    <Container>
      <Row>
      <Asset spinner={true} src="/path/to/image.png" message="Loading..." />
        <Col></Col>
        <Col sm={6}>
          <BodySytemPanel
            selectedBodySystems={selectedBodySystems}
            toggleBodySystem={toggleBodySystem}
          />
          <ProductsPanel selectedBodySystems={selectedBodySystems} />
        </Col>
      </Row>
    </Container>
  );
}

export default PostCreateForm;
