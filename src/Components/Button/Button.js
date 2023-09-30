import React from "react";

const Button = ({ btnText, onClick, type, className, disabled }) => {
  return (
    <button
      className={`${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default Button;
