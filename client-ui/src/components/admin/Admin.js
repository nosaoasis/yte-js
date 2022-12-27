import React from "react";
import {
  AdminHome,
  AdminSecretKey,
  AdminPost,
  AdminSinglePostPreview,
  AdminRegister,
  AdminLogin
} from "./index";
import RichTextEditor from "./rich-text-editor/RichTextEditor";
import { Routes, Route } from "react-router-dom";

const Admin = () => {

  return (
    <>
      <Routes>
        <Route index path="" element={<AdminSecretKey />} />
        <Route index path="/register" element={<AdminRegister />} />
        <Route index path="/login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminHome />} />
        <Route path="/posts" element={<AdminPost />} />
        <Route path="/create_post" element={<RichTextEditor />} />
        <Route path="/post/edit/:post_id" element={<RichTextEditor />} />
        <Route exact path="/posts/:post_id" element={<AdminSinglePostPreview />} />
      </Routes>
    </>
  );
};

export default Admin;
