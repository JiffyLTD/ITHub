import React, { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import NotesBody from "../Components/NotesBody/NotesBody";
import Note from "./../Components/Note/Note";
import AddModal from "./../Components/Modals/AddModal/AddModal";
import NoteService from "../API/NoteService";
import AlertModal from "../Components/Modals/AlertModal/AlertModal";
import { InfinitySpin } from "react-loader-spinner";
import UpdateModal from "../Components/Modals/UpdateModal/UpdateModal";
import { useNotes } from "./../Hooks/useFilter";

const Main = () => {
  const [notes, setNotes] = useState([]);
  const [isAddModalShow, setIsAddModalShow] = useState(false);
  const [isAlertModalShow, setIsAlertModalShow] = useState(false);
  const [isUpdateModalShow, setIsUpdateModalShow] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [note, setNote] = useState({});
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const sortedAndSearchedNotes = useNotes(notes, filter.sort, filter.query);

  const fetchNotes = async () => {
    setIsLoad(true);
    let notesList = await NoteService.getAll();
    setNotes(notesList);
    setIsLoad(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <Header />
      <AddModal
        isShow={isAddModalShow}
        setIsShow={setIsAddModalShow}
        modalServerResponse={setIsAlertModalShow}
        setMessage={setMessage}
      />
      <AlertModal
        isShow={isAlertModalShow}
        setIsShow={setIsAlertModalShow}
        message={message}
      />
      <UpdateModal
        isShow={isUpdateModalShow}
        setIsShow={setIsUpdateModalShow}
        note={note}
        modalServerResponse={setIsAlertModalShow}
        setMessage={setMessage}
      />
      <NotesBody
        setIsShow={setIsAddModalShow}
        filter={filter}
        setFilter={setFilter}
      >
        {isLoad ? (
          <div className="text-center mb-5">
            <InfinitySpin color="#0d6efd" />
            <h3>Загрузка...</h3>
          </div>
        ) : (
          sortedAndSearchedNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              modalServerResponse={setIsAlertModalShow}
              setMessage={setMessage}
              setNote={setNote}
              setIsUpdateModalShow={setIsUpdateModalShow}
            />
          ))
        )}
      </NotesBody>
    </div>
  );
};

export default Main;
