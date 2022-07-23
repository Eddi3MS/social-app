import React from "react";
import { Col, Spinner } from "react-bootstrap";
import "./Loading.scss";

const Loading = () => {
  return (
    <Col
      className="d-flex justify-content-center align-items-center h-100 spinner_container"
      style={{
        position: "relative",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Spinner animation="border" />
    </Col>
  );
};

export default Loading;
