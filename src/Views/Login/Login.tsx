import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { LoginForm, LostAccount, RegisterForm } from "./components";

const Login = () => {
  const userReducer = useAppSelector((state) => state.user);

  if (userReducer.user) return <Navigate to="/account" />;
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
