import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer, Header } from "./components";
import Protected from "./Layout/Protected";
import Account from "./Views/Account";
import Home from "./Views/Home";
import Login from "./Views/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
