import React, { ChangeEvent, InputHTMLAttributes, useState } from "react";
import Icon from "../Icon";
import "./InputFile.scss";

interface IInputFileProps extends InputHTMLAttributes<HTMLInputElement> {
  error: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  selected: File | null;
}

const InputFile = ({ error, selected, ...rest }: IInputFileProps) => {
  return (
    <div className="input-file">
      <label htmlFor="input_file" className="custom-file-input">
        {selected ? (
          <>
            <Icon
              name="check_circle_outline"
              size={25}
              className="text-success"
            />
            {selected.name}
          </>
        ) : (
          <>
            <Icon className="text-dark" name="image" size={25} /> Selecionar
            Imagem
          </>
        )}
      </label>{" "}
      <input id="input_file" type="file" {...rest} />
      {error && <p className="error_message-file">{error}</p>}
    </div>
  );
};

export default InputFile;
