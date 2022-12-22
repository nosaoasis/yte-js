import React from "react";
import {
  AdminHome,
  AdminSecretKey,
  AdminPost,
  AdminSinglePostPreview,
  AdminRegister,
  AdminLogin
} from "./index";
import { Routes, Route, useLocation } from "react-router-dom";

// import { defaultMenu } from "./AdminMenu";
// import adminMenuList from "./admin-menu-list";

const Admin = () => {
  // const location = useLocation();

  return (
    <>
      <Routes>
        <Route index path="" element={<AdminSecretKey />} />
        <Route index path="/register" element={<AdminRegister />} />
        <Route index path="/login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminHome />} />
        <Route path="/posts" element={<AdminPost />} />
        <Route path="/posts/page/:page_number" element={<AdminPost />} />
        <Route exact path="/posts/:post_id" element={<AdminSinglePostPreview />} />
      </Routes>
      {/* {location.pathname === "/admin" ? (
        <div className="flex">
          <div className="w-full min-h-screen">
            <Routes>
              <Route index path="" element={<AdminInput />} />
              <Route index path="/register" element={<AdminRegister />} />
            </Routes>
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="w-2/12 bg-black min-h-screen pt-4 pl-2">
            <ul>{defaultMenu(adminMenuList)}</ul>
          </div>
          <div className="w-full min-h-screen">
            <Routes>
              <Route path="dashboard" element={<AdminHome />} />
              <Route path="/posts/:post_id" element={<AdminSinglePostPreview />} />
              <Route path="/posts" element={<AdminPost />} />
            </Routes>
          </div>
        </div>
      )} */}
    </>
  );
};

// 09012676478

export default Admin;
