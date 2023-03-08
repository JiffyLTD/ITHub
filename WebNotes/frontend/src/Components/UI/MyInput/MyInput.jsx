import React from "react";

const MyInput = ({inputName, onChange, placeholder, type, error, value}) => {
  return (
    <div className="form-floating mb-3">
      <input
        className="form-control text-dark"
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <label className="text-dark">
        {inputName}
      </label>
      <span className="text-danger">{error}</span>
    </div>
  );
};

export default MyInput;
