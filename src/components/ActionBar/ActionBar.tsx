import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/user/userSlice";
import "./ActionBar.scss";

import { ReactComponent as Feed } from "../../assets/feed.svg";
import { ReactComponent as Stats } from "../../assets/estatisticas.svg";
import { ReactComponent as Add } from "../../assets/adicionar.svg";
import { ReactComponent as Leave } from "../../assets/sair.svg";
import useSize from "../../hooks/useSize";

const titles = {
  account: "Minha Conta",
  account_stats: "Estatísticas",
  account_post: "Poste Sua Foto",
};

const ActionBar = () => {
  const dispatch = useAppDispatch();
  const barRef = useRef<HTMLDivElement | null>(null);

  const { width } = useSize(barRef);
  const mobile = width > 640 ? false : true;

  const [showMenu, setShowMenu] = useState(false);

  const [title, setTitle] = useState("");

  const location = useLocation();

  useEffect(() => {
    let key = location.pathname.replace("/", "").replace("/", "_");
    setTitle(titles[key as keyof typeof titles] ?? "");
    setShowMenu(false);
  }, [location.pathname]);

  return (
    <header className="action_bar" ref={barRef}>
      <h1 className="title">{title}</h1>

      {mobile && (
        <button
          className={`mobile_btn ${showMenu && "mobile_btn__active"}`}
          onClick={() => setShowMenu((current) => !current)}
        ></button>
      )}
      <nav
        className={`${mobile ? "mobile_nav" : "web_nav"}  ${
          showMenu && "mobile_nav__active"
        }`}
      >
        <NavLink to="/account" end>
          <Feed /> {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/account/stats">
          <Stats /> {mobile && "Estatisticas"}
        </NavLink>
        <NavLink to="/account/post">
          <Add /> {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={() => dispatch(logout())}>
          <Leave /> {mobile && "Sair"}
        </button>
      </nav>
    </header>
  );
};

export default ActionBar;
