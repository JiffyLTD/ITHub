import React from "react";

const SearchInput = ({ onChange }) => {
  return (
    <input
      onChange={onChange}
      className="rounded border border-primary form-control text-dark"
      placeholder="Поиск..."
    />
  );
};

export default SearchInput;
