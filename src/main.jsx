import React from "react";

import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./App";

import { Toaster } from "react-hot-toast";

import AuthContextProvider from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />

      <Toaster position="top-center" />
    </AuthContextProvider>
  </React.StrictMode>
);