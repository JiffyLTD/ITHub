import React from "react";
import { Col, Row } from "react-bootstrap";
import NoteService from "../../API/NoteService";
import DeleteBut from "../UI/DeleteBut/DeleteBut";
import UpdateBut from "../UI/UpdateBut/UpdateBut";

const Note = ({ note, modalServerResponse, setMessage, setNote, setIsUpdateModalShow }) => {
  const deleteNote = async (id) => {
    let result = await NoteService.deleteNote(id);
    setMessage(result.data);
    modalServerResponse(true);
  };

  const updateNote = () => {
    setNote(note);
    setIsUpdateModalShow(true);
  }

  return (
    <div className="container p-0">
      <Row>
        <Col
          className="d-flex flex-column align-items-center border-end"
          sm="2"
        >
          <h5 className="ms-3">
            {note.title}
          </h5>
          <small>От {note.noteDate}</small>
        </Col>
        <Col className="border-end" sm="8">
          <p className="text-break">{note.description}</p>
        </Col>
        <Col
          className="d-flex align-items-center justify-content-around"
          sm="2"
        >
          <UpdateBut onClick={updateNote}/>
          <DeleteBut onClick={() => deleteNote(note.id)} />
        </Col>
      </Row>
      <hr />
    </div>
  );
};

export default Note;
