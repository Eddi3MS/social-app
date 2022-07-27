import React from "react";
import Head from "../Head";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <section className="app_container main_container full_height not_found">
      <Head
        title="Página não Encontrada"
        description="Social App - Not Found Page"
      />

      <h1 className="title">Erro: 404</h1>
      <p>Página não encontrada.</p>
    </section>
  );
};

export default NotFound;
