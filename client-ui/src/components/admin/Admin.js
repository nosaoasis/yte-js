import React from "react";
import { AdminHome, AdminInput, AdminPost } from "./index";
import { Routes, Route } from "react-router-dom";
import { defaultMenu } from './AdminMenu'
import adminMenuList from "./admin-menu-list";

const Admin = () => {

  return (
    <>
      <div className="flex">
        <div className="w-2/12 bg-black h-screen pt-4 pl-2">
          <ul>{defaultMenu(adminMenuList)}</ul>
        </div>
        <div className="w-10/12 w-full">
          <Routes>
            <Route index path="" element={<AdminInput />} />
            <Route path="dashboard" element={<AdminHome />} />
            <Route path="posts" element={<AdminPost />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

// 09012676478

export default Admin;
