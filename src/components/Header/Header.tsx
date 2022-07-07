import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { ReactComponent as Dogs } from "../../assets/dogs.svg";

const Header = () => {
  return (
    <div>
      <nav className="container">
        <Link to="/">
          <Dogs />
        </Link>
        <Link to="/login">Login / Criar Conta</Link>
      </nav>
    </div>
  );
};

export default Header;
