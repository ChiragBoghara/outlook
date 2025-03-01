import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { EmailProvider } from "./context/EmailContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <EmailProvider>
    <App />
  </EmailProvider>
);