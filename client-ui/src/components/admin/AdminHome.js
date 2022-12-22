import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import adminMenuList from "./admin-menu-list";
import { DashboardGridMenu, defaultMenu } from "./AdminMenu";
import yteSix from "../../images/yte_six.jpg";

const AdminHome = () => {
  const [contentCount, setContentCount] = useState({
    posts: 1,
    images: 2,
    videos: 3,
    poems: 4,
    books: 5,
    dailyThoughts: 6,
    dailyQuotes: 7,
  });
  const navigate = useNavigate();

  const getContentCount = (contentCountState) => {
    const contentDiv = Object.entries(contentCountState).map(
      ([key, value], index) => {
        return (
          <div
            className="border border-2 p-2 px-6 rounded-md capitalize font-bold text-white bg-gray-600"
            key={index}
          >
            <p>
              {key} - {value}
            </p>
          </div>
        );
      }
    );
    return contentDiv;
  };

  const contentCountList = getContentCount(contentCount);

  const handleCreatePost = () => {
    // navigate("/admin/posts", { state: { createPost: true } });
    navigate("/admin/posts", { state: { createPost: true } });
  };

  // useEffect(() => {
  //   return
  // }, [])

  return (
    <>
      <div className="flex">
        {/* menu start */}
        <div className="w-2/12 bg-black min-h-screen pt-4 pl-2">
          <ul>{defaultMenu(adminMenuList)}</ul>
        </div>
        {/* menu end */}


        <div
          className="pt-4 pl-2 bg-no-repeat bg-cover h-screen flex-1"
          style={{ backgroundImage: `url(${yteSix})` }}
        >


          <h2 className="text-3xl text-white font-bold ml-8">
            Dashboard Overview
          </h2>


          <div className=" px-8 flex items-center justify-between mt-4">
            {contentCountList}
          </div>

          {/* <Link to="/admin/posts" className=""> */}
          <button
            className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white"
            onClick={handleCreatePost}
          >
            <i className="far fa-plus-square mr-2"></i>create new post
          </button>
          {/* </Link> */}

          <div className="grid grid-cols-dashboard-menu gap-5 px-8 mt-4">
            {DashboardGridMenu(adminMenuList)}
          </div>
        </div>



      </div>
    </>
  );
};

export default AdminHome;
