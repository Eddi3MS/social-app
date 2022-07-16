import React, { useCallback, useEffect } from "react";
import { Feed } from "../../components";
import { TokenService } from "../../services/tokenService/tokenService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login } from "../../store/user/thunks";
import { logout } from "../../store/user/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const userReducer = useAppSelector((state) => state.user);

  const handleTokenExist = useCallback(() => {
    if (userReducer.user && !userReducer.loading) return;

    const token = TokenService.getTokenFromStorage();

    if (token) {
      dispatch(login({ skipParams: true }));
    }
  }, []);

  useEffect(() => {
    handleTokenExist();
  }, [handleTokenExist]);

  useEffect(() => {
    if (userReducer.error) {
      dispatch(logout());
      console.log("deslogou");
    }
  }, [userReducer.error]);

  return (
    <section className="container main_container">
      <Feed />
    </section>
  );
};

export default Home;
