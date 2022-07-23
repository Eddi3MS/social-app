import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { ReactComponent as Dogs } from "../../assets/dogs.svg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import Button from "../Button";
import { logout } from "../../store/user/userSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const userReducer = useAppSelector((state) => state.user);

  return (
    <header className="header">
      <nav className="app_container header__nav">
        <Link className="header__logo" to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {!userReducer.user && (
          <Link className="header__login" to="/login">
            Login / Criar Conta
          </Link>
        )}
        {userReducer.user && (
          <Link className="header__login" to="/account">
            {userReducer.user.nome}
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
