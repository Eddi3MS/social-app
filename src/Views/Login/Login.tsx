import React from "react";
import { Route, Routes } from "react-router-dom";
import { LoginForm, LostAccount, RegisterForm } from "./components";

const Login = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/lost-account" element={<LostAccount />} />
        <Route path="/reset" element={<RegisterForm />} />
      </Routes>
    </div>
  );
};

export default Login;
