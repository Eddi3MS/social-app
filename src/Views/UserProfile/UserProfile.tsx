import React from "react";
import { useParams } from "react-router-dom";
import { Feed, Head, NotFound } from "../../components";

const UserProfile = () => {
  const { user } = useParams();

  return (
    <section className="app_container main_container">
      <Head title={user ?? "Usuário"} description="Social App - User Page" />

      {!user ? (
        <NotFound />
      ) : (
        <>
          <h1 className="title">{user}</h1>
          <Feed />
        </>
      )}
    </section>
  );
};

export default UserProfile;
