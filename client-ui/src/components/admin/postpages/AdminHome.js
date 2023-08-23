import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminMenuList from "../admin-menu-list";
import { DashboardGridMenu, defaultMenu } from "../AdminMenu";
import yteSix from "../../../images/yte_six.jpg"

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

  const navigate = useNavigate()

  const getContentCount = (contentCountState) => {
    const contentDiv = Object.entries(contentCountState).map(
      ([key, value], index) => {
        return (
          <div
            className="border-2 p-2 px-6 rounded-md capitalize font-bold text-white bg-gray-600"
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
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/admin", { replace: true });
      return
    }
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
          className="pt-4 pl-2 bg-no-repeat bg-cover min-h-screen flex-1"
          style={{ backgroundImage: `url(${yteSix})` }}
        >
          <h2 className="text-3xl text-white font-bold ml-8">
            Dashboard Overview
          </h2>

          <div className=" px-8 flex items-center justify-between mt-4">
            {contentCountList}
          </div>

          <button className="capitalize p-2 px-4 mt-4 ml-8 bg-slate-700 text-white hover:bg-slate-900">
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
