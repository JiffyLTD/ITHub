import React from 'react';
import { Modal } from "react-bootstrap";

const AlertModal = ({ isShow, setIsShow, message }) => {
    const closeAddModal = () => {
        setIsShow(false);
        window.location.reload();
      };
  return (
    <Modal show={isShow} onHide={closeAddModal}>
      <Modal.Header>
        <Modal.Title>Ответ сервера</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message}
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
  )
}

export default AlertModal