import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
