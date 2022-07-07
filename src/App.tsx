import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer, Header } from "./components";
import Home from "./Views/Home";
import Login from "./Views/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
