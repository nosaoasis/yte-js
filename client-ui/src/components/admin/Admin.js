import React from "react";
import {
  AdminHome,
  AdminSecretKey,
  AdminPost,
  AdminSinglePostPreview,
  AdminRegister,
  AdminLogin
} from "./postpages/index";
import { ImageHome } from "./imagepages";
import { VideosHome } from "./videospages";
import { PoemsHome } from "./poemspages";
import { BooksHome } from "./bookspages";
import { QuotesHome } from "./quotespages";
import RichTextEditor from "./rich-text-editor/RichTextEditor";
import { Routes, Route } from "react-router-dom";

const Admin = () => {

  return (
    <>
      <Routes>
        <Route index path="" element={<AdminSecretKey />} />
        <Route index path="/register" element={<AdminRegister />} />
        <Route index path="/login" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminHome />} />
        <Route path="/posts" element={<AdminPost />} />
        <Route path="/create_post" element={<RichTextEditor />} />
        <Route path="/post/edit/:post_id" element={<RichTextEditor />} />
        <Route exact path="/posts/:post_id" element={<AdminSinglePostPreview />} />
        <Route path="/images" element={<ImageHome />} />
        <Route path="/videos" element={<VideosHome />} />
        <Route path="/poems" element={<PoemsHome />} />
        <Route path="/books" element={<BooksHome />} />
        <Route path="/quotes" element={<QuotesHome />} />
      </Routes>
    </>
  );
};

export default Admin;
