import React from "react";
import { Route, Routes } from "react-router-dom";
import { ActionBar, Feed } from "../../components";
import { PhotoPost, Stats } from "./components";

const Account = () => {
  return (
    <section className="app_container">
      <ActionBar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="post" element={<PhotoPost />} />
        <Route path="stats" element={<Stats />} />
      </Routes>
    </section>
  );
};

export default Account;
