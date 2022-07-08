import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TokenService } from "../../services/tokenService/tokenService";
import { userService } from "../../services/userService/userService";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { login } from "../../store/user/thunks";
import { logout } from "../../store/user/userSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const userReducer = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  const handleTokenExist = useCallback(async () => {
    if (userReducer.user && !userReducer.loading) return;

    const token = TokenService.getTokenFromStorage();

    try {
      if (token) {
        await userService.tokenValidate();

        dispatch(login());
      }
    } catch (error) {
      dispatch(logout());
    }
  }, []);

  useEffect(() => {
    handleTokenExist();
  }, [handleTokenExist]);

  return <div>Home</div>;
};

export default Home;
