import React from "react";
import "./NoContent.scss";

interface INoContent {
  message?: string;
}

const NoContent = ({ message }: INoContent) => {
  return (
    <section className="app_container main_container full_height not_found">
      <h1 className="title">Atenção!</h1>
      <p>{message ? message : "Nenhum dado encontrado."}</p>
    </section>
  );
};

export default NoContent;
