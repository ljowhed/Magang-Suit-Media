import React from 'react';
import { Form } from 'react-bootstrap'; // Import Form dari react-bootstrap

const Select = ({ label, value, options, onChange }) => {
  return (
    <Form.Group className="d-flex align-items-center gap-2">
      {/* Tambahkan kelas text-nowrap di sini */}
      {label && <Form.Label className="mb-0 text-nowrap">{label}</Form.Label>}
      <Form.Select
        value={value}
        onChange={onChange}
        className="w-auto rounded-3" // Menambahkan kelas Bootstrap 'rounded-3' untuk sudut membulat
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;
