import React from "react";
import { Row, Col } from "react-bootstrap";
import AddBut from "../UI/AddBut/AddBut";
import FilterSelect from "../UI/FilterSelect/FilterSelect";
import SearchInput from "../UI/SearchInput/SearchInput";

const NotesBody = ({ children, setIsShow, filter, setFilter }) => {
  const openAddModal = () => setIsShow(true);
  return (
    <div className="container border border-primary rounded p-0 mb-5">
      <Row className="p-3">
        <Col sm="4"></Col>
        <Col sm="4">
          <h3 className="text-center">Список заметок</h3>
        </Col>
        <Col className="text-end" sm="4">
          <AddBut onClick={openAddModal} />
        </Col>
      </Row>
      <hr />
      <Row className="p-3">
        <Col sm="4"></Col>
        <Col className="text-center" sm="4">
          <SearchInput value={filter.query} onChange={e => setFilter({...filter, query: e.target.value})}/>
        </Col>
        <Col sm="4">
          <FilterSelect
            onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
            value={filter.sort}
            defaultValue="Сортировка по ..."
            options={[
              { value: 'title', name: 'По заголовку' },
              { value: "description", name: "По описанию" },
              { value: "noteDate", name: "По дате" }
            ]}
          />
        </Col>
      </Row>
      <hr />
      {children}
    </div>
  );
};

export default NotesBody;
