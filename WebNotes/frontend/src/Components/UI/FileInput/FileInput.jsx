import React from "react";

const FileInput = ({name, handleChange}) => {
  return (
    <div className="mb-3">
      <label htmlFor="formFile" className="form-label ms-3">
        {name}
      </label>
      <input className="form-control" type="file" id="formFile" accept="image/*, .png, .jpg" onChange={handleChange} />
    </div>
  );
};

export default FileInput;
