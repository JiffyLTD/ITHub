import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import NoteService from "../../../API/NoteService";
import MyInput from "./../../UI/MyInput/MyInput";

const AddModal = ({ isShow, setIsShow, modalServerResponse, setMessage }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const closeAddModal = () => {
    setIsShow(false);
    setTitle("");
    setDescription("");
  };

  const isValidForm = () => {
    return !(title.length > 0 && description.length > 0);
  };

  const addNewNote = async () => {
    let newNote = { title: title, description: description, noteDate: new Date(Date.now()).toLocaleString() };
    let result = await NoteService.addNote(newNote);

    setMessage(result.data);
    modalServerResponse(true);

    setTitle("");
    setDescription("");
    closeAddModal();
  };

  return (
    <Modal show={isShow} onHide={closeAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление заметки</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyInput
          inputName="Заголовок"
          placeholder="Title"
          type="text"
          onChange={(event) => setTitle(event.target.value)}
        />
        <MyInput
          inputName="Описание"
          placeholder="Description"
          type="text"
          onChange={(event) => setDescription(event.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={addNewNote} disabled={isValidForm()}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModal;
