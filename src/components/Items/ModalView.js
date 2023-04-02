import React from "react";
import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

const ModalView = (id, time, reviewee, counsellor, advice) => {
  ///====================================

  const [show, setShow] = useState(false);
  const [model, setModel] = useState([]);

  const handleClose = () => setShow(false);

  ///=========================================

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title> User: {id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{model.advice}</Modal.Body>
    </div>
  );
};

export default ModalView;
