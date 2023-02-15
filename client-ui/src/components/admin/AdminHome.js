import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import adminMenuList from "./admin-menu-list";
import { DashboardGridMenu, defaultMenu } from "./AdminMenu";
import yteSix from "../../images/yte_six.jpg";
import axios from "axios";

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

  useEffect(() => {
    axios.get(`http://localhost:3764/api/v1/admin/authenticate_route`)
    .then((res) => {
      console.log("res value is ",res)
    }).catch(err => console.log(err))
  }, [])

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

          <button className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white">
            <Link to="/admin/create_post">create new post</Link>
          </button>

          <div className="grid grid-cols-dashboard-menu gap-5 px-8 mt-4">
            {DashboardGridMenu(adminMenuList)}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
