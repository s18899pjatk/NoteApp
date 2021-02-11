import React from "react";

export default function Select({
  name,
  label,
  options,
  error,
  onChange,
  ...rest
}) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select {...rest} name={name} id={name} className="form-control">
        {options.map((option) => (
          <option
            key={option._id}
            value={option._id}
            onClick={() => onChange(option.name)}
          >
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}
