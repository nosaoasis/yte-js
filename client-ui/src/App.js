import React from "react";
import "./App.css";
import ClientHomePage from "./components/client-interface/ClientHomePage";
import Blog from "./components/client-interface/blog/Blog";
import SingleBlogPage from "./components/client-interface/blog/SingleBlogPage";
import Peoms from "./components/client-interface/peoms/Peoms";
import Pictures from "./components/client-interface/pictures/Pictures";
import Videos from "./components/client-interface/videos/Videos";
import Books from "./components/client-interface/books/Books";
import DailyThoughts from "./components/client-interface/daily-thoughts/DailyThoughts";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <Routes>
        <Route index path="" element={<ClientHomePage />} />
        <Route path="blog" element={<Blog />} />
        <Route exact path="/blog/:blog_id" element={<SingleBlogPage />} />
        <Route path="pictures" element={<Pictures />} />
        <Route path="videos" element={<Videos />} />
        <Route path="peoms" element={<Peoms />} />
        <Route path="books" element={<Books />} />
        <Route path="daily-thoughts" element={<DailyThoughts />} />
      </Routes>
    </>
  );
}

export default App;
