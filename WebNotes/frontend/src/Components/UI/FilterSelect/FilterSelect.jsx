import React from "react";

const FilterSelect = ({ options, defaultValue, value, onChange }) => {
  return (
    <select
      className="form-select w-50 border border-primary"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">{defaultValue}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default FilterSelect;
