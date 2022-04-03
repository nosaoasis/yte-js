import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import AdminInput from "./components/admin/AdminInput";
import ClientHomePage from "./components/client-interface/ClientHomePage";
// import AdminHome from "./components/admin/AdminHome";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    {/* <Router> */}
      <Routes>
        <Route index path="/" element={<ClientHomePage />} />
        {/* <Route path="/admin" element={<AdminInput />} >
          <Route path="dashboard" element={<AdminHome />} />
        </Route> */}
      </Routes>
    {/* </Router> */}
    </>
  );
}

export default App;
