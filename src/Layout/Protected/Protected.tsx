import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

interface IProtectedProps {
  children: JSX.Element;
}

const Protected = ({ children }: IProtectedProps) => {
  const userReducer = useAppSelector((state) => state.user);

  return userReducer.user ? children : <Navigate to="/login" />;
};

export default Protected;
