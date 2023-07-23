import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import AdminHome from "./components/admin/AdminHome";
import Admin from "./components/admin/Admin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route index path="/*" element={<App />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </Router>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
