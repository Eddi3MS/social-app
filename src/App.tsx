import { useCallback, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer, Header, NotFound } from "./components";
import Protected from "./Layout/Protected";
import { TokenService } from "./services/tokenService/tokenService";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { login } from "./store/user/thunks";
import { logout } from "./store/user/userSlice";
import Account from "./Views/Account";
import Home from "./Views/Home";
import Login from "./Views/Login";
import Photo from "./Views/Photo";
import UserProfile from "./Views/UserProfile";

function App() {
  const dispatch = useAppDispatch();
  const userReducer = useAppSelector((state) => state.user);

  const handleTokenExist = useCallback(() => {
    if (userReducer.user || userReducer.loading) return;

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
    }
  }, [userReducer.error]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main className="App_body">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="account/*"
              element={
                <Protected>
                  <Account />
                </Protected>
              }
            />
            <Route path="photo/:id" element={<Photo />} />
            <Route path="profile/:user" element={<UserProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
