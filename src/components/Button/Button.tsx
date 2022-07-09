import React, { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ children, ...props }: IButtonProps) => {
  return (
    <button {...props} className="button">
      {children}
    </button>
  );
};

export default Button;
