import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";
import ClientThemeWrapper from "./context/ClientThemeWrapper";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <ThemeProvider>
      <ClientThemeWrapper>
      <App />
      </ClientThemeWrapper>
    </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
