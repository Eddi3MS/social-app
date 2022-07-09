import { InputHTMLAttributes } from "react";

import "./Input.scss";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: any; // react-hook-form // string
  label: string;
}

const Input = ({ label, name, error, ...rest }: IInputProps) => {
  return (
    <div className="input__wrapper">
      <label htmlFor={name} className="input__label">
        {label}
      </label>
      <input id={name} name={name} {...rest} className="input__input" />
      {error && <p className="input__error">{error}</p>}
    </div>
  );
};

export default Input;
