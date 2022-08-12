import { useCallback, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer, Header, ModalFeedbackError, NotFound } from "./components";
import { ErrorModalContext } from "./context/ErrorFeedbackContext";
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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const dispatch = useAppDispatch();
  const userReducer = useAppSelector((state) => state.user);

  const { error, setErrorModal } = useContext(ErrorModalContext);

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
      setErrorModal(userReducer.error);
    }
  }, [userReducer.error]);

  const client = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: true,
      },
    },
  });

  return (
    <>
      <div className="App">
        <QueryClientProvider client={client}>
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
        </QueryClientProvider>
      </div>

      {!!error && (
        <ModalFeedbackError
          show={!!error}
          onHide={() => setErrorModal(null)}
          message={error.message}
        />
      )}
    </>
  );
}

export default App;
