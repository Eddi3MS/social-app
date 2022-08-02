import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import { ErrorModalContextProvider } from "./context/ErrorFeedbackContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorModalContextProvider>
        <App />
      </ErrorModalContextProvider>
    </Provider>
  </React.StrictMode>
);
