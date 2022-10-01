import React from "react";
import { AdminHome, AdminInput, AdminPost } from "./index";
import { Routes, Route, useLocation } from "react-router-dom";
import { defaultMenu } from "./AdminMenu";
import adminMenuList from "./admin-menu-list";

const Admin = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/admin" ? (
        <div className="flex">
          <div className="w-10/12 min-h-screen">
            <Routes>
              <Route index path="" element={<AdminInput />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-2/12 bg-black min-h-screen pt-4 pl-2">
            <ul>{defaultMenu(adminMenuList)}</ul>
          </div>
          <div className="w-10/12 w-full min-h-screen">
            <Routes>
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="posts" element={<AdminPost />} />
            </Routes>
          </div>
        </div>
      )}
    </>
  );
};

// 09012676478

export default Admin;
