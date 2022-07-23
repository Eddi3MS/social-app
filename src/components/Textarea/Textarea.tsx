import React, { TextareaHTMLAttributes } from "react";

import "./Textarea.scss";

interface ITextarea extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: any;
}

const Textarea = ({ error, ...rest }: ITextarea) => {
  return (
    <div className={`textarea_input-wrapper ${error && "hasError"}`}>
      <textarea className="textarea_input" {...rest} />
      {error && <span className="textarea_error">{error}</span>}
    </div>
  );
};

export default Textarea;
