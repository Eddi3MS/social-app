import React from "react";
import { Route, Routes } from "react-router-dom";
import { ActionBar, Feed, Head, NotFound } from "../../components";
import { PhotoPost, Stats } from "./components";

const Account = () => {
  return (
    <section className="app_container">
      <Head title="Area do Usuário" description="Social App - Account Page" />

      <ActionBar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="post" element={<PhotoPost />} />
        <Route path="stats" element={<Stats />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
};

export default Account;
