import React from "react";
import { Modal, Button } from "react-bootstrap";
import MyInput from "./../../UI/MyInput/MyInput";
import { useState } from "react";
import NoteService from "../../../API/NoteService";
import { useEffect } from "react";

const UpdateModal = ({
  isShow,
  setIsShow,
  note,
  setMessage,
  modalServerResponse,
}) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState('');

  useEffect(() => {
    const uploadImage = async () => {
      if(selectedFile !== null){
        const formData = new FormData();
        formData.append('image',selectedFile);
        const result = await NoteService.saveFile(formData);
        setUploadResult(result.data);
        }
    }
    uploadImage();
  },[selectedFile])

  const closeUpdateModal = () => setIsShow(false);

  useEffect(() => {
    if (isShow) {
      setNewTitle(note.title);
      setNewDescription(note.description);
    }
  }, [isShow, note.title, note.description]);

  const updateNote = async () => {
    let updatedNote = {
      id: note.id,
      title: newTitle,
      description: newDescription,
      noteDate: new Date(Date.now()).toLocaleString(),
      imageFileName : selectedFile.name
    };

    let result = await NoteService.updateNote(updatedNote);

    setMessage(result.data);
    modalServerResponse(true);

    closeUpdateModal();
  };

  return (
    <Modal show={isShow} onHide={closeUpdateModal}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование заметки</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <MyInput
          inputName="Заголовок"
          placeholder="Title"
          type="text"
          onChange={(event) => setNewTitle(event.target.value)}
          value={newTitle}
        />
        <MyInput
          inputName="Описание"
          placeholder="Description"
          type="text"
          onChange={(event) => setNewDescription(event.target.value)}
          value={newDescription}
        />
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label ms-3">
            Изображение
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept="image/*, .png, .jpg"
            onChange={(event) => setSelectedFile(event.target.files[0])}
          />
          <span className="text-dark">{uploadResult}</span>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={updateNote}>
          Обновить запись
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
