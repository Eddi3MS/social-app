import React from "react";
import { ReactComponent as Dogs } from "../../assets/dogs-footer.svg";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Dogs />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  );
};

export default Footer;
