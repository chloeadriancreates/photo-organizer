import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Home from "./pages/Home/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <h1 className="title">Photo organizer</h1>
    <Home />
  </React.StrictMode>
);
