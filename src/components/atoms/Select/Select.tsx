import React from "react";
import "./Select.css";

interface Props {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function Select({ options, value, onChange }: Props) {
  return (
    <select
      className={"Select"}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option value={option.value} selected={option.value === value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
