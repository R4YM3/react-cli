import React from 'react';

import './Checkbox.scss';

export interface Props {
  value: string;
  name: string;
  label: string;
}

export default ({name, value, label}: Props) => {
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        value={value}
        className="checkbox__input"
      />
      <span className="checkbox__checkmark"></span>
      <span className="checkbox__label">{label}</span>
    </label>
  );
};
